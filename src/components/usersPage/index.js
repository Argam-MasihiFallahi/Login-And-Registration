import { useEffect, useState } from "react";
import User from "../user";
import css from "./style.module.css";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../axios/index";

function UsersPage() {
    const users_API = "/660/users";
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { setIsLogin } = useAuth();
    const dataa = false;
    useEffect(() => {
        axiosInstance
            .get(users_API)
            .then((res) => {
                return res.data;
            })
            .then((res) => setData(res))
            .catch((err) => {
                if (err.request.statusText === "Unauthorized") {
                    localStorage.clear();
                    setIsLogin(false);
                    setError(err.request.statusText + " request");
                }
            });
    }, [setIsLogin]);

    function signoutHandler() {
        localStorage.clear();
        setIsLogin(false);
    }

    async function deleteUser(id) {
        await axiosInstance
            .delete(`/users/${id}`)
            .catch((error) => setError(error));
        await axiosInstance
            .get(users_API)
            .then((res) => setData(res.data))
            .catch((error) => setError(error));
    }

    return data ? (
        <div>
            <button onClick={signoutHandler}>Sign Out</button>
            <div>{error}</div>
            <table className={css.loaded} border="">
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
        <div className={css.body}>
            <div className={css.load} id="load">
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
        </div>
    );
}

export default UsersPage;
