import "./Home.css";
import Joblist from "../Components/Joblist/Joblist";
import NewModel from "../Components/NewModel/NewModel";
import NewJob from "../Components/NewJob/NewJob";
import Job from "../Components/Job/Job";
import { useState, useEffect } from "react";
import AuthContext from "../Components/auth-context";
import NewManager from "../Components/NewManager/NewManager";

function Home() {
  //holder styr på state af listerne
  const [joblist, setJoblist] = useState([]);
  const [modellist, setModellist] = useState([]);
  const [managerlist, setManagerlist] = useState([]);

  async function createJobHandler (enteredJobData) {
    var url = "https://localhost:7181/api/Jobs";
    await fetch(url, {
      method: "POST", // Or PUT
      body: JSON.stringify(enteredJobData), // assumes your data is in a form object on your instance.
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((responseJson) => {
      })
      .catch((error) => alert("Something bad happened: " + error));

      getJobs();
  };

  async function removeJobHandler  (jobId)  {
    var url = `https://localhost:7181/api/Jobs/${jobId}`;
    await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((responseJson) => {
      })
      .catch((error) => alert("Something bad happened: " + error));
    
      getJobs();
  };

  const createModelHandler = (enteredModelData) => {
    setModellist((previousModellist) => {
      return [
        ...previousModellist,
        {
          name: enteredModelData.name,
          age: enteredModelData.age,
          height: enteredModelData.height,
          weight: enteredModelData.weight,
          id: Math.random().toString(),
        },
      ];
    });
    localStorage.setItem("modellist", JSON.stringify(modellist));
  };

  const createManagerHandler = (enteredManagerData) => {
    var url = "https://localhost:7181/api/Managers";
    fetch(url, {
      method: "POST", // Or PUT
      body: JSON.stringify(enteredManagerData), // assumes your data is in a form object on your instance.
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((responseJson) => {
        //this.response = responseJson;
      })
      .catch((error) => alert("Something bad happened: " + error));
  };

  const [Tab, setTab] = useState("Job");

  function tabHandler(tab) {
    setTab(tab);
  }


  async function getJobs() {
    let url = "https://localhost:7181/api/Jobs";
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        let jobs = await response.json();
        setJoblist(jobs);
      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }
    return;
  }

  useEffect(() => {
    getJobs();
  }, []);
  // async function getJobs(){
  //   var url = "https://localhost:7181/api/Jobs";
  //   await fetch(url, {
  //     method: "GET", // Or DELETE
  //     credentials: "include",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((responseJson) => {
  //     let json = await responseJson.json();
  //     console.log(responseJson.json());
  //     setJoblist(JSON.parse(responseJson.json()));
  //   })
  //   .catch((error) => alert("Something bad happened: " + error));
  // }

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div className="home">
            {(context.isLoggedIn && context.modelId == -1) && (
              <div className="create-module">
                <div className="button-container">
                  <button onClick={() => tabHandler("Job")}>Job</button>
                  <button onClick={() => tabHandler("Model")}>Model</button>
                  <button onClick={() => tabHandler("Manager")}>Manager</button>
                </div>
                {Tab === "Model" && (
                  <NewModel
                    className="create-new-model"
                    onCreateModel={createModelHandler}
                  />
                )}
                {Tab === "Manager" && (
                  <NewManager
                    className="create-new-manager"
                    onCreateManager={createManagerHandler}
                  />
                )}
                {Tab === "Job" && (
                  <NewJob
                    className="create-new-job"
                    onCreateJob={createJobHandler}
                    onRemoveJob={removeJobHandler}
                  />
                )}
              </div>
            )}
            {context.isLoggedIn && (
              <Joblist joblist={joblist} onRemoveJob={removeJobHandler} modelId={context.modelId} />
            )}
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default Home;
