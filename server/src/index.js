import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

// const API_KEY = process.env.API_KEY
// const API_SECRET = process.env.API_SECRET

const API_KEY = "384rj83f885z";
const API_SECRET = "n6pwmgzpgy92u54ha66yttr5exfh97v3cveyhdghnxsgznzhas8vn5n224a5sybe";
const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({ token, userId, firstName, lastName, username, hashedPassword });
    } catch (error) {
        res.json(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { users } = await serverClient.queryUsers({ name: username });
        if (users.length === 0) {
            return res.json({ message: "User not found" })
        };

        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(
            password,
            users[0].hashedPassword
        );

        if (passwordMatch) {
            res.json({
                token, firstName: users[0].firstName, lastName: users[0].lastName, username, userId: users[0].id,
            });
        }
    } catch (error) {
        res.json(error);
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
