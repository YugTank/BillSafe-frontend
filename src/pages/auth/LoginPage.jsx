import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../context/useAuth";
import { login as loginRequest } from "../../services/authService";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await loginRequest(formData);
            if (!response.token) throw new Error("The login response did not include a token.");
            login(response.token);
            navigate("/dashboard", { replace: true });
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="auth-card">
                <p className="eyebrow">BillSafe</p>
                <h1>Welcome back</h1>
                <p className="text-muted">Sign in to manage your purchases and warranties.</p>
                <form className="form-stack" onSubmit={handleLogin}>
                    <label className="field"><span>Email</span><input required name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input" /></label>
                    <label className="field"><span>Password</span><input required name="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input" /></label>
                    {error && <p className="feedback feedback-error">{error}</p>}
                    <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "Signing in…" : "Sign in"}</button>
                </form>
                <p className="auth-footer">New to BillSafe? <Link to="/register">Create an account</Link></p>
            </div>
        </AuthLayout>
    );
}

export default LoginPage;
