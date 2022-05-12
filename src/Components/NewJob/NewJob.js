import "./NewJob.css";
import {useState} from "react";

const NewJob = (props) => {
    const [customer, setCustomer] = useState("");
    const [startDate, setStartDate] = useState("");
    const [days, setDays] = useState("");
    const [location, setLocation] = useState("");
    const [comments, setComments] = useState("");

    const handleJobTitle = (event) => {
        setCustomer(event.target.value);
    }
    const handleStartDate = (event) => {
        setStartDate(event.target.value);
    }
    const handleDays = (event) => {
        setDays(event.target.value);
    }
    const handleLocation = (event) => {
        setLocation(event.target.value);
    }
    const handleComments = (event) => {
        setComments(event.target.value);
    }

    async function submitHandler(event){
        event.preventDefault();
        
        const jobData = {
            customer: customer,
            startDate: startDate,
            days: days,
            location: location,
            comments: comments
        }

        props.onCreateJob(jobData);
        setCustomer("");
        setStartDate("");
        setDays("");
        setLocation("");
        setComments("");
    }

    return (
        <div className="new-job">
                <form onSubmit={submitHandler} className="new-job-form">
                    <div className="new-job-wrapper">
                    <div className="labels">
                        <label>customer: </label>
                        <label>startDate: </label>
                        <label>days: </label>
                        <label>location: </label>
                        <label>comments: </label>
                    </div>
                    <div className="inputs">
                        <input type="text" value={customer} placeholder="Enter job title" onChange={handleJobTitle} />
                        <input type="date" value={startDate} placeholder="Enter location" onChange={handleStartDate}/>
                        <input type="number" value={days} placeholder="Enter salary" onChange={handleDays} />
                        <input type="text" value={location} placeholder="Enter salary" onChange={handleLocation} />
                        <input type="text" value={comments} placeholder="Enter salary" onChange={handleComments} />
                    </div>
                    </div>
                    <button className="button" type="submit">Create Job</button>
                </form>
            </div>
    );
}

export default NewJob;