import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AdminRoute = ({ children, requireSuperAdmin = false }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  // Check if user has admin privileges
  const isAdmin = user.role === 'admin' || user.role === 'super_admin';
  const isSuperAdmin = user.role === 'super_admin';

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  if (!requireSuperAdmin && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default AdminRoute;
