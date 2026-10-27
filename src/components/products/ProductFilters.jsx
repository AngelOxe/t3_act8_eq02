import { useEffect, useState } from "react";

export default function ProductFilters({ search, category, categories, onChange }) {
  const [text, setText] = useState(search);

  // Si la URL cambia (atrás/adelante), se actualiza el input
  useEffect(() => setText(search), [search]);

  // Espera 400 ms después de escribir antes de buscar
  useEffect(() => {
    if (text === search) return;
    const id = setTimeout(() => onChange({ search: text }), 400);
    return () => clearTimeout(id);
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Buscar producto..."
        className="w-full rounded-lg border border-slate-300 px-3 py-2 sm:max-w-xs"
      />
      <select
        value={category}
        onChange={(e) => onChange({ category: e.target.value })}
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}