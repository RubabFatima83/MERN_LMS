import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRoles }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // ❌ User is logged in but not allowed → redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
