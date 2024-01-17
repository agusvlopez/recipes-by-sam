import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { Title } from './Title';


function Sidebar({ activeTab, onTabClick }) {
    return (
        <div className="hidden md:flex md:flex-shrink-0 w-64 md:flex-col bg-white border-r">
            <div className="p-5 border-b">
                <Title className="text-2xl font-bold text-gray-800"><Link to="/">Recipes by Sam</Link></Title>
            </div>
            <SidebarItem to="/admin" text="Dashboard" active={activeTab === 'dashboard'} onTabClick={onTabClick} />
            <SidebarItem to="/admin/products" text="Products" active={activeTab === 'products'} onTabClick={onTabClick} />
        </div>
    );
}

export { Sidebar };