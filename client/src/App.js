import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import './index.css';

function App() {

  // const API_KEY = process.env.API_KEY
  const API_KEY = "384rj83f885z";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(API_KEY);

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        console.log("user", user)
      });
  };

  return (
    <div className="App">
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
