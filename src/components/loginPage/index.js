import { useState, useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import css from "./style.module.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const LOGIN_API = "http://localhost:3000/login";
    const [error, setError] = useState("");
    const { isLogin, setIsLogin } = useAuth();
    
   
    function emailHandler(e) {
        setEmail(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        axios
            .post(LOGIN_API, {
                email,
                password,
            })
            .then((response) => response.data)
            .then((data) => {
                // Handle the response data
                if (data.accessToken) {
                    localStorage.setItem("token", data.accessToken);
                    setIsLogin(true);
                    navigate("/");
                }
            })
            .catch(function (error) {
                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError(error.request);
                } else {
                    setError(error.message);
                }
            });
    });

    function registrationHandler() {
        navigate("/registration");
    }

    return (
        <div className={css.loginContainer}>
            <form className={css.loginForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={emailHandler}
                        type="email"
                        placeholder="Email@Example.com"
                        id="email"
                        name="email"
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={passwordHandler}
                        type="password"
                        placeholder="***********"
                        id="password"
                        name="password"
                        value={password}
                        autoComplete="off"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <h2 className={css.error}>{error}</h2>
            <button onClick={registrationHandler}>
                Don't have an Account? registration
            </button>
        </div>
    );
}

export default LoginPage;
