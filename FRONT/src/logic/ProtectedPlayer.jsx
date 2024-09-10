import { useAuth } from "./authPlayer"
import { Navigate } from "react-router-dom";


export const ProtectedPlayer = ({children})=> {
    
    const { playerState } = useAuth();
    
    if (!playerState) {
        console.log(playerState);
        
        return <Navigate to={'/login'}></Navigate>
        
    }
    return children;
}