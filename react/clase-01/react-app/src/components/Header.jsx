import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Title } from './Title';

function Header() {
    const [links, setLinks] = useState([
        { url: '/', texto: 'Home' },
        { url: '/about', texto: 'About' },
        { url: '/products', texto: 'Recipe Books', private: true },
        { url: '/contact', texto: 'Contact' },
    ]);

    const handleClick = () => {
        setLinks([...links, { url: '#', texto: 'New' }]);
    };

    return (
        <header>
            <Navbar dark={true} links={links} />
        </header>
    );
}

export { Header };