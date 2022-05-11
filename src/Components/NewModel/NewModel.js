import "./NewModel.css";
import {useState} from "react";

const NewModel = (props) => {
    const [modelName, setModelName] = useState("");
    const [modelAge, setAge] = useState("");
    const [modelHeight, setHeight] = useState("");
    const [modelWeight, setWeight] = useState("");

    const handleModelName = (event) => {
        setModelName(event.target.value);
    }
    const handleAge = (event) => {
        setAge(event.target.value);
    }
    const handleHeight = (event) => {
        setHeight(event.target.value);
    }
    const handleWeight = (event) => {
        setWeight(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        const modelData = {
            name: modelName,
            age: modelAge,
            height: modelHeight,
            weight: modelWeight
        }

        props.onCreateModel(modelData);
        setModelName("");
        setAge("");
        setHeight("");
        setWeight("");
    }

    return (
        <div className="new-model">
                <form onSubmit={submitHandler} className="new-model-form">
                    <div className="new-model-wrapper">
                    <div className="labels">
                        <label>Model Name: </label>
                        <label>Age: </label>
                        <label>Height: </label>
                        <label>Weight: </label>
                    </div>
                    <div className="inputs">
                        <input type="text" value={modelName} placeholder="Enter Model Name" onChange={handleModelName} />
                        <input type="number" value={modelAge} placeholder="Enter Age" onChange={handleAge}/>
                        <input type="number" value={modelHeight} placeholder="Enter Height" onChange={handleHeight} />
                        <input type="number" value={modelWeight} placeholder="Enter Weight" onChange={handleWeight}/>
                    </div>
                    </div>
                    <button className="button" type="submit">Create Model</button>
                </form>
            </div>
    );
}

export default NewModel;