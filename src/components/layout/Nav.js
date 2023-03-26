import { BrowserRouter as Router, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Nav() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/favourites">Favourites</NavLink>
        </li>
        {auth ? (
          <>
            |
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
            <li>
              <button onClick={logout}>Log out</button>
            </li>
            |
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
