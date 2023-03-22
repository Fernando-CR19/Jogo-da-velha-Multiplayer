import { useState } from "react"
import { Board } from "./Board";

export const Game = ({ channel }) => {

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
        <div>
            <Board result={result} setResult={setResult} />
            {/* CHAT */}
            {/* Leave Game Button */}
        </div>
    )
}
