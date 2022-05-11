import './LoginForm.css';
import {useState} from "react";

function LoginForm({Login, error}) {
  const [details, setDetails] = useState({email: "", password: ""});

  const handleEmail = (event) => {
    setDetails({...details, email: event.target.value});
  }
  const handlePassword = (event) => {
    setDetails({...details, password: event.target.value});
  }

  const submitHandler = (event) => {
    event.preventDefault();
    Login(details);
  }

  return (
    <div className="login-form">
        <form onSubmit={submitHandler}>
          {error && <p className="error">{error}</p>}
          <label for="email">E-mail:</label><br/>
          <input type="email" value={details.email} id="email" name="email" placeholder="John@doe.com" onChange={handleEmail}/><br/>
          <label for="password">Password:</label><br/>
          <input type="password" value={details.password} id="password" name="password" placeholder="***" onChange={handlePassword}/><br/><br/>
          <button className="login-button" type="submit">Login</button>
        </form> 
    </div>
  );
}

export default LoginForm;