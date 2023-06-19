import axios from "axios";
import css from "./style.css";
import { useState } from "react";

function DeleteUser({id , deleteUser}) {
    

    return (
        <button onClick={() => deleteUser(id)} className={css.deleteButton}>
            Delete user
        </button>
    );
}

export default DeleteUser;
