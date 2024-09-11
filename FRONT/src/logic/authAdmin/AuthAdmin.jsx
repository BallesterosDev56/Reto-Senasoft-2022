import { createContext, useContext, useState } from "react";

const adminContext = createContext();

export const AdminProvider = ({children})=> {
    const [adminState, setAdminState] = useState(false);

    const playAdmin = ()=>setAdminState(true);
    const leaveAdmin = ()=>setAdminState(false);

    return(
        <adminContext.Provider value={{adminState, playAdmin, leaveAdmin}}>
            {children}
        </adminContext.Provider>
    )
}

export const useAdmin= ()=> useContext(adminContext);