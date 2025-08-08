import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children, requireSuperAdmin = false }) => {
  const { userData, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  // Check if user has admin privileges
  const isAdmin = userData.role === 'admin' || userData.role === 'super_admin';
  const isSuperAdmin = userData.role === 'super_admin';

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  if (!requireSuperAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default AdminRoute;
