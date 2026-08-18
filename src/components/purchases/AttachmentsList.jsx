import { Download, ReceiptText, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteAttachment, downloadAttachment, getAttachments } from "../../services/attachmentService";

function AttachmentsList({ purchaseId, refreshKey }) {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        let active = true;
        getAttachments(purchaseId).then((data) => active && setAttachments(data || [])).catch(() => active && setError("We couldn't load attachments.")).finally(() => active && setLoading(false));
        return () => { active = false; };
    }, [purchaseId, refreshKey]);

    const handleDownload = async (id, fileName) => {
        try {
            const blob = await downloadAttachment(purchaseId, id);
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = fileName || "attachment";
            anchor.click();
            URL.revokeObjectURL(url);
        } catch {
            setError("We couldn't download this attachment. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this attachment? This action cannot be undone.")) return;

        try {
            setDeletingId(id);
            setError("");
            await deleteAttachment(purchaseId, id);
            setAttachments((currentAttachments) => currentAttachments.filter((attachment) => attachment.id !== id));
        } catch {
            setError("We couldn't delete this attachment. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="empty-inline">Loading attachments…</div>;
    if (error) return <p className="feedback feedback-error">{error}</p>;
    if (!attachments.length) return <div className="empty-inline">No documents uploaded yet.</div>;

    return <div className="attachments-list">{attachments.map((attachment) => { const isBill = attachment.fileType === "BILL"; const Icon = isBill ? ReceiptText : ShieldCheck; const isDeleting = deletingId === attachment.id; return <article className="attachment-row" key={attachment.id}><span className="attachment-icon"><Icon size={20} /></span><div><strong>{isBill ? "Bill" : "Warranty"}</strong><p>{attachment.fileName}</p><small>Uploaded {new Date(attachment.uploadedAt).toLocaleDateString()}</small></div><button className="btn btn-secondary btn-sm" disabled={isDeleting} onClick={() => handleDownload(attachment.id, attachment.fileName)}><Download size={15} /> Download</button><button className="btn btn-danger btn-sm" disabled={isDeleting} onClick={() => handleDelete(attachment.id)}><Trash2 size={15} /> {isDeleting ? "Deleting..." : "Delete"}</button></article>; })}</div>;
}

export default AttachmentsList;
