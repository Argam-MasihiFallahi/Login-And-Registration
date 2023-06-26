import { useState } from "react";
import css from "./style.module.css";
import axiosInstance from "../axios";


function StatusToggler({ status, id }) {
    const [flag,setFlag] = useState(status)
    const [error , setError] = useState('');
    let statusToggle_api = `/users/${id}`
    function togglerHandle() {
        setFlag(!flag);
        axiosInstance.patch(statusToggle_api,{
            status : !flag
        })
        .catch(error => setError(error));
    }

    return (
        <div className={css.togglerContainer}>
            <div className={flag ? css.active : css.inActive} onClick={togglerHandle}></div>
            <div>{error}</div>
        </div>
    );
}
export default StatusToggler;
