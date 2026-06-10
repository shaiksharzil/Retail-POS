import { useEffect, useState } from "react";
import { getTransactions,stockIn, stockOut } from "../api/inventoryApi";
import { getProducts }
from "../api/productApi";
import { toast } from "react-toastify";

export default function InventoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [transactionType, setTransactionType] =
    useState("STOCK_IN");

  useEffect(() => {
    async function load() {
        const productsData =
          await getProducts();

        setProducts(productsData);
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch inventory transactions:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);
const filteredTransactions =
  transactions.filter(tx => {

    const typeMatch =
      filterType === "ALL"
      ||
      tx.type === filterType;

    const searchMatch =
      tx.product?.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );

    return (
      typeMatch &&
      searchMatch
    );
  });

async function handleInventoryUpdate() {

  if(
    !selectedProduct ||
    !quantity
  ) {

    toast.error(
      "Fill all fields"
    );

    return;
  }

  const payload = {

    productId:
      Number(selectedProduct),

    quantity:
      Number(quantity),

    remarks
  };

  try {

    if(
      transactionType ===
      "STOCK_IN"
    ) {

      await stockIn(
        payload
      );

      toast.success(
        "Stock added"
      );

    } else {

      await stockOut(
        payload
      );

      toast.success(
        "Stock removed"
      );

    }

    const transactionsData =
      await getTransactions();

    setTransactions(
      transactionsData
    );

    const productsData =
      await getProducts();

    setProducts(
      productsData
    );

    setQuantity("");
    setRemarks("");
    setSelectedProduct("");

  } catch(error) {

    toast.error(
      "Operation failed"
    );

  }
}

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase text-neutral-900">
              Inventory Ledger
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              A minimalist overview of real-time stock movements and logs.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-sm text-neutral-500">

              Total Transactions:
              {filteredTransactions.length}

            </div>
          </div>
        </div>
        <div className="flex gap-3 mb-6">

          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            className="
              border
              px-4
              py-2
              w-72"
          />

          <select
            value={filterType}
            onChange={(e)=>
              setFilterType(
                e.target.value
              )
            }
            className="
              border
              px-4
              py-2"
          >

            <option value="ALL">
              All
            </option>

            <option value="STOCK_IN">
              Stock In
            </option>

            <option value="STOCK_OUT">
              Stock Out
            </option>

          </select>

        </div>
        <div className="bg-white border border-neutral-200 p-5 mb-6">

          <h2 className="text-lg font-bold mb-4">
            Add Inventory Transaction
          </h2>

          <div className="grid grid-cols-4 gap-4">

            <select
              value={selectedProduct}
              onChange={(e)=>
                setSelectedProduct(
                  e.target.value
                )
              }
              className="border p-3"
            >

              <option value="">
                Select Product
              </option>

              {products.map(product => (

                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name}
                </option>

              ))}

            </select>
            <select
              value={transactionType}
              onChange={(e)=>
                setTransactionType(
                  e.target.value
                )
              }
              className="border p-3"
            >
              <option value="STOCK_IN">
                Stock In
              </option>

              <option value="STOCK_OUT">
                Stock Out
              </option>
            </select>

            <input
              type="number"
                value={quantity}
                onChange={(e)=>
                  setQuantity(
                    e.target.value
                  )
                }

              placeholder="Quantity"
              className="border p-3"
            />

            <input
              type="text"
                value={remarks}
                onChange={(e)=>
                  setRemarks(
                    e.target.value
                  )
                }
              placeholder="Remarks"
              className="border p-3"
            />

            <button
              onClick={
                handleInventoryUpdate
              }
              className="
                bg-black
                text-white
                px-4
                py-3
              "
            >
              {
                transactionType ===
                "STOCK_IN"
                  ? "Add Stock"
                  : "Remove Stock"
              }
            </button>

          </div>

        </div>

        {/* Table Container */}
        <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-950 text-white border-b border-neutral-950">
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase">ID</th>
                  <th className="px-6 py-4">
                    Product
                  </th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase">Type</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-right">Quantity</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase">Remarks</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider uppercase text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-neutral-400 animate-pulse uppercase tracking-widest font-medium">
                      Retrieving Ledger Data...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-neutral-500">
                      No historical transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-neutral-50/70 transition-colors group">
                      {/* ID Row */}
                      <td className="px-6 py-4 text-sm font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors">
                        #{tx.id}
                      </td>
                      <td className="px-6 py-4">

                        {tx.product?.name || "N/A"}

                      </td>

                      {/* Dynamic B&W Badge for Transaction Type */}
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wide border ${
                          tx.type?.toLowerCase() === 'in' || tx.type?.toLowerCase() === 'addition'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-900 border-neutral-300'
                        }`}>
                          {tx.type}
                        </span>
                      </td>

                      {/* Quantity Row with aligned numerals */}
                      <td className="px-6 py-4 text-sm font-bold text-right tabular-nums text-neutral-900">
                        {tx.quantity}
                      </td>

                      {/* Remarks */}
                      <td className="px-6 py-4 text-sm text-neutral-600 max-w-xs truncate">
                        {tx.remarks || <span className="text-neutral-300">—</span>}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-neutral-500 text-right tabular-nums">
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}