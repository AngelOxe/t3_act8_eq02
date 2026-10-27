export const LIMIT_OPTIONS = [10, 20, 40, 50];

export default function Pagination({ page, limit, total, onPageChange, onLimitChange }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <label className="text-sm text-slate-600">
        Registros por página:{" "}
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="rounded border border-slate-300 px-2 py-1"
        >
          {LIMIT_OPTIONS.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>

      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded border border-slate-300 px-3 py-1 disabled:opacity-40"
        >
          Anterior
        </button>
        <span>Página {page} de {totalPages} ({total} productos)</span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded border border-slate-300 px-3 py-1 disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}