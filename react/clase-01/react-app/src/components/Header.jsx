import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Title } from './Title';

function Header() {
    const [links, setLinks] = useState([
        { url: '/', texto: 'Home' },
        { url: '/about', texto: 'About' },
        { url: '/products', texto: 'Products', private: true },
        { url: '/contact', texto: 'Contact' },
        // { url: '/faq', texto: 'FAQ' }
    ]);

    const handleClick = () => {
        setLinks([...links, { url: '#', texto: 'Nuevo' }]);
    };

    return (
        <header>
            <Navbar dark={true} links={links} />
        </header>
    );
}

export { Header };