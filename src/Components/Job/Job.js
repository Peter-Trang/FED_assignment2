import './Job.css';
import { useState } from 'react';
import { MdPaid, MdLocationOn } from "react-icons/md";
import { IoTrashSharp, IoClose, IoClipboard } from 'react-icons/io5';

const Job = (props) => {
  const [showModelsToAdd, setShowModelsToAdd] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");

  const showModels = () => {
    setShowModelsToAdd(!showModelsToAdd);
  }


  const handleModelName = (event) => {
    setSelectedModel(event.target.value);
  }

  let modelsAddedToJob = null;

  const submitHandler = (event) => {
    event.preventDefault();
    var url = "https://localhost:7181/api/Jobs";
    fetch(url, {
      method: 'POST', // Or PUT
      body: JSON.stringify(this.form), // assumes your data is in a
      // form object on your instance.
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    }).then(responseJson => {
      this.response = responseJson;
    })
      .catch(error => alert('Something bad happened: ' + error));

  }

  let toggleAddModelOption = null;

  if (showModelsToAdd) {
    toggleAddModelOption = <div><IoClose /></div>
  } else {
    toggleAddModelOption = <h6>Add model to the job <IoClipboard /></h6>
  }

  return (
    <div className="job">
      <p className='job-title'>{props.jobTitle}
        <IoTrashSharp className='trash-icon'
          onClick={() => props.onRemoveJob(props.id, props.jobTitle)} />
      </p>
      <hr />
      <p> <MdLocationOn />{props.jobLocation}</p>
      <p><MdPaid />{props.jobSalary}</p>
      <hr />
      <div className='added-models'>{modelsAddedToJob}</div>
      <div className='expand-button' onClick={showModels}>
        {toggleAddModelOption}
      </div>
      {showModelsToAdd &&
        <form onSubmit={submitHandler} className='add-model-form-wrapper'>
          <input type='text' placeholder='Model name' onChange={handleModelName} />
          <button type="submit" className='button add-model-button'
          >Add Model</button>
        </form>}
    </div>
  );
}

export default Job;