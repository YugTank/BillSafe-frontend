import Sidebar from "./Sidebar";

function MainLayout({ children }) {
    return (
        <div className="app-root">
            <Sidebar />

            <main className="main-content">
                <div className="page-shell">{children}</div>
            </main>
        </div>
    );
}

export default MainLayout;
