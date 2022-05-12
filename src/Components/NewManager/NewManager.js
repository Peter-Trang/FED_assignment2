import "./NewManager.css";
import {useState} from "react";

const NewManager = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event)  => {
        event.preventDefault();
        
        const managerData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }

        props.onCreateManager(managerData);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="new-manager">
            <form onSubmit={submitHandler} className="new-manager-form">
                <div className="new-manager-wrapper">
                <div className="labels">
                    <label>First name: </label>
                    <label>Last name: </label>
                    <label>Email: </label>
                    <label>Password: </label>
                </div>
                <div className="inputs">
                    <input type="text" value={firstName} placeholder="Enter first name" onChange={handleFirstName} />
                    <input type="text" value={lastName} placeholder="Enter last name" onChange={handleLastName} />
                    <input type="email" value={email} placeholder="Enter email" onChange={handleEmail} />
                    <input type="password" value={password} placeholder="Enter password" onChange={handlePassword} />
                </div>
                </div>
                <button className="button" type="submit">Create Manager</button>
            </form>
        </div>
    );
}

export default NewManager;