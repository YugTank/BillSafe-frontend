import { PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyState() {
    return <div className="empty-state"><PackagePlus size={30} /><h2>No purchases found</h2><p>Add a purchase to start tracking its warranty and documents.</p><Link className="btn btn-primary" to="/purchases/new">Add purchase</Link></div>;
}

export default EmptyState;
