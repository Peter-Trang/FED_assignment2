import './Job.css';
import { useState } from 'react';
import { MdPaid, MdLocationOn } from "react-icons/md";
import {IoTrashSharp, IoClose, IoClipboard } from 'react-icons/io5';

const Job =(props) => {
  const [showModelsToAdd, setShowModelsToAdd] = useState(false);
  const [isModelSelected, setIsModelSelected ] = useState(false);

  const showModels = () => {
    setShowModelsToAdd(!showModelsToAdd);
  }

  const toggleModelSelection = () => {
    setIsModelSelected(!isModelSelected);
    
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddModel(props.id, props.modelName);
    localStorage.setItem("joblist", JSON.stringify(props.joblist));
    setShowModelsToAdd(false);
  }

  let toggleAddModelOption = null;
  
  if(showModelsToAdd) {
    toggleAddModelOption = <div><IoClose/></div>
  } else {
    toggleAddModelOption = <h6>Add model to the job <IoClipboard/></h6>
  }

let modellistFromLocalStorage = JSON.parse(localStorage.getItem("modellist"))


  return (
    <div className="job">
            <p className='job-title'>{props.jobTitle}
              <IoTrashSharp className='trash-icon'
                onClick={() => props.onRemoveJob(props.id, props.jobTitle)}/>
            </p>
          <hr/>
          <p> <MdLocationOn/>{props.jobLocation}</p>
          <p><MdPaid/>{props.jobSalary}</p>
          <hr/>
            {/* {showModelsToAdd && 
             <div className='added-models'>Model #1</div>} */}
          <div className='expand-button' onClick={showModels}>
            {toggleAddModelOption}
             </div>
          {showModelsToAdd &&
          <form onSubmit={submitHandler} className='add-model-form-wrapper'>
            <div className='model-tag-wrapper'>{ modellistFromLocalStorage.map((model) => {
                return <div className={`current-available-models ${isModelSelected ? "selected" : ""}`} 
                    onClick={toggleModelSelection}
                    value={model.name}>
                  {model.name}
                  </div>})}
            </div>
            <div className='add-model-button-wrapper' >
              <button type="submit" className=' button add-model-button' 
                >Add Model</button>
            </div>
          </form>}  
    </div>
  );
}

export default Job;