import { useEffect, useState }
from "react";
import { checkout }
from "../api/salesApi";

import {
  getProducts
} from "../api/productApi";
import { useNavigate }
from "react-router-dom";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function BillingPage() {
    const receiptRef = useRef();
    const navigate =
      useNavigate();

  const [products,
          setProducts]
    = useState([]);
  const [cart,
          setCart]
    = useState([]);
    const [account, setAccount] =
      useState(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {

      async function loadAccount() {

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            "http://localhost:8080/api/account",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        if (!response.ok) {
          return;
        }

        const data =
          await response.json();

        setAccount(data);

      }

    async function load() {

      const data =
        await getProducts();

      setProducts(data);
    }

    load();

  }, []);
const categories = [
  "All",
  ...new Set(
    products.map(
      p => p.category || "Other"
    )
  )
];
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

async function loadAccount() {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        "http://localhost:8080/api/account",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    if (!response.ok) {
      return;
    }

    const data =
      await response.json();

    setAccount(data);
  }

useEffect(() => {

  async function load() {

    const data =
      await getProducts();

    setProducts(data);

  }

  load();
  loadAccount();

}, []);
const handlePrintReceipt =
  useReactToPrint({
    contentRef: receiptRef,
    documentTitle: "Receipt"
  });
function increaseQty(id) {

  const available =
    getAvailableStock(id);

  if(available <= 0) {

    toast.warning(
      "Maximum stock reached"
    );

    return;
  }

  setCart(
    cart.map(item =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity + 1
          }
        : item
    )
  );
}
function decreaseQty(id) {

  setCart(
    cart
      .map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity - 1
            }
          : item
      )
      .filter(item =>
        item.quantity > 0
      )
  );
}

async function handleCheckout() {

  if(cart.length === 0) {
    toast.error("Cart is empty");
    return;
  }

  try {

    const payload =
      cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

    await checkout(payload);

    toast.success(
      "Sale completed successfully"
    );

    setCart([]);

    const products =
      await getProducts();

    setProducts(products);

  } catch(error) {

    toast.error(
      error.message
    );

  }
}
async function handlePrintSale() {

  if(cart.length === 0) {

    toast.error(
      "Cart is empty"
    );

    return;
  }

  try {

    const payload =
      cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

    await checkout(payload);

    handlePrintReceipt();

    setCart([]);

    const data =
      await getProducts();

    setProducts(data);

    toast.success(
      "Bill printed"
    );

  } catch(error) {

    toast.error(
      error.message
    );
  }
}
  function addToCart(product) {

    const available =
      getAvailableStock(
        product.id
      );

    if(available <= 0) {

      toast.error(
        `${product.name} is out of stock`
      );

      return;
    }

    const existing =
      cart.find(
        item =>
          item.id === product.id
      );

    if(existing) {

      setCart(
        cart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        )
      );

      return;
    }

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ]);
  }

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );
function getAvailableStock(productId) {

  const product =
    products.find(
      p => p.id === productId
    );

  const cartItem =
    cart.find(
      c => c.id === productId
    );

  const cartQty =
    cartItem
      ? cartItem.quantity
      : 0;

  return (
    product.stockQuantity -
    cartQty
  );
}
  return (
    <div className="h-screen flex bg-zinc-100">

      {/* LEFT SIDE */}

      <div className="w-2/3 p-6 overflow-y-auto">

        <h1 className="text-3xl font-bold mb-6">
          Billing
        </h1>

        {/* Search */}

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

        {/* Categories */}

        <div className="flex gap-2 mb-6 flex-wrap">

          {categories.map(category => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                px-4
                py-2
                rounded-full
                border
                transition
                ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-white"
                }
              `}
            >
              {category}
            </button>

          ))}

        </div>

        {/* Products */}

        <div className="grid grid-cols-3 gap-4">

          {filteredProducts.map(product => (

            <div
              key={product.id}
              onClick={() => {

                if(getAvailableStock(
                     product.id
                   ) <= 0) {

                  toast.error(
                    `${product.name} is out of stock`
                  );

                  return;
                }

                addToCart(product);
              }}
              className={`
                bg-white
                border
                rounded-xl
                p-4
                transition
                ${
                  getAvailableStock(
                    product.id
                  ) <= 0
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer hover:border-black"
                }
              `}

            >

              <h3 className="font-semibold">
                {product.name}
              </h3>

              <p className="text-zinc-500 mt-2">
                ₹{product.price}
              </p>

              <p className="text-sm text-zinc-400">
                Stock:
                {getAvailableStock(product.id)}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div
        className="
          w-1/3
          bg-white
          border-l
          flex
          flex-col
        "
      >

        <div className="p-5 border-b">

          <h2 className="text-2xl font-bold">
            Cart
          </h2>

        </div>

        <div className="flex-1 overflow-y-auto p-4">

          {cart.length === 0 && (

            <p className="text-zinc-500">
              No items selected
            </p>

          )}

          {cart.map(item => (

            <div
              key={item.id}
              className="
                border-b
                py-4
              "
            >

              <div className="flex justify-between">

                <div>

                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-zinc-500">
                    ₹{item.price}
                  </p>

                </div>

                <div className="font-bold">
                  ₹
                  {item.price *
                    item.quantity}
                </div>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mt-3
                "
              >

                <button
                  onClick={() =>
                    decreaseQty(item.id)
                  }
                  className="
                    w-8
                    h-8
                    border
                    rounded
                  "
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQty(item.id)
                  }
                  className="
                    w-8
                    h-8
                    border
                    rounded
                  "
                >
                  +
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="border-t p-5">

          <div
            className="
              flex
              justify-between
              text-2xl
              font-bold
              mb-5
            "
          >

            <span>Total</span>

            <span>
              ₹{total}
            </span>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <button
              className="
                border
                border-black
                py-3
                rounded-lg
                font-medium
              "
               onClick={handlePrintSale}
            >
              Print
            </button>

            <button
              onClick={handleCheckout}
              className="
                bg-black
                text-white
                py-3
                rounded-lg
                font-medium
              "
            >
              Save Sale
            </button>

          </div>

        </div>

      </div>
<div
  style={{
    position: "absolute",
    left: "-9999px"
  }}
>
  <div
    ref={receiptRef}
    className="w-[300px] p-4 bg-white text-zinc-800 font-mono text-xs leading-tight"
  >
    {/* Header / Company Info */}
    <div className="text-center space-y-0.5">
      <h1 className="text-lg font-black uppercase tracking-wide">
        {account?.companyName}
      </h1>

      {account?.businessType && (
        <p className="text-zinc-500 font-medium tracking-wider text-[10px] uppercase">
          {account.businessType}
        </p>
      )}

      {account?.gstNumber && (
        <p className="font-semibold text-zinc-700 text-[11px]">
          GSTIN: {account.gstNumber}
        </p>
      )}

      {/* Compact Inline Address & Contact Info */}
      <div className="text-zinc-400 text-[11px] pt-1 flex flex-wrap justify-center items-center gap-x-1.5 gap-y-0.5 leading-normal">
        <span>{account?.addressLine1}</span>
        {account?.addressLine2 && (
          <>
            <span>•</span>
            <span>{account.addressLine2}</span>
          </>
        )}
        <span>•</span>
        <span>
          {account?.city}
          {account?.pincode ? `-${account.pincode}` : ''}
        </span>
        {account?.state && (
          <>
            <span>•</span>
            <span>{account.state}</span>
          </>
        )}
        {account?.phone && (
          <>
            <span>•</span>
            <span className="text-zinc-500 font-medium">Ph: {account.phone}</span>
          </>
        )}
        {account?.email && (
          <>
            <span>•</span>
            <span className="text-zinc-500 break-all">{account.email}</span>
          </>
        )}
      </div>
    </div>
    {/* Invoice Title */}
    <div className="border-t border-dashed border-zinc-300 my-3 pt-2 text-center">
      <p className="text-[10px] text-zinc-400 mt-0.5">
        {new Date().toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>
    </div>

    {/* Cart Items */}
    <div className="space-y-1.5 py-1">
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-start gap-4">
          <div className="flex flex-col flex-1">
            <span className="font-medium text-zinc-800 break-words">
              {item.name}
            </span>
            <span className="text-zinc-400 text-[11px]">
              {item.quantity} x ₹{item.price.toFixed(2)}
            </span>
          </div>
          <span className="font-semibold text-zinc-700 whitespace-nowrap pt-0.5">
            ₹{(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}
    </div>

    {/* Summary Section */}
    <div className="border-t border-dashed border-zinc-300 my-3 pt-2 space-y-1">
      <div className="flex justify-between text-zinc-500 text-[11px]">
        <span>Total Items</span>
        <span>
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm font-black text-zinc-900 pt-1">
        <span>GRAND TOTAL</span>
        <span className="text-base">₹{total.toFixed(2)}</span>
      </div>
    </div>

    {/* Footer Notes / Legal */}
    {(account?.footerMessage || account?.termsAndConditions) && (
      <div className="border-t border-dashed border-zinc-300 my-3 pt-2 space-y-2 text-zinc-500 text-[10px]">
        {account?.footerMessage && (
          <p className="text-center italic font-medium">
            {account.footerMessage}
          </p>
        )}

        {account?.termsAndConditions && (
          <div className="bg-zinc-50 p-1.5 rounded border border-zinc-100">
            <p className="font-bold uppercase text-[9px] text-zinc-600 mb-0.5">
              Terms & Conditions:
            </p>
            <p className="leading-normal text-zinc-400">
              {account.termsAndConditions}
            </p>
          </div>
        )}
      </div>
    )}

    {/* Closing Branding */}
    <div className="border-t border-dashed border-zinc-300 my-3 pt-3 text-center space-y-0.5">
      <p className="font-bold uppercase tracking-wider text-zinc-600">
        Thank You For Shopping
      </p>
      <p className="text-[9px] text-zinc-400 lowercase tracking-tight">
        Powered by retail pos
      </p>
    </div>
  </div>
</div></div>
  );
}