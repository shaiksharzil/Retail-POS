const API_URL = `${import.meta.env.VITE_API_URL}/api/sales`;

export async function checkout(items) {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`
      },
      body: JSON.stringify({
        items
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      "Checkout failed"
    );
  }

  return response.json();
}