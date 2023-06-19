import DeleteUser from "../deleteUser";
import StatusToggler from "../statusToggle";
import "./style.module.css";
function User(props) {
    const {id,email,name,status,deleteUser} = props
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                <StatusToggler status={status} id={id} />
            </td>
            <td>
                <DeleteUser id={id} deleteUser={deleteUser}/>
            </td>
            
        </tr>
    );
}

export default User;
