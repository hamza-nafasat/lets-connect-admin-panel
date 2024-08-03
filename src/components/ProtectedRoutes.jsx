/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children, user, redirectUrl = "/" }) => {
    if (!user) return <Navigate to={redirectUrl} />;
    return children ? children : <Outlet />;
};

export default ProtectedRoutes;
