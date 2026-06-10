const API_URL =`${import.meta.env.VITE_API_URL}/api/inventory`;

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  };
}

export async function stockIn(data) {
  return fetch(
    `${API_URL}/stock-in`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data)
    }
  );
}

export async function stockOut(data) {
  return fetch(
    `${API_URL}/stock-out`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data)
    }
  );
}

export async function getTransactions() {

  const response =
    await fetch(
      `${API_URL}/transactions`,
      {
        headers: headers()
      }
    );

  return response.json();
}