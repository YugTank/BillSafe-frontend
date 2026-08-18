import { Home, LogOut, Menu, Package, Shield, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", icon: Home, path: "/dashboard" },
        { name: "Purchases", icon: Package, path: "/purchases" },
    ];

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate("/", { replace: true });
    };

    return (
        <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
            <div className="sidebar-header">
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="brand-link">
                    <div style={{ display: 'flex', height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: 'rgba(249,115,22,0.08)', color: '#f97316' }}>
                        <Shield size={16} strokeWidth={2.2} />
                    </div>
                    <h1 className="brand-name">BillSafe</h1>
                </Link>
                <button className="mobile-menu-toggle" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <nav className="nav-list">
                <ul>
                    {navItems.map(({ name, icon: Icon, path }) => (
                            <li className="nav-item" key={name}>
                                <NavLink to={path} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                                    <Icon size={18} strokeWidth={2} />
                                    <span>{name}</span>
                                </NavLink>
                            </li>
                    ))}
                </ul>
            </nav>

            <div style={{ borderTop: '1px solid #e6eef6', padding: '1rem' }}>
                <button type="button" className="logout-button" onClick={handleLogout}>
                    <LogOut size={18} strokeWidth={2} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
