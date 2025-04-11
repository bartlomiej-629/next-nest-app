"use client";

import { useState } from "react";
import DashboardSidebar from "@components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="relative isolate flex min-h-svh w-full bg-zinc-900 transition-all duration-300 max-lg:flex-col lg:bg-zinc-950">
      <div
        className={`fixed inset-y-0 left-0 transition-all duration-300 ${isSidebarCollapsed ? "w-[81px]" : "w-[250px]"}`}
      >
        <DashboardSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>
      <main
        className={`my-2.5 mr-2.5 flex flex-1 flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? "pl-[81px]" : "pl-[250px]"}`}
      >
        <div className="grow rounded-lg bg-slate-100 lg:shadow-sm lg:ring-1 lg:ring-white/10">
          {children}
        </div>
      </main>
    </div>
  );
}
