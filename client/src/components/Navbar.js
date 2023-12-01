import react from "react";
import './Navbar.css';
import { Link ,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../img/logo.png";

const Navbar = ()=>{

    const [cookies,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = ()=>{
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }


    return(
        <div className="navbar">
            <img src={logo} alt="logo" className="logo"/>
            <Link to="/">Home</Link>            
            <Link to="/create-recipe">Create Recipe</Link>
            
            {
                !cookies.access_token ? (
                <Link to="/auth">Login/Register</Link>):
                (
                    <>
                    <Link to="/saved-recipe">Saved Recipe</Link>
                    <button onClick={logout} className="logoutBtn">Logout</button>
                    </>
                )
                
            }
            
        </div>
    )
}

export default Navbar;