import { Navigate } from "react-router-dom";

function RoutePrivate({ children }) {
    if (!localStorage.getItem('token')) {
        return <Navigate to={'/login'} replace={true} />;
    }
    return children;
}

export default RoutePrivate;