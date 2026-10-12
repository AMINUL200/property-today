import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AgentNavbar from "../component/agent/AgentNavbar";
import AgentSidebar from "../component/agent/AgentSidebar";

const AgentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background-soft)] flex">
      {/* Sidebar */}
      <AgentSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AgentNavbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto min-h-screen lg:pl-74">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;