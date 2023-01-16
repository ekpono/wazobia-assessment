import './App.css'
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import VerifyEmail from "./Pages/VerifyEmail.jsx";
import NotFound from "./Pages/NotFound.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AuthGuard from "./guards/AuthGuard.jsx"
import GuestGuard from "./guards/GuestGuard.jsx"
import {ItemProvider} from "./contexts/ItemContext.jsx";
function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" exact element={<GuestGuard><Login /></GuestGuard>} />
                    <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
                    <Route path="/register" element={<GuestGuard><Register /></GuestGuard>} />
                    <Route path="/dashboard" element={
                        <AuthGuard>
                            <ItemProvider>
                                <Dashboard />
                            </ItemProvider>
                        </AuthGuard>
                    } />
                    <Route path="/email/verify/:token" element={
                        <AuthGuard>
                            <VerifyEmail />
                        </AuthGuard>
                    } />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App
