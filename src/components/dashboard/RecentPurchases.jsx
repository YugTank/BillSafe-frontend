import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, warrantyStatus } from "../../utils/warranty";

function RecentPurchases({ items = [] }) {
    if (!items.length) return <div className="empty-inline">No purchases yet. Add one to start tracking warranties.</div>;

    return (
        <div className="recent-list">
            {items.map((purchase) => {
                const status = warrantyStatus(purchase.warrantyExpiry);
                return (
                    <article className="recent-row" key={purchase.id}>
                        <div className="product-avatar">{purchase.productName?.slice(0, 1).toUpperCase()}</div>
                        <div className="recent-product"><strong>{purchase.productName}</strong><span>Purchased {formatDate(purchase.purchaseDate)}</span></div>
                        <div className="recent-date"><span>Warranty expiry</span><strong>{formatDate(purchase.warrantyExpiry)}</strong></div>
                        <span className={`status-badge status-${status.tone}`}>{status.label}</span>
                        <Link className="icon-link" to={`/purchases/${purchase.id}`}>View <ArrowRight size={15} /></Link>
                    </article>
                );
            })}
        </div>
    );
}

export default RecentPurchases;
