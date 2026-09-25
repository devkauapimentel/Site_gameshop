import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navLinkClass = ({ isActive }) =>
  `font-display text-xs tracking-wider transition-colors ${
    isActive ? 'text-neon-400' : 'text-gray-200 hover:text-neon-400'
  }`

export default function Header() {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-neon-500/20 bg-brand-800/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/favicon.svg" alt="GamesShop" className="h-9 w-9 animate-glow rounded-xl" />
          <span className="font-display text-lg text-white sm:text-xl">
            Games<span className="text-neon-400">Shop</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Loja
          </NavLink>
          <NavLink to="/sobre" className={navLinkClass}>
            Sobre
          </NavLink>
          <NavLink to="/contato" className={navLinkClass}>
            Contato
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/carrinho"
            className="relative rounded-xl bg-neon-600 px-4 py-2 font-display text-xs text-white shadow-lg shadow-neon-600/30 transition hover:bg-neon-500"
          >
            🛒 Carrinho
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-pink-neon text-[11px] font-bold text-white ring-2 ring-brand-800">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Nav mobile */}
      <nav className="flex items-center justify-center gap-6 border-t border-white/5 py-2 md:hidden">
        <NavLink to="/" className={navLinkClass} end>Loja</NavLink>
        <NavLink to="/sobre" className={navLinkClass}>Sobre</NavLink>
        <NavLink to="/contato" className={navLinkClass}>Contato</NavLink>
      </nav>
    </header>
  )
}
