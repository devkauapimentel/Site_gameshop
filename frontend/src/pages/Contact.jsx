import { useState } from 'react'
import { sendContactMessage } from '../services/checkout'
import { useToast } from '../context/ToastContext'

export default function Contact() {
  const { notify } = useToast()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-brand-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-neon-500'

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      await sendContactMessage(form)
      notify('Mensagem enviada! Retornaremos em breve 🎮')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      notify('Não foi possível enviar. Tente novamente.', 'error')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-white">
        Conta<span className="text-neon-400">to</span>
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-brand-800 p-6 lg:col-span-2">
          <h2 className="mb-5 font-display text-sm text-neon-400">FALE CONOSCO</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Seu nome" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
            <input required type="email" placeholder="Seu e-mail" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
            <input type="tel" placeholder="Seu telefone (opcional)" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${inputCls} sm:col-span-2`} />
            <textarea required rows={5} placeholder="Sua mensagem" name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none sm:col-span-2`} />
            <button
              type="submit"
              disabled={sending}
              className="rounded-xl bg-neon-600 px-8 py-3.5 font-display text-sm text-white shadow-lg shadow-neon-600/30 transition hover:bg-neon-500 disabled:opacity-60 sm:col-span-2 sm:w-fit"
            >
              {sending ? 'ENVIANDO...' : 'ENVIAR MENSAGEM 🚀'}
            </button>
          </form>
        </section>

        <div className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-brand-800 p-6">
            <h2 className="mb-4 font-display text-sm text-neon-400">NOS ACOMPANHE</h2>
            <ul className="flex gap-4">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram"><img src="/images/instagram.png" alt="Instagram" className="h-8" /></a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook"><img src="/images/facebook.png" alt="Facebook" className="h-8" /></a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube"><img src="/images/youtube.png" alt="YouTube" className="h-8" /></a></li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-brand-800 p-6 text-sm text-gray-300">
            <h2 className="mb-4 font-display text-sm text-neon-400">VENHA ATÉ NÓS</h2>
            <p>📍 Rua Javascript nº 124<br />Vila HTML — Rio de Janeiro/RJ</p>
            <p className="mt-3">🕘 Seg a Sáb · 9h às 21h</p>
            <p className="mt-3">📞 (21) 4002-8922</p>
          </section>
        </div>
      </div>
    </div>
  )
}
