import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AccountPage() {
    const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    companyName: "",
    businessType: "",
    gstNumber: "",

    phone: "",
    email: "",
    website: "",

    addressLine1: "",
    addressLine2: "",

    city: "",
    state: "",
    pincode: "",
    country: "India",

    footerMessage: "",
    termsAndConditions: ""
  });

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }
async function loadAccount() {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      `${API_URL}/api/account`,
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
    

  if (data) {
    setForm(data);
  }

}

useEffect(() => {

  loadAccount();

}, []);

  async function saveAccount() {

    try {

      const token =
        localStorage.getItem("token");


      const response =
        await fetch(
          `${API_URL}/api/account`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`
            },
            body:
              JSON.stringify(form)
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Account details saved");


    } catch {

      toast.error("Failed to save account");

    }

  }

  return (

    <div className="
      min-h-screen
      bg-neutral-100
      p-8
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* Header */}

        <div className="mb-8">

          <h1 className="
            text-4xl
            font-black
            tracking-tight
          ">
            Business Account
          </h1>

          <p className="
            text-neutral-500
            mt-2
          ">
            Manage company details used on bills and receipts
          </p>

        </div>

        <div className="
          bg-white
          border
          rounded-2xl
          p-8
          shadow-sm
        ">

          {/* Business Information */}

          <div className="mb-10">

            <h2 className="
              text-xl
              font-bold
              mb-5
            ">
              Business Information
            </h2>

            <div className="
              grid
              md:grid-cols-2
              gap-5
            ">

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="ABC Retail Store"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Business Type
                </label>

                <input
                  type="text"
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  placeholder="Retail Store"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  GST Number
                </label>

                <input
                  type="text"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                  placeholder="37ABCDE1234F1Z5"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

            </div>

          </div>

          {/* Contact Information */}

          <div className="mb-10">

            <h2 className="
              text-xl
              font-bold
              mb-5
            ">
              Contact Information
            </h2>

            <div className="
              grid
              md:grid-cols-3
              gap-5
            ">

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="info@company.com"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Website
                </label>

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="www.company.com"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

            </div>

          </div>

          {/* Address */}

          <div className="mb-10">

            <h2 className="
              text-xl
              font-bold
              mb-5
            ">
              Business Address
            </h2>

            <div className="
              grid
              md:grid-cols-2
              gap-5
            ">

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Address Line 1
                </label>

                <input
                  type="text"
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  placeholder="Door No, Street"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Address Line 2
                </label>

                <input
                  type="text"
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  placeholder="Area / Landmark"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

            </div>

          </div>

          {/* Receipt Settings */}

          <div className="mb-10">

            <h2 className="
              text-xl
              font-bold
              mb-5
            ">
              Receipt Settings
            </h2>

            <div className="space-y-5">

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Footer Message
                </label>

                <textarea
                  rows={4}
                  name="footerMessage"
                  value={form.footerMessage}
                  onChange={handleChange}
                  placeholder="Thank you for shopping with us."
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

              <div>
                <label className="
                  text-sm
                  font-medium
                ">
                  Terms & Conditions
                </label>

                <textarea
                  rows={5}
                  name="termsAndConditions"
                  value={form.termsAndConditions}
                  onChange={handleChange}
                  placeholder="Goods once sold will not be taken back."
                  className="
                    w-full
                    mt-1
                    border
                    rounded-lg
                    p-3
                  "
                />
              </div>

            </div>

          </div>

          <button
            onClick={saveAccount}
            className="
              bg-black
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              hover:opacity-90
            "
          >
            Save Account
          </button>

        </div>

      </div>

    </div>

  );

}