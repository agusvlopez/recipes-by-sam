import { Navigate } from "react-router-dom";

function RouteAdminPrivate({ children }) {
    if (!localStorage.getItem('token') && localStorage.getItem('token') != 'admin') {
        return <Navigate to={'/login'} replace={true} />;
    }
    return children;
}

export default RouteAdminPrivate;