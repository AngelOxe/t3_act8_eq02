export default function ProductTable({ products }) {
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
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-slate-100">
              <td className="px-4 py-2">
                <img src={p.thumbnail} alt={p.title} className="h-12 w-12 rounded object-cover" />
              </td>
              <td className="px-4 py-2 font-medium">{p.title}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2">{p.stock}</td>
              <td className="px-4 py-2">{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}