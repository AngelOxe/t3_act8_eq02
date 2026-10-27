import ProductForm from "./ProductForm";

export default function ProductFormModal({
  open,
  title,
  initialValues,
  categories,
  submitText,
  loading,
  error,
  onSubmit,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-slate-800">{title}</h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
        )}

        <ProductForm
          initialValues={initialValues}
          categories={categories}
          submitText={submitText}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}