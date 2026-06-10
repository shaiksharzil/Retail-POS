const API_URL =
  "http://localhost:8080/api/dashboard/stats";

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