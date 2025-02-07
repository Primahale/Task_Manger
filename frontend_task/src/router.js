import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function Router() {
    return (
        <AuthProvider>
            <TaskProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </TaskProvider>
        </AuthProvider>
    );
}
