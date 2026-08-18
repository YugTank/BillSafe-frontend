import { Upload } from "lucide-react";
import { useState } from "react";
import { uploadAttachment } from "../../services/attachmentService";

function AttachmentUpload({ purchaseId, onUploaded }) {
    const [file, setFile] = useState(null);
    const [attachmentType, setAttachmentType] = useState("BILL");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) { setStatus({ type: "error", message: "Select a file before uploading." }); return; }
        setLoading(true);
        setStatus({ type: "", message: "" });
        try {
            const result = await uploadAttachment(purchaseId, attachmentType, file);
            setFile(null);
            event.currentTarget.reset();
            setStatus({ type: "success", message: result.message || "Attachment uploaded successfully." });
            onUploaded?.();
        } catch (error) {
            setStatus({ type: "error", message: error.response?.data?.message || "Upload failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return <form onSubmit={handleSubmit} className="upload-form"><div className="upload-form-row"><label className="file-picker"><Upload size={17} /><span>{file?.name || "Choose a file"}</span><input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label><select value={attachmentType} onChange={(e) => setAttachmentType(e.target.value)} className="input upload-type"><option value="BILL">Bill</option><option value="WARRANTY">Warranty</option></select><button disabled={loading} className="btn btn-primary">{loading ? "Uploading…" : "Upload"}</button></div>{status.message && <p className={`feedback feedback-${status.type}`}>{status.message}</p>}</form>;
}

export default AttachmentUpload;
