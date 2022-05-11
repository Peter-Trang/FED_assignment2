import './App.css';
import Home from "./Pages/Home";
import LoginForm from "./Components/LoginForm/LoginForm";
import {useState} from "react";
import AuthContext from './Components/auth-context';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const adminUser = {
    email: "admin@a.dk",
    password: "admin"
  }



  const Login = details => {
    console.log(details);

    if(details.email === adminUser.email && details.password === adminUser.password){
      setIsLoggedIn(true);
      console.log("Login successful");
    } else {
      console.log("Login failed");
      setError("Login failed");
    }
  }

  const Logout = () => {
    console.log("logout");
    setIsLoggedIn(false);
  }

  

  return (
    <div className="App">
      <AuthContext.Provider value={{ 
        isLoggedIn: isLoggedIn,
      }}>
      <Navbar Logout={Logout}/>
      <Home/>
      {!isLoggedIn && (<LoginForm Login={Login} error={error}/>)}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
