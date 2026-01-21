import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      {/* <NavLink to="/">Home</NavLink> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            i-NoteBook
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Aboute">
                  Aboute
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button type="submit" className="btn btn-outline-dark">
                Search
              </button>
            </form>
            <NavLink className="btn btn-primary mx-1" to="/Login" role="button">
              Login
            </NavLink>
            <NavLink
              className="btn btn-primary mx-1"
              to="/Signup"
              role="button"
            >
              SignUp
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
