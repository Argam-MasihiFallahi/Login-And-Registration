import { useState } from "react";
import css from "./style.module.css";
import axios from "axios";


function StatusToggler({ status, id }) {
    const [flag,setFlag] = useState(status)
    const [error , setError] = useState('');
    function togglerHandle() {
        setFlag(!flag);
        axios.patch(`http://localhost:3000/users/${id}`,{
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
