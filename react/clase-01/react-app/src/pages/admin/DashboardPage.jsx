import { useState } from 'react';
import { Title } from '../../components/Title';
import { Sidebar } from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Add logic to handle tab change or navigation
    };

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar activeTab={activeTab} onTabClick={handleTabClick} />

                {/* Main Content */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto mt-8 p-4">
                        <Title className="text-3xl font-bold mb-4">Dashboard</Title>
                        {/* Add your main content here */}
                    </div>
                </div>
                <Outlet />
            </div>

        </>
    );
}