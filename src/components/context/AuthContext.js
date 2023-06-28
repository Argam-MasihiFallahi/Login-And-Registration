import { createContext, useState } from "react";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(storageHandler);
    function storageHandler() {
        return localStorage.getItem("token") ? true : false;
    }

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
