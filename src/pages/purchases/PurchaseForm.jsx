import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createPurchase, updatePurchase, getPurchaseById } from "../../services/purchaseService";

function PurchaseForm(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        productName: '',
        category: '',
        brand: '',
        purchaseDate: '',
        warrantyMonths: 12,
        store: '',
        price: 0,
        notes: ''
    });
    const [loading, setLoading] = useState(Boolean(id));

    useEffect(() => {
        if(!id) return;
        const load = async () => {
            try{
                const data = await getPurchaseById(id);
                setForm({
                    productName: data.productName || '',
                    category: data.category || '',
                    brand: data.brand || '',
                    purchaseDate: data.purchaseDate || '',
                    warrantyMonths: data.warrantyMonths || 12,
                    store: data.store || '',
                    price: data.price || 0,
                    notes: data.notes || ''
                });
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const numericFields = ["warrantyMonths", "price"];
        setForm(prev => ({ ...prev, [name]: numericFields.includes(name) ? Number(value) : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(id){
                await updatePurchase(id, form);
                navigate(`/purchases/${id}`);
            }else{
                const created = await createPurchase(form);
                navigate(`/purchases/${created.id}`);
            }
        }catch(err){
            console.error(err);
        }
    };

    if(loading) return <MainLayout><div className="page-loading">Loading purchase…</div></MainLayout>;

    return (
        <MainLayout>
            <button className="back-link" onClick={() => navigate(id ? `/purchases/${id}` : "/purchases")}><ArrowLeft size={16} /> {id ? "Back to purchase" : "Back to purchases"}</button>
            <header className="page-heading compact"><div><p className="eyebrow">Purchase record</p><h1>{id ? 'Edit purchase' : 'New purchase'}</h1><p>Save the details used to track this item’s warranty.</p></div></header>

            <form onSubmit={handleSubmit} className="form-stack form-max panel">
                <div>
                    <label className="label">Product name</label>
                    <input name="productName" value={form.productName} onChange={handleChange} className="input" required />
                </div>

                <div>
                    <label className="label">Category</label>
                    <input name="category" value={form.category} onChange={handleChange} className="input" required />
                </div>

                <div>
                    <label className="label">Brand</label>
                    <input name="brand" value={form.brand} onChange={handleChange} className="input" />
                </div>

                <div className="two-col">
                    <div>
                        <label className="label">Purchase date</label>
                        <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className="input" required />
                    </div>
                    <div>
                        <label className="label">Warranty months</label>
                        <input type="number" name="warrantyMonths" value={form.warrantyMonths} onChange={handleChange} className="input" required />
                    </div>
                </div>

                <div>
                    <label className="label">Store</label>
                    <input name="store" value={form.store} onChange={handleChange} className="input" />
                </div>

                <div>
                    <label className="label">Price</label>
                    <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className="input" required />
                </div>

                <div>
                    <label className="label">Notes</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} className="input" />
                </div>

                <div>
                    <button className="btn btn-primary" type="submit">Save purchase</button>
                </div>
            </form>
        </MainLayout>
    );
}

export default PurchaseForm;
