import './App.css';
import Home from "./Pages/Home";
import LoginForm from "./Components/LoginForm/LoginForm";
import { useState } from "react";
import AuthContext from './Components/auth-context';
import Navbar from './Components/Navbar/Navbar';
import jwt_decode from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modelId, setModelId] = useState();
  const [error, setError] = useState("");

  async function Login(details) {
    let url = "https://localhost:7181/api/account/login";
    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(details), // Assumes data is in an object called form
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
      if (response.ok) {
        let token = await response.json();
        localStorage.setItem("token", token.jwt);
        setIsLoggedIn(true);
        var decoded = jwt_decode(token.jwt);
        setModelId(decoded.ModelId);

      } else {
        alert("Server returned: " + response.statusText);
      }
    } catch (err) {
      alert("Error: " + err);
    }
    return;
  }


  // const Login = details => {
  //   console.log(details);

  //   if(details.email === adminUser.email && details.password === adminUser.password){
  //     setIsLoggedIn(true);
  //     console.log("Login successful");
  //   } else {
  //     console.log("Login failed");
  //     setError("Login failed");
  //   }
  // }

  const Logout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        modelId: modelId,
      }}>
        <Navbar Logout={Logout} />
        {isLoggedIn && (<Home />)}
        {!isLoggedIn && (<LoginForm Login={Login} error={error} />)}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
