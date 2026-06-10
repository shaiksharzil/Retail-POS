const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function getProducts() {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(product),
  });

  return response.json();
}

export async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
}