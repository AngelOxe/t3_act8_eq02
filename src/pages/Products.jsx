import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getCategories } from "../services/productService";
import ProductFilters from "../components/products/ProductFilters";
import ProductTable from "../components/products/ProductTable";
import Pagination, { LIMIT_OPTIONS } from "../components/products/Pagination";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const rawLimit = parseInt(searchParams.get("limit"), 10);
  const limit = LIMIT_OPTIONS.includes(rawLimit) ? rawLimit : 10;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Actualiza la URL; al cambiar filtros o límite vuelve a la página 1
  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) next.delete(key);
      else next.set(key, String(value));
    });
    if (!("page" in changes)) next.set("page", "1");
    if (!next.get("limit")) next.set("limit", String(limit));
    setSearchParams(next);
  };

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    getProducts({ page, limit, search, category }, controller.signal)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Ocurrió un error al cargar los productos");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page, limit, search, category]);

  return (
    <section className="space-y-4 p-6">
      <h1 className="text-2xl font-bold text-slate-800">Productos</h1>

      <ProductFilters
        search={search}
        category={category}
        categories={categories}
        onChange={updateParams}
      />

      {loading && <p className="text-slate-500">Cargando productos...</p>}

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
      )}

      {!loading && !error && <ProductTable products={products} />}

      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={(p) => updateParams({ page: p })}
        onLimitChange={(l) => updateParams({ limit: l })}
      />
    </section>
  );
}