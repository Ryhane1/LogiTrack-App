import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

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