import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

function Layout() {
    return (
        <div className="app-layout">
            <Sidebar />

            <div className="main-container">
                <Navbar />

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;