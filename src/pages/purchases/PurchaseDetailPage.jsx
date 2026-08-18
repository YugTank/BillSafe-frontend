import { ArrowLeft, CalendarDays, Pencil, Receipt, ShieldCheck, Store, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { deletePurchase, getPurchaseById } from "../../services/purchaseService";
import AttachmentUpload from "../../components/purchases/AttachmentUpload";
import AttachmentsList from "../../components/purchases/AttachmentsList";
import { formatCurrency, formatDate, warrantyStatus } from "../../utils/warranty";

const Detail = ({ label, value, icon: Icon }) => <div className="detail-item"><Icon size={17} /><div><span>{label}</span><strong>{value || "—"}</strong></div></div>;

function PurchaseDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [purchase, setPurchase] = useState(null);
    const [error, setError] = useState("");
    const [attachmentVersion, setAttachmentVersion] = useState(0);

    useEffect(() => { getPurchaseById(id).then(setPurchase).catch(() => setError("We couldn't find this purchase.")); }, [id]);
    const remove = async () => { if (!window.confirm("Delete this purchase? This action cannot be undone.")) return; try { await deletePurchase(id); navigate("/purchases", { replace: true }); } catch { setError("We couldn't delete this purchase. Please try again."); } };

    if (!purchase && !error) return <MainLayout><div className="page-loading">Loading purchase…</div></MainLayout>;
    if (error) return <MainLayout><p className="feedback feedback-error">{error}</p></MainLayout>;
    const status = warrantyStatus(purchase.warrantyExpiry);
    return <MainLayout><button className="back-link" onClick={() => navigate("/purchases")}><ArrowLeft size={16} /> Back to purchases</button><header className="detail-heading"><div><p className="eyebrow">{purchase.category}</p><h1>{purchase.productName}</h1><p>{purchase.brand || "Brand not recorded"}</p></div><div className="detail-actions"><button className="btn btn-secondary" onClick={() => navigate(`/purchases/${id}/edit`)}><Pencil size={16} /> Edit</button><button className="btn btn-danger" onClick={remove}><Trash2 size={16} /> Delete</button></div></header><section className="detail-grid"><div className="panel"><h2>Product information</h2><div className="details-list"><Detail label="Product" value={purchase.productName} icon={Receipt} /><Detail label="Brand" value={purchase.brand} icon={ShieldCheck} /><Detail label="Category" value={purchase.category} icon={Receipt} /></div></div><div className="panel"><h2>Purchase information</h2><div className="details-list"><Detail label="Purchase date" value={formatDate(purchase.purchaseDate)} icon={CalendarDays} /><Detail label="Price" value={formatCurrency(purchase.price)} icon={Receipt} /><Detail label="Retailer" value={purchase.store} icon={Store} /></div></div><div className="panel warranty-detail"><div className="section-title-row"><h2>Warranty</h2><span className={`status-badge status-${status.tone}`}>{status.label}</span></div><div className="details-list"><Detail label="Warranty expiry" value={formatDate(purchase.warrantyExpiry)} icon={ShieldCheck} /><Detail label="Duration" value="Not available from the purchase response" icon={CalendarDays} /></div></div><div className="panel"><h2>Notes</h2><p className="notes-copy">{purchase.notes || "No notes added for this purchase."}</p></div></section><section className="panel attachments-panel"><div className="panel-header"><div><h2>Attachments</h2><p>Upload and download bills or warranty documents.</p></div></div><AttachmentUpload purchaseId={id} onUploaded={() => setAttachmentVersion((value) => value + 1)} /><AttachmentsList purchaseId={id} refreshKey={attachmentVersion} /></section></MainLayout>;
}

export default PurchaseDetailPage;
