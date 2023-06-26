import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./style.module.css";
import axiosInstance from "../axios";

function RegistrationPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const users_API = "/register";
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            // password && password === confirmPass && email && name
            if (password !== confirmPassword) {
                setError("somthing went wrong check your passwords");
            }
            if (!password || !name || !confirmPassword || !email) {
                setError("please fill all inputs");
            }

            if (password && password === confirmPassword && email && name) {
                let data = {
                    name,
                    email,
                    password,
                    status: true,
                };
                if (data) {
                    axiosInstance
                        .post(users_API, {
                            name,
                            email,
                            password,
                            status: true,
                        })
                        .then((response) => response)
                        .then((data) => {
                            navigate("/login");
                        })
                        .catch((error) => {
                            setError(error.response.data);
                        });
                }
            }
        },
        [name, email, password, confirmPassword, navigate]
    );
    function emailHandler(e) {
        setEmail(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function confirmPassHandler(e) {
        setConfirmPassword(e.target.value);
    }

    function nameHandler(e) {
        setName(e.target.value);
    }

    function handleLogin() {
        navigate("/login");
    }

    return (
        <div className={css.registrationContainer}>
            <form className={css.registrationForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        onChange={nameHandler}
                        placeholder="Name"
                        id="name"
                        name="name"
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={emailHandler}
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
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        onChange={confirmPassHandler}
                        type="password"
                        placeholder="***********"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        autoComplete="off"
                    />
                </div>
                <button type="submit">Registration</button>
            </form>{" "}
            <h2 className={css.error}>{error}</h2>
            <button onClick={handleLogin}>
                If you have an account press here
            </button>
        </div>
    );
}

export default RegistrationPage;
