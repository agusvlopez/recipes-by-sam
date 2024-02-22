import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { Title } from './Title';
import { useState } from 'react';


function Sidebar({ activeTab, onTabClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className={`${isMenuOpen ? 'flex flex-shrink-0 w-64 flex-col' : 'hidden'} md:flex md:flex-shrink-0 w-64 md:flex-col bg-white`}>
                <div className="p-5 border-b">
                    <Link to="./" className="flex items-center">
                        <img src="./src/covers/logo-horizontal.png" alt="logo" />
                    </Link>
                </div>
                <SidebarItem to="/admin" text="Dashboard" active={activeTab === 'dashboard'} onTabClick={onTabClick} />
                <SidebarItem to="/admin/products" text="Products" active={activeTab === 'products'} onTabClick={onTabClick} />
            </div>
            <div className='bg-white p-2 pb-1 md:p-0'>
                <button
                    className="focus:outline-none bg-transparent hover:bg-transparent md:hidden"
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
            </div>
        </>
    );
}

export { Sidebar };