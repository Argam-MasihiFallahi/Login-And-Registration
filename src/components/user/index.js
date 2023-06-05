import StatusToggler from "../statusToggle";
import "./style.module.css";
function User(props) {
    const {id,email,name,status} = props
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                <StatusToggler status={status} id={id} />
            </td>
        </tr>
    );
}

export default User;
