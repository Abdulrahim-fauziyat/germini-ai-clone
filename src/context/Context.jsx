import { createContext, useState } from "react";
import runChat from "../config/germini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response;
        const currentPrompt = prompt !== undefined ? prompt : input;
        
        if (prompt === undefined) {
            setPrevPrompts((prev) => [...prev, input]);
        }
        
        setRecentPrompt(currentPrompt);
        response = await runChat(currentPrompt);

        // Process response
        const responseArray = response.split("**");
        let newResponse = responseArray.map((chunk, index) =>
            index % 2 === 1 ? `<b>${chunk}</b>` : chunk
        ).join("");

        const newResponse2 = newResponse.split("*").join("<br />");
        const newResponseArray = newResponse2.split(" ");
        
        newResponseArray.forEach((nextWord, index) => {
            delayPara(index, nextWord + " ");
        });

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
