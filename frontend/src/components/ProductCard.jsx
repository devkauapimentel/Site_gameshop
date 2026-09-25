import { Link } from 'react-router-dom'
import { formatBRL } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const badgeColors = {
  'BEST SELLER': 'bg-amber-500/90 text-black',
  EXCLUSIVO: 'bg-blue-500/90 text-white',
  NOVIDADE: 'bg-emerald-500/90 text-black',
  OFERTA: 'bg-pink-neon/90 text-white',
  'TOP RATED': 'bg-purple-500/90 text-white',
  PREMIUM: 'bg-cyan-400/90 text-black',
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { notify } = useToast()
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-800 transition-all duration-300 hover:-translate-y-1 hover:border-neon-500/60 hover:shadow-xl hover:shadow-neon-600/20">
      <Link to={`/produto/${product.id}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={product.cover}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-bold tracking-wider ${
              badgeColors[product.badge] ?? 'bg-neon-600 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute right-3 top-3 rounded-md bg-green-neon px-2 py-1 text-[11px] font-black text-black">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
          <span>⭐ {product.rating}</span>
          <span>·</span>
          <span>{product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}</span>
        </div>
        <Link
          to={`/produto/${product.id}`}
          className="line-clamp-2 font-medium text-white transition-colors hover:text-neon-400"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-3">
          <div className="flex items-end justify-between">
            <div>
              {product.oldPrice && (
                <p className="text-xs text-gray-500 line-through">{formatBRL(product.oldPrice)}</p>
              )}
              <p className="font-display text-lg text-neon-400">{formatBRL(product.price)}</p>
              <p className="text-[11px] text-gray-500">
                ou 12x de {formatBRL(product.price / 12)} sem juros
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={product.stock === 0}
            onClick={() => {
              addItem(product, 1)
              notify(`"${product.name}" adicionado ao carrinho! 🎮`)
            }}
            className="mt-3 w-full rounded-xl bg-neon-600 py-2.5 font-display text-xs tracking-wide text-white shadow-lg shadow-neon-600/25 transition hover:bg-neon-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-700"
          >
            {product.stock === 0 ? 'INDISPONÍVEL' : '+ ADICIONAR'}
          </button>
        </div>
      </div>
    </article>
  )
}
