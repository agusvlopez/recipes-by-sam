import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/apiSlice';
import { Loader } from './Loader';
import logo from '../covers/logo-white.png';

const Footer = () => {
    const [links, setLinks] = useState([
        { url: '/', text: 'Home' },
        { url: '/about', text: 'About' },
        { url: '/products', text: 'Recipe Books', private: true },
        { url: '/contact', text: 'Contact' },
    ]);

    const { data: products, isLoading } = useGetProductsQuery();
    const latestProducts = products ? products.slice(-4) : [];

    return (
        <footer className="bgDark text-white pt-8">
            <div className="container mx-auto p-6">
                <div className="p-2 md:flex gap-8 md:justify-around">
                    <div>
                        <img src={logo} alt="Logo" />
                        <p className="text-lg mt-4 font-semibold">Ready to cook?</p>
                        <Link to="./contact" className="linkFooter">Sign up for our weekly newsletters!</Link>
                    </div>
                    <div>
                        <p className="mt-2 font-semibold">LATEST RECIPES BOOKS</p>
                        {isLoading ?
                            <div className="p-4">
                                <Loader
                                    loaderType="loader-mini"
                                />
                            </div>
                            :
                            <ul>
                                {latestProducts.map((product) => (
                                    <li className="mb-2 mt-2 text-sm">
                                        <Link to={`./products/${product._id}`} key={product._id} >
                                            <p className="linkFooter">{product.name}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                    <div>
                        <p className="mt-2 font-semibold">QUICK LINKS</p>
                        {links.map((element, index) => {
                            if (element.private && !localStorage.getItem('token')) {
                                return null;
                            }
                            return (
                                <>
                                    <li key={index} className="mb-2 mt-2 text-sm linkFooter">
                                        <Link to={element.url}>
                                            {element.text}
                                        </Link>
                                    </li>
                                </>
                            );
                        })}
                    </div>
                    <div>
                        <p className="mt-2 font-semibold">LET'S BE FRIENDS!</p>
                        <div className="flex gap-4 md:justify-center mt-2">
                            <span className="icon-twitter"></span>
                            <span className="icon-instagram"></span>
                            <span className="icon-facebook"></span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t-2">
                    <p className="text-center pt-4 text-sm">&copy; 2024 Recipes by Sam. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;