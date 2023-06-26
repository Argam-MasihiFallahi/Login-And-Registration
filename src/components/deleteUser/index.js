import css from "./style.css";

function DeleteUser({id , deleteUser}) {
    

    return (
        <button onClick={() => deleteUser(id)} className={css.deleteButton}>
            Delete user
        </button>
    );
}

export default DeleteUser;
