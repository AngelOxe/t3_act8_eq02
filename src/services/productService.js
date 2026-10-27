const BASE_URL = "https://dummyjson.com/products";

async function request(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo obtener la información`);
  }
  return res.json();
}

export async function getCategories(signal) {
  const data = await request(`${BASE_URL}/category-list`, signal);
  return data; // arreglo de strings, ej. "beauty", "laptops"
}

export async function getProducts(
  { page = 1, limit = 10, search = "", category = "" } = {},
  signal
) {
  const skip = (page - 1) * limit;
  const text = search.trim();

  // Categoría + texto: se trae toda la categoría y se filtra aquí
  if (category && text) {
    const data = await request(`${BASE_URL}/category/${category}?limit=0`, signal);
    const filtered = data.products.filter((p) =>
      p.title.toLowerCase().includes(text.toLowerCase())
    );
    return {
      products: filtered.slice(skip, skip + limit),
      total: filtered.length,
    };
  }

  // Solo categoría
  if (category) {
    const data = await request(
      `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`,
      signal
    );
    return { products: data.products, total: data.total };
  }

  // Solo texto
  if (text) {
    const data = await request(
      `${BASE_URL}/search?q=${encodeURIComponent(text)}&limit=${limit}&skip=${skip}`,
      signal
    );
    return { products: data.products, total: data.total };
  }

  // Sin filtros
  const data = await request(`${BASE_URL}?limit=${limit}&skip=${skip}`, signal);
  return { products: data.products, total: data.total };
}