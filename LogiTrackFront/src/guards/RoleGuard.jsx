import { Navigate, Outlet } from "react-router-dom";

function RoleGuard({ roles }) {

    const userRole = localStorage.getItem("role");

    if (!roles.includes(userRole)) {
        return <Navigate to="/access-denied" replace />;
    }

    return <Outlet />;
}

export default RoleGuard;