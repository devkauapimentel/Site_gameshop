import { Link, useLocation } from 'react-router-dom'
import { formatBRL } from '../data/catalog'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const order =
    state ?? JSON.parse(sessionStorage.getItem('gameshop:lastOrder') || 'null')

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl text-white">Nenhum pedido recente</h1>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-neon-600 px-8 py-3 font-display text-sm text-white">
          IR PARA A LOJA
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="animate-glow mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-neon/15 text-5xl">
        🏆
      </div>
      <h1 className="mt-8 font-display text-3xl text-white">PEDIDO CONFIRMADO!</h1>
      <p className="mt-3 text-gray-400">
        Obrigado por comprar na GamesShop. Enviamos os detalhes para o seu e-mail.
      </p>

      <div className="mt-8 rounded-2xl border border-neon-500/20 bg-brand-800 p-6 text-left">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-400">Número do pedido</dt>
            <dd className="font-mono font-bold text-neon-400">{order.orderId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">Status</dt>
            <dd className="uppercase text-green-neon">{order.status}</dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3">
            <dt className="font-display text-white">Total</dt>
            <dd className="font-display text-lg text-neon-400">{formatBRL(order.total)}</dd>
          </div>
        </dl>
      </div>

      <Link
        to="/"
        className="mt-10 inline-block rounded-xl bg-neon-600 px-10 py-4 font-display text-sm text-white shadow-lg shadow-neon-600/30 transition hover:bg-neon-500"
      >
        CONTINUAR COMPRANDO →
      </Link>
    </div>
  )
}
