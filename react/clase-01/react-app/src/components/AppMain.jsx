import React from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function AppMain() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export { AppMain };