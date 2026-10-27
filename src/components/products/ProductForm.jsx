import { useState } from "react";

const EMPTY = { title: "", category: "", price: "", stock: "" };

export default function ProductForm({
  initialValues = EMPTY,
  categories = [],
  submitText = "Guardar",
  loading = false,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.title.trim()) newErrors.title = "El nombre es obligatorio";
    else if (values.title.trim().length < 3)
      newErrors.title = "Debe tener al menos 3 caracteres";

    if (!values.category) newErrors.category = "Elige una categoría";

    if (values.price === "") newErrors.price = "El precio es obligatorio";
    else if (Number(values.price) <= 0)
      newErrors.price = "El precio debe ser mayor a 0";

    if (values.stock === "") newErrors.stock = "El stock es obligatorio";
    else if (!Number.isInteger(Number(values.stock)) || Number(values.stock) < 0)
      newErrors.stock = "El stock debe ser un entero de 0 o más";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: values.title.trim(),
      category: values.category,
      price: Number(values.price),
      stock: Number(values.stock),
    });
  };

  const inputClass = (name) =>
    `w-full rounded-lg border px-3 py-2 text-sm ${
      errors[name] ? "border-red-500" : "border-slate-300"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nombre</label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className={inputClass("title")}
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Categoría</label>
        <select
          name="category"
          value={values.category}
          onChange={handleChange}
          className={inputClass("category")}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Precio</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={values.price}
            onChange={handleChange}
            className={inputClass("price")}
          />
          {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            value={values.stock}
            onChange={handleChange}
            className={inputClass("stock")}
          />
          {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : submitText}
        </button>
      </div>
    </form>
  );
}