import React, { useState, createContext, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Receipt,
  TrendingUp,
  BarChart2,
  LogOut,
  Hexagon,
  Building2
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

 function logout() {
     localStorage.removeItem("token");
     navigate("/login");
   }

  const menuItems = [
    { name: "Dashboard", path: "/pos/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/pos/products", icon: Package },
    { name: "Inventory", path: "/pos/inventory", icon: Boxes },
    { name: "Billing", path: "/pos/billing", icon: Receipt },
    { name: "Sales", path: "/pos/sales", icon: TrendingUp },
    { name: "Reports", path: "/pos/reports", icon: BarChart2 },
    {
      name: "Account",
      path: "/pos/account",
      icon: Building2
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans border-r border-neutral-900 shadow-2xl">

      {/* Brand / Logo Area */}
      <div className="h-20 px-6 flex items-center border-b border-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center shadow-sm">
            <Hexagon size={20} className="fill-current" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Retail POS
          </h1>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[11px] font-bold text-neutral-600 uppercase tracking-widest mb-4">
          Overview
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`
              }
            >
              {/* text-current ensures the icon inherits the color from the parent link */}
              <Icon size={18} className="text-current" />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      {/* Footer / Logout Area */}
      <div className="p-4 border-t border-neutral-900">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-400 border border-neutral-800 hover:bg-white hover:text-black hover:border-white transition-all duration-200 group"
        >
          <LogOut size={16} className="text-current" />
          Logout
        </button>
      </div>
    </div>
  );
};