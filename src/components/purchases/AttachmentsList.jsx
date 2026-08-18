import { Download, ReceiptText, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { downloadAttachment, getAttachments } from "../../services/attachmentService";

function AttachmentsList({ purchaseId, refreshKey }) {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        getAttachments(purchaseId).then((data) => active && setAttachments(data || [])).catch(() => active && setError("We couldn't load attachments.")).finally(() => active && setLoading(false));
        return () => { active = false; };
    }, [purchaseId, refreshKey]);

    const handleDownload = async (id, fileName) => {
        try {
            const blob = await downloadAttachment(id);
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

    if (loading) return <div className="empty-inline">Loading attachments…</div>;
    if (error) return <p className="feedback feedback-error">{error}</p>;
    if (!attachments.length) return <div className="empty-inline">No documents uploaded yet.</div>;

    return <div className="attachments-list">{attachments.map((attachment) => { const isBill = attachment.fileType === "BILL"; const Icon = isBill ? ReceiptText : ShieldCheck; return <article className="attachment-row" key={attachment.id}><span className="attachment-icon"><Icon size={20} /></span><div><strong>{isBill ? "Bill" : "Warranty"}</strong><p>{attachment.fileName}</p><small>Uploaded {new Date(attachment.uploadedAt).toLocaleDateString()}</small></div><button className="btn btn-secondary btn-sm" onClick={() => handleDownload(attachment.id, attachment.fileName)}><Download size={15} /> Download</button></article>; })}</div>;
}

export default AttachmentsList;
