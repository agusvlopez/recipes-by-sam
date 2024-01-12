import SidebarItem from './SidebarItem';
import { Title } from './Title';


function Sidebar({ activeTab, onTabClick }) {
    return (
        <div className="hidden md:flex md:flex-shrink-0 w-64 md:flex-col bg-white border-r">
            <div className="p-5 border-b">
                <Title className="text-2xl font-bold text-gray-800">Recipes by Sam</Title>
            </div>
            <SidebarItem to="/admin" text="Dashboard" active={activeTab === 'dashboard'} />
            <SidebarItem to="/admin/products" text="Products" active={activeTab === 'products'} />
            <SidebarItem to="/admin/accounts" text="Users" active={activeTab === 'accounts'} />
        </div>
    );
}

export { Sidebar };