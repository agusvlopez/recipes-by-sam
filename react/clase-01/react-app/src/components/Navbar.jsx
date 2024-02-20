import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ links }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav>
            <div className="bgWhite p-2 pb-2 md:p-0 flex justify-between">
                <button
                    className="text-white focus:outline-none bgWhite md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6 textBrown"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <Link to="./" className="logo-mobile p-1">
                    <img src="./src/covers/logo-horizontal.png" alt="logo" />
                </Link>
            </div>
            <ul
                className={`nav-principal bgWhite pb-2 ${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:items-center p-2`}
            >
                <Link to="./" className="logo-desktop">
                    <img src="./src/covers/logo-horizontal.png" alt="logo" />
                </Link>
                {links.map((element, index) => {
                    if (element.private && !localStorage.getItem('token')) {
                        return null;
                    }
                    return (
                        <>
                            <li key={index} className="pb-2 md:pb-0 nav-principal__item pl-2">
                                <Link to={element.url}>
                                    {element.texto}
                                </Link>
                            </li>
                        </>
                    );
                })}

                {localStorage.getItem('token') ? (
                    <li className="pb-2 md:pb-0 nav-principal__item">
                        <button onClick={handleLogout} className="bg-transparent font-semibold">
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li className="pb-2 md:pb-0 nav-principal__item">
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="pb-2 md:pb-0 nav-principal__item">
                            <Link to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                )}
                {localStorage.getItem('role') == 'admin' &&
                    <li className="pb-2 md:pb-0 nav-principal__item">
                        <Link to="/admin">
                            Admin
                        </Link>
                    </li>
                }
            </ul>
        </nav >
    );
}

export { Navbar };