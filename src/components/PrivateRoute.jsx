import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export const PrivateRoute = ({ children }) => {
    const token = useAuthStore((state) => state.token);

    if (!token) {
      return <Navigate to="/" replace />; // redirige al index/login
    }
  
    return children;
}
