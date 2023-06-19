import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../user";
import "./style.module.css";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

function UsersPage() {
    const users_API = "http://localhost:3000/users";
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {isLogin} = useAuth()

    if(!isLogin){}
    useEffect(() => {
            axios
                .get(users_API, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => res.data)
                .then((res) => setData(res))
                .catch((err) => setError(err));
        
    }, []);

    function signoutHandler() {
        localStorage.clear();
        navigate("/login");
    }

    async function deleteUser(id) {
        await axios
            .delete(`http://localhost:3000/users/${id}`)
            .catch((error) => console.log(error));
        await axios
            .get(users_API)
            // .then((res) => res.data)
            .then((res) => setData(res.data));
    }

    return data ? (
        <div>
            <button onClick={signoutHandler}>Sign Out</button>
            <div>{error}</div>
            <table className="loaded" border="">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <User key={item.id} {...item} deleteUser={deleteUser} />
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="loading">...Loading</div>
    );
}

export default UsersPage;
