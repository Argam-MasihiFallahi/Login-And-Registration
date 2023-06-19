import { useEffect, createContext, useState } from "react";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setIsLogin(true)
        }
        
    },[])


    return (
        <AuthContext.Provider value={{isLogin, setIsLogin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
