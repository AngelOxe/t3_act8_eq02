import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
} from "../services/productService";
import ProductFilters from "../components/products/ProductFilters";
import ProductTable from "../components/products/ProductTable";
import Pagination, { LIMIT_OPTIONS } from "../components/products/Pagination";
import ProductFormModal from "../components/products/ProductFormModal";
import ConfirmModal from "../components/products/ConfirmModal";

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

  // Estado del CRUD
  const [localCreated, setLocalCreated] = useState([]);
  const [localEdits, setLocalEdits] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [pendingEdit, setPendingEdit] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [message, setMessage] = useState("");

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

  // El mensaje de éxito desaparece solo a los 3 segundos
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(id);
  }, [message]);

  // POST real y después se refleja en el estado local
  const handleCreateProduct = async (formData) => {
    setSaving(true);
    setActionError("");
    try {
      const response = await createProduct(formData);
      const newProduct = {
        ...formData,
        ...response,
        id: Date.now(), // DummyJSON devuelve siempre el mismo id
        thumbnail: "",
        rating: 0,
        isLocal: true,
      };
      setLocalCreated((prev) => [newProduct, ...prev]);
      setShowForm(false);
      setMessage("Producto agregado correctamente");
    } catch (err) {
      setActionError(err.message || "No se pudo agregar el producto");
    } finally {
      setSaving(false);
    }
  };

  // PUT real y después se refleja en el estado local
  const handleConfirmEdit = async () => {
    setSaving(true);
    setActionError("");
    try {
      try {
        await updateProduct(editingProduct.id, pendingEdit);
      } catch (err) {
        // Un producto agregado por ti no existe en DummyJSON (404): se ignora
        if (!(editingProduct.isLocal && err.status === 404)) throw err;
      }

      if (editingProduct.isLocal) {
        setLocalCreated((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id ? { ...p, ...pendingEdit } : p
          )
        );
      } else {
        setLocalEdits((prev) => ({ ...prev, [editingProduct.id]: pendingEdit }));
      }

      setPendingEdit(null);
      setEditingProduct(null);
      setMessage("Producto actualizado correctamente");
    } catch (err) {
      setPendingEdit(null);
      setActionError(err.message || "No se pudo actualizar el producto");
    } finally {
      setSaving(false);
    }
  };

  // Los productos agregados se muestran arriba de la página 1,
  // respetando el filtro de texto y de categoría activos
  const matchingCreated = localCreated.filter(
    (p) =>
      (!category || p.category === category) &&
      p.title.toLowerCase().includes(search.trim().toLowerCase())
  );
  const visibleCreated = page === 1 ? matchingCreated : [];
  const rows = [...visibleCreated, ...products].map((p) =>
    localEdits[p.id] ? { ...p, ...localEdits[p.id] } : p
  );

  return (
    <section className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Productos</h1>
        <button
          onClick={() => {
            setActionError("");
            setShowForm(true);
          }}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700"
        >
          + Agregar producto
        </button>
      </div>

      {message && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>
      )}

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

      {!loading && !error && (
        <ProductTable
          products={rows}
          onEdit={(p) => {
            setActionError("");
            setEditingProduct(p);
          }}
        />
      )}

      <Pagination
        page={page}
        limit={limit}
        total={total + matchingCreated.length}
        onPageChange={(p) => updateParams({ page: p })}
        onLimitChange={(l) => updateParams({ limit: l })}
      />

      {/* Modal: agregar */}
      <ProductFormModal
        open={showForm}
        title="Agregar producto"
        categories={categories}
        submitText="Agregar"
        loading={saving}
        error={actionError}
        onSubmit={handleCreateProduct}
        onCancel={() => setShowForm(false)}
      />

      {/* Modal: editar */}
      <ProductFormModal
        open={editingProduct !== null}
        title="Editar producto"
        initialValues={editingProduct || undefined}
        categories={categories}
        submitText="Guardar cambios"
        loading={saving}
        error={actionError}
        onSubmit={(data) => setPendingEdit(data)}
        onCancel={() => setEditingProduct(null)}
      />

      {/* Confirmación antes de editar */}
      <ConfirmModal
        open={pendingEdit !== null}
        title="Confirmar edición"
        message={`¿Seguro que quieres guardar los cambios de "${editingProduct?.title ?? ""}"?`}
        confirmText="Sí, guardar"
        loading={saving}
        onConfirm={handleConfirmEdit}
        onCancel={() => setPendingEdit(null)}
      />
    </section>
  );
}