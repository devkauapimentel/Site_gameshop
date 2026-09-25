// ============================================================
// Configuração central de integração com Supabase
// ------------------------------------------------------------
// COLOQUE AQUI AS SUAS CHAVES DO SUPABASE:
//   1. Acesse https://supabase.com -> seu projeto
//   2. Settings -> API
//   3. Copie Project URL e anon public key para o arquivo
//      /workspace/.env (na raiz do monorepo) ou frontend/.env
//
//   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
//   VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
//
// Sem as chaves, o app roda em "modo demo" com catálogo local.
// ============================================================
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey && !url.includes('SEU-PROJETO'))

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

export default supabase
