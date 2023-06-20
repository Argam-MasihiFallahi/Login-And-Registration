import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRouting({children}){
    const { isLogin } = useAuth();
    
    if(isLogin){
        return children;
    }

    return <Navigate to="/login" />
}

export default PrivateRouting;