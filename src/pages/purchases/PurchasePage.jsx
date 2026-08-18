import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getPurchases } from "../../services/purchaseService";
import PurchaseCard from "../../components/purchases/PurchaseCard";
import EmptyState from "../../components/common/EmptyState";

function PurchasesPage() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ search: "", brand: "", category: "", sort: "purchaseDate,desc" });
    const [appliedFilters, setAppliedFilters] = useState(filters);

    useEffect(() => {
        let active = true;
        getPurchases({ page, size: 12, ...appliedFilters })
            .then((response) => { if (active) { setPurchases(response.content || []); setTotalPages(response.totalPages || 0); } })
            .catch(() => active && setError("We couldn't load purchases. Please try again."))
            .finally(() => active && setLoading(false));
        return () => { active = false; };
    }, [page, appliedFilters]);

    const applyFilters = (event) => { event.preventDefault(); setLoading(true); setPage(0); setAppliedFilters(filters); };

    return (
        <MainLayout>
            <header className="page-heading"><div><p className="eyebrow">Purchase records</p><h1>Purchases</h1><p>Manage your purchases and warranty information.</p></div><Link className="btn btn-primary" to="/purchases/new"><Plus size={17} /> Add purchase</Link></header>
            <form className="purchase-toolbar" onSubmit={applyFilters}>
                <label className="search-field"><Search size={18} /><input aria-label="Search purchases" placeholder="Search products" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} /></label>
                <input className="input toolbar-select" aria-label="Brand filter" placeholder="Brand (e.g. Apple)" value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })} />
                <input className="input toolbar-select" aria-label="Category filter" placeholder="Category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
                <select className="input toolbar-select" aria-label="Sort purchases" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}><option value="purchaseDate,desc">Newest purchases</option><option value="purchaseDate,asc">Oldest purchases</option></select>
                <button className="btn btn-secondary" type="submit">Apply</button>
            </form>
            {loading ? <div className="page-loading">Loading purchases…</div> : error ? <div className="feedback feedback-error">{error}</div> : purchases.length === 0 ? <EmptyState /> : <><div className="purchase-grid">{purchases.map((purchase) => <PurchaseCard key={purchase.id} purchase={purchase} />)}</div>{totalPages > 1 && <nav className="pagination" aria-label="Purchase pages"><button className="btn btn-secondary" disabled={page === 0} onClick={() => { setLoading(true); setPage(page - 1); }}>Previous</button><span>Page {page + 1} of {totalPages}</span><button className="btn btn-secondary" disabled={page + 1 >= totalPages} onClick={() => { setLoading(true); setPage(page + 1); }}>Next</button></nav>}</>}
        </MainLayout>
    );
}

export default PurchasesPage;
