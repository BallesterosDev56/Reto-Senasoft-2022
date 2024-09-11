import { useAdmin } from "./AuthAdmin";
import { Navigate } from "react-router-dom";


export const ProtectedAdmin = ({children})=> {
    const {adminState} = useAdmin();

    if (!adminState) {

        return <Navigate to={'/login'}></Navigate>

    }
    return children
}