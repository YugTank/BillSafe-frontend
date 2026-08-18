import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PurchasesPage from "../pages/purchases/PurchasePage";
import PurchaseDetailPage from "../pages/purchases/PurchaseDetailPage";
import PurchaseForm from "../pages/purchases/PurchaseForm";
import ProtectedRoute from "./ProtectedRoute";

function AppRoute(){
    return(
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/dashboard" element={<ProtectedRoute>
                                                <DashboardPage />
                                            </ProtectedRoute>}/>

            <Route path="/purchases" element={<ProtectedRoute>
                                                <PurchasesPage/>
                                            </ProtectedRoute>}/>

            <Route path="/purchases/new" element={<ProtectedRoute>
                                                <PurchaseForm />
                                            </ProtectedRoute>}/>

            <Route path="/purchases/:id" element={<ProtectedRoute>
                                                <PurchaseDetailPage />
                                            </ProtectedRoute>}/>
            <Route path="/purchases/:id/edit" element={<ProtectedRoute>
                                                <PurchaseForm />
                                            </ProtectedRoute>}/>

        </Routes>
    )   
}

export default AppRoute;
