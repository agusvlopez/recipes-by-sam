import { Link, NavLink } from "react-router-dom";

function SidebarItem({ to, text, active, onTabClick }) {
    const handleClick = () => {
        onTabClick(text);
    };

    return (
        <NavLink
            to={to}
            className={`p-4 hover:bg-gray-300 ${active ? 'bg-gray-300' : ''}`}
            activeclassname="bg-gray-300"
            onClick={handleClick}
        >
            {text}
        </NavLink>
    );
}

export default SidebarItem;