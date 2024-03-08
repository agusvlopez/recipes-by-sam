import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Title } from './Title';

function Header() {
    const [links, setLinks] = useState([
        { url: '/about', text: 'About' },
        { url: '/products', text: 'Recipe Books', private: true },
        { url: '/contact', text: 'Contact' },
    ]);

    const handleClick = () => {
        setLinks([...links, { url: '#', text: 'New' }]);
    };

    return (
        <header>
            <Navbar dark={true} links={links} />
        </header>
    );
}

export { Header };