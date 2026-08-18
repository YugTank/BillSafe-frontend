import { AlertTriangle, CheckCircle2, Clock3, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getDashboard } from "../../services/dashboardService";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentPurchases from "../../components/dashboard/RecentPurchases";

function DashboardPage() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getDashboard().then(setDashboard).catch(() => setError("We couldn't load your dashboard. Please refresh and try again."));
    }, []);

    if (!dashboard && !error) return <MainLayout><div className="page-loading">Loading your dashboard…</div></MainLayout>;
    if (error) return <MainLayout><div className="feedback feedback-error">{error}</div></MainLayout>;

    const total = dashboard.totalPurchases || 0;
    const overview = [
        ["Active", dashboard.activeWarranties || 0, "active"],
        ["Expiring soon", dashboard.expiringSoon || 0, "warning"],
        ["Expired", dashboard.expiredWarranties || 0, "expired"],
    ];

    return (
        <MainLayout>
            <header className="page-heading"><div><p className="eyebrow">Overview</p><h1>Dashboard</h1><p>Keep track of the purchases that matter.</p></div><Link className="btn btn-primary" to="/purchases/new">Add purchase</Link></header>
            <section className="stats-grid">
                <DashboardCard title="Total purchases" value={total} detail="Items in your records" icon={Package} />
                <DashboardCard title="Active warranties" value={dashboard.activeWarranties} detail="Currently protected" icon={CheckCircle2} tone="green" />
                <DashboardCard title="Expiring soon" value={dashboard.expiringSoon} detail="Within the next 30 days" icon={Clock3} tone="yellow" />
                <DashboardCard title="Expired warranties" value={dashboard.expiredWarranties} detail="No longer covered" icon={AlertTriangle} tone="red" />
            </section>
            <section className="panel warranty-panel"><div className="panel-header"><div><h2>Warranty overview</h2><p>Coverage across your saved purchases</p></div></div><div className="warranty-bars">{overview.map(([label, value, tone]) => <div className="warranty-bar" key={label}><div><span>{label}</span><strong>{value}</strong></div><div className="bar-track"><span className={`bar-fill bar-${tone}`} style={{ width: `${total ? Math.round((value / total) * 100) : 0}%` }} /></div><small>{total ? Math.round((value / total) * 100) : 0}% of purchases</small></div>)}</div></section>
            <section className="panel"><div className="panel-header"><div><h2>Recent purchases</h2><p>Your latest recorded items and their coverage.</p></div><Link className="text-action" to="/purchases">View all <span>→</span></Link></div><RecentPurchases items={dashboard.recentPurchases} /></section>
        </MainLayout>
    );
}

export default DashboardPage;
