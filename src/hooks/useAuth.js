import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";

function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;