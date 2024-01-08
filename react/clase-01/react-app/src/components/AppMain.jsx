import React from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

function AppMain() {
    return (
        <>
            <Header />
            <h1>App Main</h1>
            <Outlet />
        </>
    );
}

export { AppMain };