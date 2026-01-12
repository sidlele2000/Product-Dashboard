const BASE_URL =import.meta.env.VITE_API_BASE_URL;
export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("failed to fetch products");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API fetch error", err);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API fetch categories error", err);
    return [];
  }
}


