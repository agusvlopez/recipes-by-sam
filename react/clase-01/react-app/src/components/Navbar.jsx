import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ dark, links }) {
    const navigate = useNavigate();

    let className = 'nav-principal';

    if (dark) {
        className += ' nav-principal--dark';
    }

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav>
            <ul className={className}>
                {links.map((element, index) => {
                    if (element.private && !localStorage.getItem('token')) {
                        return null;
                    }
                    return (
                        <li key={index}>
                            <Link to={element.url} className="nav-principal__item">
                                {element.texto}
                            </Link>
                        </li>
                    );
                })}

                {localStorage.getItem('token') ? (
                    <li>
                        <button onClick={handleLogout} className="nav-principal__item">
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <button onClick={handleLogin} className="nav-principal__item">
                            Login
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export { Navbar };