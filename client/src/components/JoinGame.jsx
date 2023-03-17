import { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react'
import { Game } from './Game';

export const JoinGame = () => {

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

    return (
        <>
            {channel ? (
                <Channel channel={channel}>
                    <Game channel={channel}/>
                </Channel>) : (
                <div>
                    <h4>Create/Join Game</h4>
                    <input type="text" placeholder="Username of rival" onChange={(e) => {
                        setRivalUsername(e.target.value);
                    }} />
                    <button onClick={createChannel}> Join/Start Game </button>
                </div>
            )
            }
        </>
    )
}
