import { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react'
import { CustomInput } from './CustomInput';
import { Game } from './Game';
import Cookies from "universal-cookie";

export const JoinGame = ({ setIsAuth }) => {
    const cookies = new Cookies();
    const [rivalUsername, setRivalUsername] = useState("");
    const { client } = useChatContext();
    const [channel, setChannel] = useState(null);

    const createChannel = async () => {
        const response = await client.queryUsers({ name: { $eq: rivalUsername } });

        if (response.users.length === 0) {
            alert("User not found");
            return;
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
        });

        await newChannel.watch();
        setChannel(newChannel);
    };

    const logOut = () => {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("firstName");
        cookies.remove("lastName");
        cookies.remove("hashedPassword");
        cookies.remove("channelName");
        cookies.remove("username");
        client.disconnectUser();
        setIsAuth(false)
    }

    return (
        <>
            {channel ? (
                <Channel channel={channel} Input={CustomInput}>
                    <Game channel={channel} setChannel={setChannel} />
                </Channel>) : (
                <div>
                    <h4>Create/Join Game</h4>
                    <input type="text" placeholder="Username of rival" onChange={(e) => {
                        setRivalUsername(e.target.value);
                    }} />
                    <button onClick={createChannel} class="flex flex-wrap"> Join/Start Game </button>
                    <button onClick={logOut}>Log Out</button>
                </div>
            )
            }
        </>
    )
}
