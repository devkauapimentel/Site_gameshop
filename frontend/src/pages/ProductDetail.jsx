import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PRODUCTS, CATEGORIES, formatBRL } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { notify } = useToast()
  const [qty, setQty] = useState(1)

  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="text-6xl">👾</p>
        <h1 className="mt-4 font-display text-2xl text-white">Produto não encontrado</h1>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-neon-600 px-6 py-3 font-display text-sm text-white">
          ← VOLTAR À LOJA
        </Link>
      </div>
    )
  }

  const categoryName = CATEGORIES.find((c) => c.id === product.category)?.name ?? product.category
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-gray-500">
        <Link to="/" className="hover:text-neon-400">Loja</Link> /{' '}
        <Link to={`/?cat=${product.category}`} className="hover:text-neon-400">{categoryName}</Link> /{' '}
        <span className="text-gray-300">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <img src={product.cover} alt={product.name} className="aspect-[4/3] w-full object-cover" />
        </div>

        <div>
          {product.badge && (
            <span className="rounded-md bg-neon-600 px-3 py-1 text-[11px] font-bold tracking-wider text-white">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 font-display text-3xl text-white">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-400">⭐ {product.rating} · Plataforma: {categoryName} · Estoque: {product.stock} un.</p>
          <p className="mt-5 leading-relaxed text-gray-300">{product.description}</p>

          <div className="mt-8 rounded-2xl border border-neon-500/20 bg-brand-800 p-6">
            {product.oldPrice && (
              <p className="text-sm text-gray-500 line-through">{formatBRL(product.oldPrice)}</p>
            )}
            <p className="font-display text-4xl text-neon-400">{formatBRL(product.price)}</p>
            <p className="mt-1 text-sm text-gray-400">
              até 12x de {formatBRL(product.price / 12)} sem juros · 💳 Pix com 5% OFF
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-white/10">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg text-gray-300 hover:text-neon-400">−</button>
                <span className="w-10 text-center font-bold text-white">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="px-4 py-3 text-lg text-gray-300 hover:text-neon-400">+</button>
              </div>
              <button
                onClick={() => {
                  addItem(product, qty)
                  notify(`${qty}x "${product.name}" no carrinho! 🎮`)
                }}
                className="flex-1 rounded-xl bg-neon-600 py-3.5 font-display text-sm text-white shadow-lg shadow-neon-600/30 transition hover:bg-neon-500 active:scale-[0.98]"
              >
                + ADICIONAR AO CARRINHO
              </button>
            </div>
            <button
              onClick={() => {
                addItem(product, qty)
                navigate('/checkout')
              }}
              className="mt-3 w-full rounded-xl border border-neon-500/50 py-3.5 font-display text-sm text-neon-400 transition hover:bg-neon-600/10"
            >
              ⚡ COMPRAR AGORA
            </button>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-xs text-gray-400">
            <li>🚚 Frete grátis acima de R$ 199</li>
            <li>🔁 Troca em até 7 dias</li>
            <li>🔒 Compra 100% segura</li>
            <li>🏆 Loja oficial verificada</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-xl text-white">
            QUEM VIU ESSE JOGO, TAMBÉM GOSTOU DE...
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
