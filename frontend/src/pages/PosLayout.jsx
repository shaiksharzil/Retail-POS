import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function PosLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}