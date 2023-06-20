import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

function Publicrouting({children}) {
    const {isLogin} = useAuth()
    
    if(!isLogin){
        return children;
    }
    
    
    return <Navigate to="/"/>;
}
export default Publicrouting;