// ============================================================
// Serviço de compras — integração com o BACKEND JAVA (Spring Boot)
// ------------------------------------------------------------
// O backend Java expõe REST em VITE_API_URL (padrão http://localhost:8080).
// Ele processa o pedido, grava no Supabase (service role) e devolve o
// comprovante. Se o backend estiver offline, tentamos gravar direto no
// Supabase (anon key); se nada estiver configurado, geramos um pedido
// local de demonstração para o front continuar funcional.
// ============================================================
import { supabase, isSupabaseConfigured } from './supabase'

const API_URL = import.meta.env.VITE_API_URL || '/api'

export async function createCheckout({ customer, items }) {
  const payload = {
    customer,
    items: items.map((i) => ({ productId: i.id, name: i.name, price: i.price, qty: i.qty })),
  }

  // 1ª opção: backend Java
  try {
    const res = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) return await res.json()
    throw new Error(`Backend respondeu ${res.status}`)
  } catch (backendError) {
    console.warn('Backend Java indisponível, tentando Supabase direto:', backendError.message)
  }

  // 2ª opção: Supabase direto (tabela orders)
  if (isSupabaseConfigured) {
    const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        items: payload.items,
        payment_method: customer.paymentMethod,
        total,
        status: 'pending',
      })
      .select()
      .single()
    if (error) throw error
    return { orderId: data.id, status: data.status ?? 'pending', total, source: 'supabase' }
  }

  // 3ª opção: modo demo (sem backend e sem Supabase)
  await new Promise((r) => setTimeout(r, 900))
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  return {
    orderId: `DEMO-${Date.now().toString(36).toUpperCase()}`,
    status: 'paid-demo',
    total,
    source: 'demo',
  }
}

export async function sendContactMessage(message) {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    })
    if (res.ok) return await res.json()
  } catch {
    /* segue para fallback */
  }
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('contact_messages').insert(message)
    if (error) throw error
    return { ok: true, source: 'supabase' }
  }
  return { ok: true, source: 'demo' }
}
