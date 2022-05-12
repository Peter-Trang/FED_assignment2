import './Home.css';
import Joblist from '../Components/Joblist/Joblist';
import NewModel from '../Components/NewModel/NewModel';
import NewJob from '../Components/NewJob/NewJob';
import Job from '../Components/Job/Job';
import {useState, useEffect} from "react";
import AuthContext from '../Components/auth-context';
import NewManager from '../Components/NewManager/NewManager';

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

  //laver localstorage til managerlist
  const initialManagerlist = JSON.parse(localStorage.getItem("managerlist"))
	if(!initialManagerlist) {
    localStorage.setItem("managerlist", JSON.stringify([]));
  }
  
  //holder styr på state af listerne
  const [joblist, setJoblist] = useState(initialJoblist);
  const [modellist, setModellist] = useState(initialModellist);
  const [managerlist, setManagerlist] = useState(initialManagerlist);

  //opdaterer joblisten i localstorage
  useEffect(() => {
			localStorage.setItem("joblist", JSON.stringify(joblist));
	}, [joblist]);

  //opdaterer modellisten i localstorage
  useEffect(() => {
    localStorage.setItem("modellist", JSON.stringify(modellist));
  }, [modellist]);

  //opdaterer managerlisten i localstorage
  useEffect(() => {
    localStorage.setItem("managerlist", JSON.stringify(managerlist));
  }, [managerlist]);

  const createJobHandler = (enteredJobData) => {
    var url = "https://localhost:7181/api/Jobs";
    fetch(url, {
      method: 'POST', // Or PUT
      body: JSON.stringify(enteredJobData), // assumes your data is in a form object on your instance.
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    }).then(responseJson => {
      console.log(responseJson);
    })
    .catch(error => alert('Something bad happened: ' + error));
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

  const createManagerHandler = (enteredManagerData) => {
    var url = "https://localhost:7181/api/Managers";
    fetch(url, {
      method: 'POST', // Or PUT
      body: JSON.stringify(enteredManagerData), // assumes your data is in a form object on your instance.
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    }).then(responseJson => {
      //this.response = responseJson;
    })
    .catch(error => alert('Something bad happened: ' + error));
  }

  const [Tab, setTab] = useState("Job");

  function tabHandler(tab){
    setTab(tab);
  }

  console.log(Tab)

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (

          <div className="home">
          {context.isLoggedIn && (
          <div className='create-module'>
          <div className="button-container">
            <button onClick={() => tabHandler("Job")} >Job</button>
            <button onClick={() => tabHandler("Model")}>Model</button>
            <button onClick={() => tabHandler("Manager")}>Manager</button>
          </div>
          {Tab==="Model" && <NewModel className="create-new-model" onCreateModel={createModelHandler}/>}
          {Tab==="Manager" && <NewManager className="create-new-manager" onCreateManager={createManagerHandler}/>}
          {Tab==="Job" && <NewJob className="create-new-job" onCreateJob={createJobHandler} onRemoveJob={removeJobHandler}/>}
          </div> )}
          {context.isLoggedIn && ( <Joblist joblist={joblist}
          onRemoveJob={removeJobHandler}/>)}
          </div>
  )}}
  </AuthContext.Consumer>
  );
}

export default Home;
