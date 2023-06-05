import { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./style.module.css";
import axios from "axios";


function RegistrationPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const users_API = "http://localhost:3000/register";
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // password && password === confirmPass && email && name
        if (password !== confirmPassword) {
            setError("somthing went wrong check your passwords");
        } 
        if(!password || !name || !confirmPassword || !email) {
            setError("please fill all inputs");
        }


        if (password && password === confirmPassword && email && name) {
            let data = {
                name,
                email,
                password,
                confirmPassword,
                status: true,
            };
            if (data) {
                axios({
                    url: users_API,
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                })
                    .then((response) => response)
                    .then((data) => {
                        navigate("/login");
                    })
                    .catch(function (error) {
                        if (error.response) {
                            setError(
                                error.response.data +
                                    "you have an account please click down button"
                            );
                        } else if (error.request) {
                            setError(error.request);
                        } else {
                            setError(error.message);
                        }
                    });
            }
        }
    }
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
                {" "}
                If you have an account press here{" "}
            </button>
        </div>
    );
}

export default RegistrationPage;
