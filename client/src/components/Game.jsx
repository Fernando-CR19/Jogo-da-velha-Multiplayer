import { useState } from "react"
import { Board } from "./Board";
import { Window, MessageList, MessageInput } from 'stream-chat-react'

import "./Chat.css";

export const Game = ({ channel, setChannel }) => {

    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

    channel.on("user.watching.start", (e) => {
        setPlayersJoined(e.watcher_count === 2)
    });

    const [result, setResult] = useState({ winner: "none", state: "none" });

    if (!playersJoined) {
        return (
            <div> Waiting for other player to join... </div>
        )
    };

    return (
        <div class="flex justify-center items-center space-x-32 space-y-10 flex-wrap">
            <Board result={result} setResult={setResult} />
            <Window>
                <MessageList disableDateSeparator closeReactionSelectorOnClick hideDeletedMessages messageActions={["react"]} />
                <MessageInput noFiles />
            </Window>
            <button
                onClick={async () => {
                    await channel.stopWatching();
                    setChannel(null);
                }} > Leave Game </button>
            {result.state === "won" && <div> {result.winner} Won The Game</div>}
            {result.state === "tie" && <div> Game Tieds</div>}
        </div>
    )
}
