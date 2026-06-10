import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";
import { getProducts } from "../api/productApi";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [report, setReport] = useState([]);

  useEffect(() => {
    async function load() {
      const productData = await getProducts();
      setProducts(productData);

      const data = await getDashboardStats();
      const token = localStorage.getItem("token");

      const reportResponse = await fetch(`${API_URL}/api/reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const reportData = await reportResponse.json();
      setReport(reportData);
      setStats(data);
    }

    load();
  }, []);

  if (!stats || !report) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-sm font-mono tracking-widest text-black animate-pulse">LOADING...</p>
      </div>
    );
  }

  const lowStockProducts = products.filter((p) => p.stockQuantity <= 10);
  const outOfStockProducts = products.filter((p) => p.stockQuantity <= 0);

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="border-b border-black pb-6 mb-10 flex justify-between items-baseline">
        <h1 className="text-4xl font-black tracking-tight uppercase">Dashboard</h1>
        <p className="text-sm font-mono text-neutral-500">System Status: Active</p>
      </div>

      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="border border-black p-6 bg-white flex flex-col justify-between">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-4">Total Products</h2>
          <p className="text-4xl font-bold tracking-tight">{stats.totalProducts}</p>
        </div>

        <div className="border border-black p-6 bg-white flex flex-col justify-between">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-4">Total Stock</h2>
          <p className="text-4xl font-bold tracking-tight">{stats.totalStock}</p>
        </div>

        <div className="border border-black p-6 bg-white flex flex-col justify-between">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mb-4">Low Stock Alerts</h2>
          <p className="text-4xl font-bold tracking-tight">{stats.lowStockProducts}</p>
        </div>

        <div className="border border-black p-6 bg-black text-white flex flex-col justify-between">
          <h2 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-4">Inventory Value</h2>
          <p className="text-4xl font-bold tracking-tight">₹{stats.inventoryValue}</p>
        </div>
      </div>

      {/* PRODUCT INSIGHTS & INVENTORY HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* INSIGHTS */}
        <div className="border border-black p-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-3 mb-6">Product Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-neutral-500">Top Selling Product</p>
              <h3 className="text-xl font-bold truncate">{report.topSellingProduct?.productName || "N/A"}</h3>
              <p className="text-sm font-mono text-neutral-600">Units Sold: {report.topSellingProduct?.quantitySold || 0}</p>
            </div>
            <div className="space-y-1 md:border-l md:border-neutral-200 md:pl-6">
              <p className="text-xs uppercase tracking-wider text-neutral-500">Lowest Selling Product</p>
              <h3 className="text-xl font-bold truncate">{report.lowestSellingProduct?.productName || "N/A"}</h3>
              <p className="text-sm font-mono text-neutral-600">Units Sold: {report.lowestSellingProduct?.quantitySold || 0}</p>
            </div>
          </div>
        </div>

        {/* HEALTH */}
        <div className="border border-black p-6">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-black pb-3 mb-6">Inventory Health</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Low Stock Items</p>
              <h3 className="text-4xl font-bold">{lowStockProducts.length}</h3>
            </div>
            <div className="flex flex-col justify-center border-l border-neutral-200 pl-6">
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Out Of Stock</p>
              <h3 className="text-4xl font-bold text-neutral-400">{outOfStockProducts.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED ACTION LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LOW STOCK TABLE */}
        <div className="border border-black p-6">
          <h3 className="text-md font-bold uppercase tracking-wider mb-4">Low Stock Attention List</h3>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-neutral-400 font-mono italic">All products well stocked.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-mono">
                <thead>
                  <tr className="border-b border-black uppercase text-xs tracking-wider text-neutral-500">
                    <th className="pb-2 font-semibold">Product Name</th>
                    <th className="pb-2 text-right font-semibold">Qty Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {lowStockProducts.slice(0, 10).map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50">
                      <td className="py-2 text-black font-sans">{product.name}</td>
                      <td className="py-2 text-right font-bold">{product.stockQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* OUT OF STOCK TABLE */}
        <div className="border border-black p-6">
          <h3 className="text-md font-bold uppercase tracking-wider mb-4">Out of Stock Attention List</h3>
          {outOfStockProducts.length === 0 ? (
            <p className="text-sm text-neutral-400 font-mono italic">No items currently out of stock.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-mono">
                <thead>
                  <tr className="border-b border-black uppercase text-xs tracking-wider text-neutral-500">
                    <th className="pb-2 font-semibold">Product Name</th>
                    <th className="pb-2 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {outOfStockProducts.slice(0, 10).map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50">
                      <td className="py-2 text-neutral-500 font-sans">{product.name}</td>
                      <td className="py-2 text-right text-xs uppercase tracking-widest font-bold text-neutral-400">0 Available</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}