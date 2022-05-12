import './Joblist.css';
import Job from '../Job/Job';

const Joblist = (props) =>{

  const removeJobHandler = (jobId) => {
		props.onRemoveJob(jobId);
	};

  const displayJoblist = props.joblist.map((job) => (
    <Job
      onRemoveJob={removeJobHandler}
      jobId={job.jobId}
      customer={job.customer}
      location={job.location}
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