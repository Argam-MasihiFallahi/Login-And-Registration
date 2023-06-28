import { useEffect, useState } from "react";
import User from "../user";
import css from "./style.module.css";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../API/index";

function UsersPage() {
    const users_API = "/660/users";
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { setIsLogin } = useAuth();
    
    useEffect(() => {
        axiosInstance
            .get(users_API)
            .then((res) => {
                return res.data;
            })
            .then((res) => setData(res))
            .catch((error) => {
                setError(error.response.data);
            });
    }, [setIsLogin]);

    function signoutHandler() {
        localStorage.clear();
        setIsLogin(false);
    }

    async function deleteUser(id) {
        try {
            await axiosInstance.delete(`/users/${id}`);
            const res = await axiosInstance.get(users_API);
            setData(res.data);
        } catch (error) {
            setError(error.response.data);
        }
    }

    const thead = () => {
        return (
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
            </thead>
        );
    };

    const tBody = () => {
        return (
            <tbody>
                {data.map((item) => (
                    <User key={item.id} {...item} deleteUser={deleteUser} />
                ))}
            </tbody>
        );
    };

    return data ? (
        <div className={css.container}>
            <button onClick={signoutHandler}>Sign Out</button>
            <div>{error}</div>
            <table className={css.loaded} border="">
                {thead()}
                {tBody()}
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
