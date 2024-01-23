import { useState } from 'react';
import { Title } from '../../components/Title';
import { Sidebar } from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import recipeDashboard from '../../covers/dashboard.jpg';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Add logic to handle tab change or navigation
    };

    return (
        <>
            <div className="flex bg-gray-100">
                <Sidebar activeTab={activeTab} onTabClick={handleTabClick} />

                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 h-screen">
                    <div className=''>
                        <img src={recipeDashboard} alt="" className='h-3/6' />
                    </div>
                    <div className="container mx-auto mt-8 p-4">
                        <Title className="text-3xl font-bold mb-4">Dashboard</Title>
                        <p>Hi! Soon you'll see all the relevant data about our sells here...</p>
                    </div>
                </div>
                <Outlet />
            </div>

        </>
    );
}