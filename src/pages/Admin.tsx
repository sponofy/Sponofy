import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const isAuthenticated = sessionStorage.getItem('adminAuth') === 'true';

  useEffect(() => {
    // Set the page title
    document.title = 'Sponofy Admin';
  }, []);

  // If admin is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Otherwise, redirect to login
  return <Navigate to="/admin/login" replace />;
};

export default Admin;
