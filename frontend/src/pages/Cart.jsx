import { Link, useNavigate } from 'react-router-dom'
import { formatBRL } from '../data/catalog'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, subtotal, setQty, removeItem, count } = useCart()
  const navigate = useNavigate()

  const shipping = subtotal >= 199 || subtotal === 0 ? 0 : 24.9
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="text-7xl">🛒</p>
        <h1 className="mt-6 font-display text-2xl text-white">Seu carrinho está vazio</h1>
        <p className="mt-2 text-gray-400">Adicione alguns jogos para começar a diversão!</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-neon-600 px-8 py-3 font-display text-sm text-white shadow-lg shadow-neon-600/30 transition hover:bg-neon-500"
        >
          EXPLORAR A LOJA →
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-2xl text-white">
        🛒 Carrinho <span className="text-sm text-gray-400">({count} {count === 1 ? 'item' : 'itens'})</span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 rounded-2xl border border-white/10 bg-brand-800 p-4">
              <img src={item.cover} alt={item.name} className="h-24 w-32 shrink-0 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <Link to={`/produto/${item.id}`} className="font-medium text-white hover:text-neon-400">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-gray-500 transition hover:text-red-400"
                    title="Remover"
                  >
                    ✕ remover
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-400">{formatBRL(item.price)} / un.</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-white/10">
                    <button onClick={() => setQty(item.id, item.qty - 1)} className="px-3 py-1.5 text-gray-300 hover:text-neon-400">−</button>
                    <span className="w-8 text-center text-sm font-bold text-white">{item.qty}</span>
                    <button onClick={() => setQty(item.id, item.qty + 1)} className="px-3 py-1.5 text-gray-300 hover:text-neon-400">+</button>
                  </div>
                  <p className="font-display text-neon-400">{formatBRL(item.price * item.qty)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-neon-500/20 bg-brand-800 p-6">
          <h2 className="font-display text-lg text-white">RESUMO DO PEDIDO</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-gray-300">
              <dt>Subtotal</dt>
              <dd>{formatBRL(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-gray-300">
              <dt>Frete</dt>
              <dd className={shipping === 0 ? 'text-green-neon' : ''}>
                {shipping === 0 ? 'GRÁTIS 🎉' : formatBRL(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3">
              <dt className="font-display text-white">TOTAL</dt>
              <dd className="font-display text-xl text-neon-400">{formatBRL(total)}</dd>
            </div>
          </dl>
          {subtotal < 199 && (
            <p className="mt-3 rounded-lg bg-brand-700 p-3 text-xs text-gray-300">
              Faltam {formatBRL(199 - subtotal)} para frete grátis! 🚚
            </p>
          )}
          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 w-full rounded-xl bg-neon-600 py-3.5 font-display text-sm text-white shadow-lg shadow-neon-600/30 transition hover:bg-neon-500 active:scale-[0.98]"
          >
            FINALIZAR COMPRA →
          </button>
          <Link to="/" className="mt-3 block text-center text-xs text-gray-400 hover:text-neon-400">
            ← continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  )
}
