import { CATEGORIES } from '../data/catalog'

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition ${
          active === 'all'
            ? 'bg-neon-600 text-white shadow-lg shadow-neon-600/30'
            : 'border border-white/15 bg-brand-800 text-gray-300 hover:border-neon-500/50'
        }`}
      >
        🔥 TUDO
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition ${
            active === c.id
              ? 'bg-neon-600 text-white shadow-lg shadow-neon-600/30'
              : 'border border-white/15 bg-brand-800 text-gray-300 hover:border-neon-500/50'
          }`}
        >
          {c.icon} {c.name.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
