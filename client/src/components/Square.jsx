export const Square = ({ chooseSquare, val }) => {
    return (
        <div onClick={chooseSquare} class="border border-black flex-grow cursor-pointer flex justify-center items-center text-5xl font-mono hover:bg-slate-100 active:bg-slate-200" style={{flex: "33%"}}>
            {val}
        </div>
    )
}
