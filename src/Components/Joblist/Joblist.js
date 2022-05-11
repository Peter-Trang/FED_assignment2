import './Joblist.css';
import Job from '../Job/Job';

const Joblist = (props) =>{

  const removeJobHandler = (id, jobTitle) => {
		props.onRemoveJob(id, jobTitle);
	};

  const displayJoblist = props.joblist.map((job) => (
    <Job
      onRemoveJob={removeJobHandler}
      jobTitle={job.jobTitle}
      jobLocation={job.jobLocation}
      jobSalary={job.jobSalary}
      id={job.id}
      key={job.id}
    />
  ));
  console.log(displayJoblist);

  return (
    <div className="joblist">
       {displayJoblist}
    </div>
  );
}


export default Joblist;