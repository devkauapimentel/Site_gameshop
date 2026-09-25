import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatBRL } from '../data/catalog'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { createCheckout } from '../services/checkout'

const PAYMENTS = [
  { id: 'pix', label: 'Pix (5% OFF)', icon: '⚡' },
  { id: 'card', label: 'Cartão até 12x', icon: '💳' },
  { id: 'boleto', label: 'Boleto', icon: '🧾' },
]

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const { notify } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', paymentMethod: 'pix' })
  const [loading, setLoading] = useState(false)

  const discount = form.paymentMethod === 'pix' ? subtotal * 0.05 : 0
  const shipping = subtotal >= 199 ? 0 : 24.9
  const total = subtotal - discount + shipping

  if (items.length === 0 && !loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl text-white">Seu carrinho está vazio</h1>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-neon-600 px-8 py-3 font-display text-sm text-white">
          VOLTAR À LOJA
        </Link>
      </div>
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await createCheckout({ customer: form, items })
      clear()
      sessionStorage.setItem('gameshop:lastOrder', JSON.stringify(result))
      notify('Pedido processado com sucesso! 🏆')
      navigate('/pedido-confirmado', { state: result })
    } catch (err) {
      console.error(err)
      notify('Erro ao processar o pedido. Tente novamente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-brand-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-neon-500'

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-2xl text-white">💳 Finalizar Compra</h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-brand-800 p-6">
            <h2 className="mb-4 font-display text-sm text-neon-400">SEUS DADOS</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Nome completo" className={inputCls} />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="E-mail" className={inputCls} />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Telefone / WhatsApp" className={inputCls} />
              <input name="address" value={form.address} onChange={handleChange} required placeholder="Endereço de entrega (cep, rua, nº)" className={inputCls} />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-brand-800 p-6">
            <h2 className="mb-4 font-display text-sm text-neon-400">FORMA DE PAGAMENTO</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={`cursor-pointer rounded-xl border p-4 text-center text-sm transition ${
                    form.paymentMethod === p.id
                      ? 'border-neon-500 bg-neon-600/15 text-white shadow-lg shadow-neon-600/20'
                      : 'border-white/10 bg-brand-700 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={p.id}
                    checked={form.paymentMethod === p.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="block text-2xl">{p.icon}</span>
                  <span className="mt-1 block font-medium">{p.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-dashed border-white/15 p-6 text-xs text-gray-500">
            🔒 Suas informações são processadas pelo backend Java (Spring Boot) e armazenadas com segurança no Supabase. Nenhum dado de cartão trafega neste site.
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-neon-500/20 bg-brand-800 p-6">
          <h2 className="font-display text-lg text-white">RESUMO</h2>
          <ul className="my-4 max-h-56 space-y-3 overflow-auto text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3 text-gray-300">
                <span className="line-clamp-1">{i.qty}x {i.name}</span>
                <span className="shrink-0">{formatBRL(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-gray-300"><dt>Subtotal</dt><dd>{formatBRL(subtotal)}</dd></div>
            {discount > 0 && (
              <div className="flex justify-between text-green-neon"><dt>Desconto Pix (-5%)</dt><dd>-{formatBRL(discount)}</dd></div>
            )}
            <div className="flex justify-between text-gray-300"><dt>Frete</dt><dd>{shipping === 0 ? 'GRÁTIS' : formatBRL(shipping)}</dd></div>
            <div className="flex justify-between border-t border-white/10 pt-3">
              <dt className="font-display text-white">TOTAL</dt>
              <dd className="font-display text-xl text-neon-400">{formatBRL(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-neon-600 py-4 font-display text-sm text-white shadow-lg shadow-neon-600/30 transition hover:bg-neon-500 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? 'PROCESSANDO... ⏳' : 'CONFIRMAR PEDIDO 🚀'}
          </button>
        </aside>
      </form>
    </div>
  )
}
