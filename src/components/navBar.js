import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="#">CDE</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-link" to="/customers">Customers</NavLink>
                        <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </div>
                </div>
                <span className="navbar-text">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </span>
            </div>
        </nav>
    )
}

export default NavBar;