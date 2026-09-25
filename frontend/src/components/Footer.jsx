export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neon-500/20 bg-brand-800">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg text-white">
            Games<span className="text-neon-400">Shop</span>
          </h3>
          <p className="mt-3 text-sm text-gray-400">
            A sua loja de games. Jogos, consoles e acessórios das maiores
            marcas com entrega rápida para todo o Brasil.
          </p>
          <ul className="mt-4 flex items-center gap-3">
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram"><img src="/images/instagram.png" alt="Instagram" className="h-7 w-7 opacity-80 transition hover:opacity-100" /></a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook"><img src="/images/facebook.png" alt="Facebook" className="h-7 w-7 opacity-80 transition hover:opacity-100" /></a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube"><img src="/images/youtube.png" alt="YouTube" className="h-7 w-7 opacity-80 transition hover:opacity-100" /></a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm text-neon-400">Categorias</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li><a href="/?cat=ps5" className="hover:text-white">PlayStation 5</a></li>
            <li><a href="/?cat=xbox" className="hover:text-white">Xbox Series</a></li>
            <li><a href="/?cat=switch" className="hover:text-white">Nintendo Switch</a></li>
            <li><a href="/?cat=pc" className="hover:text-white">PC Gaming</a></li>
            <li><a href="/?cat=acessorios" className="hover:text-white">Acessórios</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm text-neon-400">Atendimento</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>📞 (21) 4002-8922</li>
            <li>✉️ contato@gameshop.com.br</li>
            <li>📍 Rua Javascript nº 124, Vila HTML — Rio de Janeiro/RJ</li>
            <li>🕹️ Seg a Sáb, 9h às 21h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} GamesShop — Todos os direitos reservados. Feito para gamers, por gamers. 🎮
      </div>
    </footer>
  )
}
