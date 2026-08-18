import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { register } from "../../services/authService";

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });
        try {
            const data = await register(form);
            setStatus({ type: "success", message: data.message || "Account created. You can now sign in." });
            setTimeout(() => navigate("/"), 700);
        } catch (error) {
            setStatus({ type: "error", message: error.response?.data?.message || "We couldn't create your account. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="auth-card">
                <p className="eyebrow">BillSafe</p>
                <h1>Create your account</h1>
                <p className="text-muted">Keep every purchase and warranty in one place.</p>
                <form className="form-stack" onSubmit={submit}>
                    <label className="field"><span>Username</span><input required minLength="3" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input" /></label>
                    <label className="field"><span>Email</span><input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" /></label>
                    <label className="field"><span>Password</span><input required minLength="8" type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input" /></label>
                    {status.message && <p className={`feedback feedback-${status.type}`}>{status.message}</p>}
                    <button className="btn btn-primary" disabled={loading}>{loading ? "Creating account…" : "Create account"}</button>
                </form>
                <p className="auth-footer">Already have an account? <Link to="/">Sign in</Link></p>
            </div>
        </AuthLayout>
    );
}

export default RegisterPage;
