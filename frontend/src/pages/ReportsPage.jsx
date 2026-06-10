import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ReportsPage() {
  const [report, setReport] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [baseReport, setBaseReport] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  async function loadFilteredReport() {
    if (!fromDate || !toDate) {
      toast.warning("Select both dates");
      return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/api/reports/filter?from=${fromDate}&to=${toDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    setReport({
      ...data,
      todaySales: baseReport.todaySales,
      weeklySales: baseReport.weeklySales,
      monthlySales: baseReport.monthlySales,
      yearlySales: baseReport.yearlySales,
      highestSaleMonth: baseReport.highestSaleMonth,
      lowestSaleMonth: baseReport.lowestSaleMonth,
      highestSaleYear: baseReport.highestSaleYear,
      lowestSaleYear: baseReport.lowestSaleYear,
    });
  }

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBaseReport(data);
      setReport(data);
    }
    load();
  }, []);

  if (!report) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-sm font-medium tracking-wide text-zinc-400">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Reports</h1>
            <p className="text-sm text-zinc-500 mt-1">Retail business overview and performance insights.</p>
          </div>

          {/* Filter Panel */}
          <div className="flex flex-wrap items-center gap-3 bg-white border border-zinc-200 p-3 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider pl-1">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-transparent border-0 text-sm font-medium p-1 focus:ring-0 text-zinc-800 focus:outline-none"
              />
            </div>
            <div className="h-4 w-px bg-zinc-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-transparent border-0 text-sm font-medium p-1 focus:ring-0 text-zinc-800 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto sm:ml-2">
              <button
                onClick={loadFilteredReport}
                className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Generate
              </button>
              <button
                onClick={() => window.location.reload()}
                className="border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Sales Cycle Grid */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Sales Cycle</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Today", value: report.todaySales },
              { label: "This Week", value: report.weeklySales },
              { label: "This Month", value: report.monthlySales },
              { label: "This Year", value: report.yearlySales },
            ].map((card, idx) => (
              <div key={idx} className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-sm hover:border-zinc-300 transition-all">
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{card.label}</p>
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
                  ₹{card.value?.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Core KPI Metrics */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Core Deliveries</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-950 mt-2">
                ₹{report.totalSales?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </h3>
            </div>

            <div className="bg-zinc-950 text-white rounded-xl p-6 shadow-sm">
              <p className="text-xs font-medium opacity-60 uppercase tracking-wider">Total Orders Volume</p>
              <h3 className="text-3xl font-bold tracking-tight mt-2">{report.totalOrders}</h3>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Average Ticket Value</p>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-950 mt-2">
                ₹{report.averageOrderValue?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </h3>
            </div>
          </div>
        </div>

        {/* Performance Split */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Highest Performing */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-3 mb-4">
              Peak Performance Windows
            </h2>
            <div className="divide-y divide-zinc-100 space-y-3">
              {[
                { label: "Top Sale Day", data: report.highestSaleDay },
                { label: "Top Sale Month", data: report.highestSaleMonth },
                { label: "Top Sale Year", data: report.highestSaleYear },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between ${i > 0 ? "pt-3" : ""}`}>
                  <div>
                    <p className="text-xs font-medium text-zinc-400">{item.label}</p>
                    <h4 className="text-sm font-semibold text-zinc-800 mt-0.5">{item.data?.period || "—"}</h4>
                  </div>
                  <span className="text-sm font-bold text-zinc-950 bg-zinc-50 border border-zinc-200/60 px-2.5 py-1 rounded-md">
                    ₹{item.data?.amount?.toLocaleString("en-IN") || "0.00"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lowest Performing */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-3 mb-4">
              Lowest Performance Windows
            </h2>
            <div className="divide-y divide-zinc-100 space-y-3">
              {[
                { label: "Lowest Sale Day", data: report.lowestSaleDay },
                { label: "Lowest Sale Month", data: report.lowestSaleMonth },
                { label: "Lowest Sale Year", data: report.lowestSaleYear },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between ${i > 0 ? "pt-3" : ""}`}>
                  <div>
                    <p className="text-xs font-medium text-zinc-400">{item.label}</p>
                    <h4 className="text-sm font-semibold text-zinc-800 mt-0.5">{item.data?.period || "—"}</h4>
                  </div>
                  <span className="text-sm font-medium text-zinc-500 bg-zinc-50 border border-zinc-200/40 px-2.5 py-1 rounded-md">
                    ₹{item.data?.amount?.toLocaleString("en-IN") || "0.00"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}