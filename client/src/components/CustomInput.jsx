import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

export const CustomInput = () => {
    const { handleSubmit } = useMessageInputContext();

    return (
        <div>
            <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
                <div className="str-chat__input-flat-wrapper">
                    <div className="str-chat__input-flat--textarea-wrapper">
                        <ChatAutoComplete />
                    </div>
                    <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 m-1 border border-blue-700 rounded"> Send Message </button>
                </div>
            </div>
        </div>
    )
}

