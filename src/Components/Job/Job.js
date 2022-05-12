import "./Job.css";
import { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { IoTrashSharp, IoClose, IoClipboard } from "react-icons/io5";

const Job = (props) => {
  const [showModelsToAdd, setShowModelsToAdd] = useState(false);
  const [addedModels, setAddedModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState();
  const [options, setOptions] = useState([]);

  

  async function getModels() {
    let url = "https://localhost:7181/api/Models";
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        let options = await response.json();
        console.log(JSON.stringify(options));
        setOptions(options);
      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }
    return;
  }

  async function getModelsAddedToJob() {
    let url = `https://localhost:7181/api/Jobs/${props.jobId}`;
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        let models = await response.json();
        console.log(JSON.stringify(options));
        setAddedModels(models.models);
      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }
    return;
  }

  const displayModelsAddedToJob = addedModels.map((model) => {
    return (
      <ul>
        <li className="model-name">{model.firstName}</li>
      </ul>
    )});


    

  const showModels = () => {
    setShowModelsToAdd(!showModelsToAdd);

    getModels();

    setSelectedModel(options[0].efModelId)
    console.log(options[0].efModelId)
    console.log(selectedModel.efModelId)
  };

  const selectedModelHandler = (event) => {
    setSelectedModel(event.target.value);
    console.log(selectedModel)
    console.log(event.target.innerText)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    var url = `https://localhost:7181/api/Jobs/${props.jobId}/model/${selectedModel}`;
    fetch(url, {
      method: "POST", // Or PUT
      // body: JSON.stringify(this.form), // assumes your data is in a
      // form object on your instance.
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((responseJson) => {
        // this.response = responseJson;
      })
      .catch((error) => alert("Something bad happened: " + error));
  };

  let toggleAddModelOption = null;

  if (showModelsToAdd) {
    toggleAddModelOption = (
      <div>
        <IoClose />
      </div>
    );
  } else {
    toggleAddModelOption = (
      <h6>
        Add model to the job <IoClipboard />
      </h6>
    );
  }

  useEffect(() => {
    getModelsAddedToJob()
  }, [])

  return (
    <div className="job">
      <p className="job-title">
        {props.customer}
        <IoTrashSharp
          className="trash-icon"
          onClick={() => props.onRemoveJob(props.jobId)}
        />
      </p>
      <hr />
      <p>
        {" "}
        <MdLocationOn />
        {props.location}
      </p>
      <hr />
      <div className="added-models">{displayModelsAddedToJob}</div>
      <div className="expand-button" onClick={showModels}>
        {toggleAddModelOption}
      </div>
      {showModelsToAdd && (
        <form onSubmit={submitHandler} className="add-model-form-wrapper">
          <select value={selectedModel} onChange={selectedModelHandler}>
            {options.map((option) => (
              <option value={option.efModelId}>{option.firstName}</option>
            ))}
          </select>{" "}
          <button type="submit" className="button add-model-button">
            Add Model
          </button>
        </form>
      )}
    </div>
  );
};

export default Job;
