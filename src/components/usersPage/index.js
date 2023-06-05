import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../user";
import "./style.module.css";
import axios from "axios";

function UsersPage() {
    const users_API = "http://localhost:3000/users";
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios({
                url : users_API,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: data,
            })
                .then((res) => res.data)
                .then((res) => {
                    setTimeout(() => setData(res), 2000);
                });
        } else {
            navigate("/login");
        }
    }, []);

    function signoutHandler() {
        localStorage.clear();
        navigate("/login");
    }

    return data ? (
        <div>
            <button onClick={signoutHandler}>Sign Out</button>
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
                        <User key={item.id} {...item} />
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="loading">...Loading</div>
    );
}

export default UsersPage;
