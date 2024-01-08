import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Title } from './Title';

function Header() {
    const [links, setLinks] = useState([
        { url: '/', texto: 'Home' },
        { url: '/about', texto: 'Nosotros' },
        { url: '/products', texto: 'Productos', private: true },
        { url: '/contact', texto: 'Contacto' },
        { url: '/faq', texto: 'FAQ' }
    ]);

    const handleClick = () => {
        setLinks([...links, { url: '#', texto: 'Nuevo' }]);
    };

    return (
        <header>
            <Navbar dark={true} links={links} />
            <Title>
                <span>Titulo de mi web!</span>
            </Title>
        </header>
    );
}

export { Header };