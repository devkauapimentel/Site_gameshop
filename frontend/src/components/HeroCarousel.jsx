import { useEffect, useState } from 'react'
import { BANNERS } from '../data/catalog'

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % BANNERS.length), 5000)
    return () => clearInterval(t)
  }, [])

  const banner = BANNERS[index]

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${banner.color} px-6 py-14 transition-all duration-700 sm:px-12 md:py-20`}
    >
      {/* grid pattern decorativo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="relative max-w-2xl">
        <p className="font-display text-xs tracking-[0.3em] text-white/70">GAMESHOP PRESENTS</p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-white drop-shadow-lg sm:text-5xl">
          {banner.title}
        </h2>
        <p className="mt-4 text-base text-white/85 sm:text-lg">{banner.subtitle}</p>
        <a
          href="#catalogo"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-display text-sm text-brand-700 shadow-2xl transition hover:scale-105 hover:bg-neon-400 hover:text-white"
        >
          {banner.cta} →
        </a>
      </div>

      <span className="absolute right-8 top-1/2 hidden -translate-y-1/2 animate-float text-8xl opacity-30 lg:block">
        🕹️
      </span>

      <div className="absolute bottom-5 left-6 flex gap-2 sm:left-12">
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            aria-label={`Banner ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
