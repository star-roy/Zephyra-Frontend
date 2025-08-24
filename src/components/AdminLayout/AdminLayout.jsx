import React from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
