import { ArrowRight, Calendar, IndianRupee, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate, warrantyStatus } from "../../utils/warranty";

function PurchaseCard({ purchase }) {
    const status = warrantyStatus(purchase.warrantyExpiry);
    return (
        <article className="purchase-card">
            <div className="purchase-card-header"><div><p className="category-chip">{purchase.category}</p><h2>{purchase.productName}</h2><p className="text-muted">{purchase.brand || "Brand not recorded"}</p></div><span className={`status-badge status-${status.tone}`}>{status.label}</span></div>
            <div className="purchase-meta"><span><IndianRupee size={16} />{formatCurrency(purchase.price)}</span><span><Calendar size={16} />{formatDate(purchase.purchaseDate)}</span><span><ShieldCheck size={16} />Expires {formatDate(purchase.warrantyExpiry)}</span></div>
            <Link className="card-action" to={`/purchases/${purchase.id}`}>View details <ArrowRight size={16} /></Link>
        </article>
    );
}

export default PurchaseCard;
