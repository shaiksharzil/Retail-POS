const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard/stats`;

export async function getDashboardStats() {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    API_URL,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.json();
}