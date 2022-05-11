import "./NewJob.css";
import {useState} from "react";

const NewJob = (props) => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobSalary, setJobSalary] = useState("");

    const handleJobTitle = (event) => {
        setJobTitle(event.target.value);
    }
    const handleJobLocation = (event) => {
        setJobLocation(event.target.value);
    }
    const handleJobSalary = (event) => {
        setJobSalary(event.target.value);
    }
    

    const submitHandler = (event) => {
        event.preventDefault();
        
        const jobData = {
            jobTitle: jobTitle,
            jobLocation: jobLocation,
            jobSalary: jobSalary
        }

        props.onCreateJob(jobData);
        setJobTitle("");
        setJobLocation("");
        setJobSalary("");
    }

    return (
        <div className="new-job">
                <form onSubmit={submitHandler} className="new-job-form">
                    <div className="new-job-wrapper">
                    <div className="labels">
                        <label>Job title: </label>
                        <label>Job location: </label>
                        <label>Job salary: </label>
                    </div>
                    <div className="inputs">
                        <input type="text" value={jobTitle} placeholder="Enter job title" onChange={handleJobTitle} />
                        <input type="text" value={jobLocation} placeholder="Enter location" onChange={handleJobLocation}/>
                        <input type="number" value={jobSalary} placeholder="Enter salary" onChange={handleJobSalary} />
                    </div>
                    </div>
                    <button className="button" type="submit">Create Job</button>
                </form>
            </div>
    );
}

export default NewJob;