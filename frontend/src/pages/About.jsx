export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <img
          src="/images/loja.jpg"
          alt="Fachada da loja GamesShop"
          className="w-full rounded-3xl border border-neon-500/20 object-cover shadow-2xl shadow-neon-600/10"
        />
        <div>
          <h1 className="font-display text-3xl text-white">
            Sobre a <span className="text-neon-400">loja</span>
          </h1>
          <p className="mt-5 leading-relaxed text-gray-300">
            A GamesShop nasceu da paixão por videogames. Somos uma loja
            especializada no nicho gamer, oferecendo os lançamentos mais
            aguardados, clássicos atemporais, consoles de nova geração e
            acessórios de alto desempenho para PlayStation, Xbox, Nintendo e PC.
          </p>
          <p className="mt-4 leading-relaxed text-gray-300">
            Nossa missão é entregar a melhor experiência de compra do mercado
            gamer: preços justos, envio rápido para todo o Brasil, atendimento
            feito por quem realmente joga e uma curadoria apaixonada de títulos
            que valem cada centavo.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              ['+50 mil', 'gamers atendidos'],
              ['4.9★', 'avaliação média'],
              ['24h', 'envio expresso'],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-white/10 bg-brand-800 p-4">
                <p className="font-display text-xl text-neon-400">{n}</p>
                <p className="mt-1 text-xs text-gray-400">{l}</p>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex items-center gap-6">
            <li><img src="/images/nintendo.png" alt="Nintendo" className="h-6 invert opacity-80" /></li>
            <li><img src="/images/xbox.png" alt="Xbox" className="h-6 opacity-80" /></li>
            <li><img src="/images/playstation.png" alt="PlayStation" className="h-6 opacity-80" /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
