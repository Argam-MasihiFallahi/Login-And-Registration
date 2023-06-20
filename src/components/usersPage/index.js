import { useEffect, useState } from "react";
import User from "../user";
import "./style.module.css";
import axios from "../axios/index";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../axios/index";
import { useNavigate } from "react-router-dom";

function UsersPage() {
    const users_API = "/660/users";
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { isLogin, setIsLogin } = useAuth();
    useEffect(() => {
        axiosInstance
            .get(users_API)
            .then((res) => {
                return res.data;
            })
            .then((res) => setData(res))
            .catch((err) => {
                console.log(err);
                if (err.request.statusText === "Unauthorized") {
                    localStorage.clear();
                    setIsLogin(false);
                }
            });
    }, []);

    function signoutHandler() {
        localStorage.clear();
        setIsLogin(false);
    }

    async function deleteUser(id) {
        await axios
            .delete(`http://localhost:3000/users/${id}`)
            .catch((error) => console.log(error));
        await axios.get(users_API).then((res) => setData(res.data));
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
