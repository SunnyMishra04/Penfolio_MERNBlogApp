import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: '#ffffff' }}
        >
            <Link
                className="navbar-brand text-dark mx-3"
                to="/"
                style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '1px'
                
                }}
            >
                PenFolio
            </Link>
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
                        <Link
                            className="nav-link active text-dark"
                            to="/"
                            style={{
                                fontWeight: '600'
                            }}
                        >
                            Home
                        </Link>
                    </li>
                    {token && (
                        <>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-dark"
                                    to="/add-blog"
                                    style={{
                                        fontWeight: '600'
                                    }}
                                >
                                    Create Blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-dark"
                                    to="/add-category"
                                    style={{
                                        fontWeight: '600'
                                    }}
                                >
                                    Add Category
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className="d-inline mx-auto my-2 my-lg-0">
                    {token ? (
                        <>
                            <button
                                className="btn"
                                style={{
                                    fontFamily:"'Montserrat', sans-serif",
                                    fontWeight:'500',
                                    backgroundColor: '#363738',
                                    color: '#ffffff',
                                    marginRight: '10px'
                                }}
                            >
                                Welcome: {username}
                            </button>
                            <button
                                className="btn"
                                style={{
                                    backgroundColor: '#535bf2',
                                    color: '#ffffff'
                                }}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button
                                    className="btn"
                                    style={{
                                        backgroundColor: '#5dbea3',
                                        color: '#ffffff',
                                        marginRight: '10px'
                                    }}
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: '#535bf2', color: '#ffffff' }}
                                >
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Header;
