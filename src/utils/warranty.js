export function warrantyStatus(expiry) {
    if (!expiry) return { label: "Unknown", tone: "neutral" };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(`${expiry}T00:00:00`);
    const days = Math.ceil((expiryDate - today) / 86400000);
    if (days < 0) return { label: "Expired", tone: "expired" };
    if (days <= 30) return { label: "Expiring soon", tone: "warning" };
    return { label: "Active", tone: "active" };
}

export function formatDate(date) {
    if (!date) return "—";
    return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

export function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value ?? 0);
}
