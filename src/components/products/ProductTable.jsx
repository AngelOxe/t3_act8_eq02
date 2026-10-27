export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <p className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-500">
        No se encontraron productos.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="px-4 py-3">Imagen</th>
            <th className="px-4 py-3">Producto</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Rating</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-slate-100">
              <td className="px-4 py-2">
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100 text-xs text-slate-400">
                    Sin foto
                  </div>
                )}
              </td>
              <td className="px-4 py-2 font-medium">{p.title}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2">{p.stock}</td>
              <td className="px-4 py-2">{p.rating}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="rounded border border-sky-600 px-3 py-1 text-xs text-sky-700 hover:bg-sky-50"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="rounded border border-red-600 px-3 py-1 text-xs text-red-700 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}