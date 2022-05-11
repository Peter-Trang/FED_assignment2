import './Home.css';
import Joblist from '../Components/Joblist/Joblist';
import NewModel from '../Components/NewModel/NewModel';
import NewJob from '../Components/NewJob/NewJob';
import Job from '../Components/Job/Job';
import {useState, useEffect} from "react";
import AuthContext from '../Components/auth-context';

function Home() {
  //laver localstorage til joblist
  const initialJoblist = JSON.parse(localStorage.getItem("joblist"))
	if(!initialJoblist) {
    localStorage.setItem("joblist", JSON.stringify([]));
  }

  //laver localstorage til modellist
  const initialModellist = JSON.parse(localStorage.getItem("modellist"))
	if(!initialModellist) {
    localStorage.setItem("modellist", JSON.stringify([]));
  }
  
  //holder styr på state af listerne
  const [joblist, setJoblist] = useState(initialJoblist);
  const [modellist, setModellist] = useState(initialModellist);

  //opdaterer joblisten i localstorage
  useEffect(() => {
			localStorage.setItem("joblist", JSON.stringify(joblist));
	}, [joblist]);

  //opdaterer modellisten i localstorage
  useEffect(() => {
    localStorage.setItem("modellist", JSON.stringify(modellist));
}, [modellist]);


  const createJobHandler = (enteredJobData) => {
      
      setJoblist((previousJoblist) => {
        return [...previousJoblist, 
          {
            jobTitle: enteredJobData.jobTitle,
            jobLocation: enteredJobData.jobLocation,
            jobSalary: enteredJobData.jobSalary,
            id: Math.random().toString(),
            key: Math.random().toString(),
            models: []
          }
        ];
      }); 

      localStorage.setItem("joblist", JSON.stringify(joblist));
  }

    const removeJobHandler = (id, jobTitle) => {
      setJoblist((previousJoblist) => {
        return previousJoblist.filter((job) => job.id !== id);
      });
    };

  const createModelHandler = (enteredModelData) => {
      
      setModellist((previousModellist) => {
        return [...previousModellist, 
          {
            name: enteredModelData.name,
            age: enteredModelData.age,
            height: enteredModelData.height,
            weight: enteredModelData.weight,
            id: Math.random().toString()
          }
        ];
      }); 
      localStorage.setItem("modellist", JSON.stringify(modellist));
  }

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (

          <div className="home">
          {context.isLoggedIn && (<div className='create-module'>
          <NewModel className="create-new-model" onCreateModel={createModelHandler}/>
          <NewJob className="create-new-job" onCreateJob={createJobHandler}/>
          </div> )}
          {context.isLoggedIn && ( <Joblist joblist={joblist}
          onRemoveJob={removeJobHandler}/>)}
          </div>
  )}}
  </AuthContext.Consumer>
  );
}

export default Home;
