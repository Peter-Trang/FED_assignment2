import "./NewManager.css";
import {useState} from "react";

const NewManager = (props) => {
    const [managerName, setManagerName] = useState("");

    const handleManagerName = (event) => {
        setManagerName(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        const managerData = {
            managerName: managerName,
        }

        props.onCreateManager(managerData);
        setManagerName("");
    }

    return (
        <div className="new-manager">
                <form onSubmit={submitHandler} className="new-manager-form">
                    <div className="new-manager-wrapper">
                    <div className="labels">
                        <label>Manager Name: </label>
                    </div>
                    <div className="inputs">
                        <input type="text" value={managerName} placeholder="Enter Name" onChange={handleManagerName} />
                    </div>
                    </div>
                    <button className="button" type="submit">Create Manager</button>
                </form>
            </div>
    );
}

export default NewManager;