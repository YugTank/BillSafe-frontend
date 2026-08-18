function DashboardCard({ title, value, detail, icon: Icon, tone = "orange" }) {
    return (
        <section className={`stat-card stat-${tone}`}>
            <div>
                <p className="stat-label">{title}</p>
                <strong className="stat-value">{value ?? 0}</strong>
                {detail && <p className="stat-detail">{detail}</p>}
            </div>
            <span className="stat-icon"><Icon size={20} /></span>
        </section>
    );
}

export default DashboardCard;
