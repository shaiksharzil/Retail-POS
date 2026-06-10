import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, AlertTriangle, Package, X } from "lucide-react";
import {

getProducts,

createProduct,

updateProduct,

deleteProduct,

} from "../api/productApi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Added state for the custom delete modal (to replace window.confirm)
  const [deleteModalId, setDeleteModalId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    barcode: "",
    price: "",
    stockQuantity: "",
    category: "",
  });

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
const filteredProducts =
  products.filter(product => {

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const categoryMatch =
      selectedCategory === "All"
      ||
      product.category === selectedCategory;

    return (
      searchMatch &&
      categoryMatch
    );
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
    };

    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }

    setForm({
      name: "",
      barcode: "",
      price: "",
      stockQuantity: "",
      category: "",
    });

    setEditingId(null);
    loadProducts();
  }

  // Modified slightly to trigger the beautiful custom modal instead of window.confirm
  function handleDelete(id) {
    setDeleteModalId(id);
  }

  // Executes the actual deletion logic once confirmed via modal
  async function executeDelete() {
    if (!deleteModalId) return;
    await deleteProduct(deleteModalId);
    setDeleteModalId(null);
    loadProducts();
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      barcode: product.barcode,
      price: product.price,
      stockQuantity: product.stockQuantity,
      category: product.category,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", barcode: "", price: "", stockQuantity: "", category: "" });
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 p-6 md:p-10 font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <header className="flex items-center justify-between border-b border-zinc-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-zinc-950 p-3 rounded-xl shadow-sm">
              <Package className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950">
                Products
              </h1>
              <p className="text-sm font-medium text-zinc-500 mt-1">
                Manage your inventory catalog
              </p>
            </div>
          </div>
        </header>

        {/* Form Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              {editingId ? <><Edit2 size={18}/> Edit Product</> : <><Plus size={18}/> Add New Product</>}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 items-end">
            <div className="flex flex-col gap-2 xl:col-span-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Name</label>
              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-50/50 border border-zinc-200 text-zinc-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-sm font-medium"
              />
            </div>

            <div className="flex flex-col gap-2 xl:col-span-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Barcode</label>
              <input
                name="barcode"
                placeholder="SKU-000"
                value={form.barcode}
                onChange={handleChange}
                required
                className="w-full bg-zinc-50/50 border border-zinc-200 text-zinc-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-sm font-medium"
              />
            </div>

            <div className="flex flex-col gap-2 xl:col-span-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Price</label>
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full bg-zinc-50/50 border border-zinc-200 text-zinc-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-sm font-medium"
              />
            </div>

            <div className="flex flex-col gap-2 xl:col-span-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Stock</label>
              <input
                name="stockQuantity"
                type="number"
                placeholder="0"
                value={form.stockQuantity}
                onChange={handleChange}
                required
                className="w-full bg-zinc-50/50 border border-zinc-200 text-zinc-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-sm font-medium"
              />
            </div>

            <div className="flex flex-col gap-2 xl:col-span-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Category</label>
              <input
                name="category"
                placeholder="e.g. Home"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full bg-zinc-50/50 border border-zinc-200 text-zinc-900 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-sm font-medium"
              />
            </div>

            <button className="xl:col-span-1 w-full h-[46px] bg-zinc-950 text-white font-bold tracking-wide uppercase text-xs rounded-lg hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-200 transition-all flex items-center justify-center gap-2">
              {editingId ? "Update" : "Add"}
            </button>
          </form>
        </div>
        <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    p-3
                    border
                    border-zinc-300
                    rounded-lg
                    bg-white
                    mb-5
                  "
                />

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200">
                  <th className="py-4 px-6 text-xs font-extrabold text-zinc-500 uppercase tracking-widest">Name</th>
                  <th className="py-4 px-6 text-xs font-extrabold text-zinc-500 uppercase tracking-widest">Barcode</th>
                  <th className="py-4 px-6 text-xs font-extrabold text-zinc-500 uppercase tracking-widest">Price</th>
                  <th className="py-4 px-6 text-xs font-extrabold text-zinc-500 uppercase tracking-widest">Stock</th>
                  <th className="py-4 px-6 text-xs font-extrabold text-zinc-500 uppercase tracking-widest">Category</th>
                  <th className="py-4 px-6 text-xs font-extrabold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center text-zinc-400 text-sm font-medium">
                      No products found. Add your first product above.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-zinc-50 transition-colors group">
                      <td className="py-4 px-6 text-sm font-bold text-zinc-900">{product.name}</td>
                      <td className="py-4 px-6 text-sm text-zinc-500 font-mono bg-zinc-50/50">{product.barcode}</td>
                      <td className="py-4 px-6 text-sm font-semibold text-zinc-900">₹{Number(product.price).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                          product.stockQuantity > 10 ? 'bg-zinc-100 text-zinc-800' : 'bg-zinc-900 text-zinc-50'
                        }`}>
                          {product.stockQuantity} Left
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-zinc-500">{product.category}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-white hover:bg-zinc-950 rounded-md transition-colors"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Custom Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 p-8 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-zinc-100 mb-6 mx-auto">
              <AlertTriangle className="text-zinc-950" size={28} />
            </div>
            <h3 className="text-xl font-extrabold text-center text-zinc-950 mb-2">Delete Product</h3>
            <p className="text-center text-zinc-500 text-sm font-medium mb-8 leading-relaxed">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-zinc-200 text-zinc-700 font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}