import { useAuth } from "./AuthPlayer";
import { Navigate } from "react-router-dom";


export const ProtectedPlayer = ({children})=> {
    
    const { playerState } = useAuth();
    
    if (!playerState) {
        
        return <Navigate to={'/login'}></Navigate>
        
    }
    return children;
}