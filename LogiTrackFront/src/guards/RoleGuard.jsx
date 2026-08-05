import { Navigate } from "react-router-dom";

function RoleGuard({ children, role }) {

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return userRole === role
        ? children
        : <Navigate to="/unauthorized" replace />;
}

export default RoleGuard;
