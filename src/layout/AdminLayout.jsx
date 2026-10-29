import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/admin/AdminNavbar";
import AdminSidebar from "../component/admin/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background-soft)] flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto min-h-screen lg:pl-72 ml-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;