import { createContext, useContext, useState } from "react";

const playerContext = createContext();

export const PlayerProvider = ({children})=> {
    const [playerState, setPlayerState] = useState(false);

    const play = ()=>setPlayerState(true);
    const leave = ()=>setPlayerState(false);

    return (
        <playerContext.Provider value={{playerState, play, leave}}>
            {children}
        </playerContext.Provider>
    )
}

export const useAuth = ()=> useContext(playerContext);