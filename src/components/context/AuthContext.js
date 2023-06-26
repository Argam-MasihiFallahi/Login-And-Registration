import { useEffect, createContext, useState } from "react";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(
        localStorage.getItem("token") ? true : false
    );

    // useEffect(() => {
    //     if (!localStorage.getItem("token")) {
    //         setIsLogin(false);
    //     }
    // }, []);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
