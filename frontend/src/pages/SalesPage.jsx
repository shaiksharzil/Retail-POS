import { useEffect, useState } from "react";

export default function SalesPage() {
    const API_URL = import.meta.env.VITE_API_URL;

  const [sales, setSales] =
    useState([]);

  const [searchId, setSearchId] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [selectedSale,
          setSelectedSale] =
    useState(null);

  useEffect(() => {

    async function load() {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `${API_URL}/api/sales`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      setSales(data);
    }

    load();

  }, []);

const filteredSales =
  sales.filter(sale => {

    const idMatch =
      searchId === ""
      ||
      sale.id
          .toString()
          .includes(searchId);

    const saleDate =
      new Date(
        sale.createdAt
      );

    const fromMatch =
      !fromDate
      ||
      saleDate >=
      new Date(fromDate);

    const toMatch =
      !toDate
      ||
      saleDate <=
      new Date(toDate);

    return (
      idMatch &&
      fromMatch &&
      toMatch
    );
  });

  return (
    <div className="min-h-screen bg-neutral-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">

          <h1
            className="
            text-4xl
            font-black
            tracking-tight"
          >
            Sales History
          </h1>

          <p
            className="
            text-neutral-500
            mt-1"
          >
            View completed sales
          </p>

        </div>

        {/* FILTERS */}

        <div
          className="
          bg-white
          border
          border-neutral-200
          p-5
          mb-6
          rounded-xl
          flex
          gap-4
          flex-wrap
          "
        >

          <input
            type="text"
            placeholder="Search Sale ID"
            value={searchId}
            onChange={(e)=>
              setSearchId(
                e.target.value
              )
            }
            className="
            border
            px-4
            py-3
            rounded-lg
            "
          />

          <input
            type="date"
            value={fromDate}
            onChange={(e)=>
              setFromDate(
                e.target.value
              )
            }
            className="
            border
            px-4
            py-3
            rounded-lg
            "
          />

          <input
            type="date"
            value={toDate}
            onChange={(e)=>
              setToDate(
                e.target.value
              )
            }
            className="
            border
            px-4
            py-3
            rounded-lg
            "
          />

        </div>

        {/* SALES TABLE */}

        <div
          className="
          bg-white
          border
          border-neutral-200
          rounded-xl
          overflow-hidden
          "
        >

          <table className="w-full">

            <thead>

              <tr
                className="
                bg-black
                text-white"
              >

                <th className="p-4 text-left">
                  Sale ID
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSales.map(
                sale => (

                <tr
                  key={sale.id}
                  className="
                  border-b
                  hover:bg-neutral-50"
                >

                  <td className="p-4">
                    #{sale.id}
                  </td>

                  <td className="p-4 font-bold">
                    ₹
                    {
                      sale.totalAmount
                    }
                  </td>

                  <td className="p-4">

                    {
                      new Date(
                        sale.createdAt
                      )
                      .toLocaleDateString()
                    }

                  </td>

                  <td
                    className="
                    p-4
                    text-center"
                  >

                    <button
                      onClick={() =>
                        setSelectedSale(
                          sale
                        )
                      }
                      className="
                      bg-black
                      text-white
                      px-4
                      py-2
                      rounded-lg"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {
        selectedSale && (

        <div
          className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          "
        >

          <div
            className="
            bg-white
            w-[500px]
            rounded-xl
            p-6
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              mb-4"
            >
              Sale #
              {selectedSale.id}
            </h2>

            <div className="space-y-2">

              {
                selectedSale.items?.map(
                  item => (

                  <div
                    key={item.id}
                    className="
                    flex
                    justify-between"
                  >

                    <span>

                      {
                        item.product
                        ?.name
                      }

                      {" "}x

                      {
                        item.quantity
                      }

                    </span>

                    <span>

                      ₹

                      {
                        item.quantity *
                        item.unitPrice
                      }

                    </span>

                  </div>

                ))
              }

            </div>

            <hr className="my-4" />

            <div
              className="
              flex
              justify-between
              font-bold
              text-lg"
            >

              <span>Total</span>

              <span>
                ₹
                {
                  selectedSale
                  .totalAmount
                }
              </span>

            </div>

            <button
              onClick={() =>
                setSelectedSale(
                  null
                )
              }
              className="
              mt-6
              w-full
              border
              py-3
              rounded-lg"
            >
              Close
            </button>

          </div>

        </div>

        )}

      </div>
      </div>
  );
}