import { Link } from "react-router-dom";

function SidebarItem({ to, icon, text, active }) {
    return (
        <Link
            to={to}
            className={`flex items-center py-2 px-4 cursor-pointer text-gray-600 hover:text-gray-800 ${active ? 'bg-gray-200' : ''
                }`}
        >
            {icon && <span className="mr-3">{icon}</span>}
            <span className="flex-1">{text}</span>
        </Link>
    );
}

export default SidebarItem;