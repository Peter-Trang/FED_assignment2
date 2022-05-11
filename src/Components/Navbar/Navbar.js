import {useContext} from 'react';
import "./Navbar.css";
import AuthContext from "../../Components/auth-context";

const Navbar = ({Logout}) => {
    const context = useContext(AuthContext);

    const logoutHandler = () => {
        Logout();
    }

    return (
    <div className='navbar'>
        <h1>Model Management</h1>
        <div>
            {context.isLoggedIn && <button className='button button-logout' onClick={logoutHandler}>Logout</button>}
        </div>
    </div>
  )
}

export default Navbar;