import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Jika tidak ada token, arahkan ke halaman login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children; // Jika ada token, render komponen anak
};

export default ProtectedRoute;
