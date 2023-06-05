import { useState } from "react";
import css from "./style.module.css";
import axios from "axios";


function StatusToggler({ status, id }) {
    const [flag,setFlag] = useState(status)

    function togglerHandle() {
        setFlag(!flag);
        axios.patch(`http://localhost:3000/users/${id}`,{
            status : !flag
        })
    }

    return (
        <div className={css.togglerContainer}>
            <div className={flag ? css.active : css.inActive} onClick={togglerHandle}></div>
        </div>
    );
}
export default StatusToggler;
