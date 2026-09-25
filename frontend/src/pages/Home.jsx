import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/catalog'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('cat') || 'all'
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('relevancia')

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => category === 'all' || p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }
    switch (sort) {
      case 'menor-preco': return [...list].sort((a, b) => a.price - b.price)
      case 'maior-preco': return [...list].sort((a, b) => b.price - a.price)
      case 'avaliacao': return [...list].sort((a, b) => b.rating - a.rating)
      default: return list
    }
  }, [category, query, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="py-8">
        <HeroCarousel />
      </div>

      {/* Marcas */}
      <div className="mb-10 flex items-center justify-center gap-10 rounded-2xl border border-white/5 bg-brand-800/50 py-5 opacity-90">
        <img src="/images/nintendo.png" alt="Nintendo" className="h-6 invert" />
        <img src="/images/xbox.png" alt="Xbox" className="h-6" />
        <img src="/images/playstation.png" alt="PlayStation" className="h-6" />
      </div>

      <section id="catalogo" className="scroll-mt-24">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-display text-2xl text-white">
            Catálogo <span className="text-neon-400">//</span>{' '}
            <span className="text-sm text-gray-400">{products.length} itens</span>
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Buscar jogo ou produto..."
              className="w-full rounded-xl border border-white/10 bg-brand-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-neon-500 sm:w-64"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-white/10 bg-brand-800 px-4 py-2.5 text-sm text-white outline-none focus:border-neon-500"
            >
              <option value="relevancia">Relevância</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="avaliacao">Melhor avaliação</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <CategoryFilter
            active={category}
            onChange={(c) => setSearchParams(c === 'all' ? {} : { cat: c })}
          />
        </div>

        {products.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-gray-500">
            Nenhum produto encontrado 😢 — tente outra busca.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
