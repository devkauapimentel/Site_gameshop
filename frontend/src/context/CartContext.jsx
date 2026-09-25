import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'gameshop:cart'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.product.id)
      const items = existing
        ? state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: Math.min(i.qty + action.qty, i.stock ?? 99) } : i,
          )
        : [...state.items, { ...action.product, qty: action.qty }]
      return { ...state, items }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'SET_QTY':
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i)),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] }, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { items: JSON.parse(saved) } : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const value = useMemo(() => {
    const subtotal = state.items.reduce((acc, i) => acc + i.price * i.qty, 0)
    const count = state.items.reduce((acc, i) => acc + i.qty, 0)
    return {
      items: state.items,
      subtotal,
      count,
      addItem: (product, qty = 1) => dispatch({ type: 'ADD', product, qty }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>')
  return ctx
}
