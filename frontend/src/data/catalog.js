// Catálogo local (fallback "modo demo") usado enquanto as
// credenciais do Supabase não são configuradas no .env
export const CATEGORIES = [
  { id: 'ps5', name: 'PlayStation 5', icon: '🎮' },
  { id: 'xbox', name: 'Xbox Series', icon: '🟩' },
  { id: 'switch', name: 'Nintendo Switch', icon: '🔴' },
  { id: 'pc', name: 'PC Gaming', icon: '🖥️' },
  { id: 'acessorios', name: 'Acessórios', icon: '🕹️' },
]

const g = (cover) => `https://images.unsplash.com/${cover}?auto=format&fit=crop&w=640&q=70`

export const PRODUCTS = [
  { id: 'elden-ring', name: 'Elden Ring', category: 'ps5', price: 299.9, oldPrice: 349.9, rating: 4.9, stock: 25, cover: g('photo-1552820728-8b83367286ba'), badge: 'BEST SELLER', description: 'RPG de mundo aberto da FromSoftware. Explore as Terras Intermediárias e desafie os semideuses.' },
  { id: 'god-of-war-ragnarok', name: 'God of War: Ragnarök', category: 'ps5', price: 349.9, oldPrice: 399.9, rating: 4.8, stock: 18, cover: g('photo-1518709268805-4e9042af9f23'), badge: 'EXCLUSIVO', description: 'Kratos e Atreus enfrentam o fim do mundo na saga nórdica épica.' },
  { id: 'fc-25', name: 'EA Sports FC 25', category: 'xbox', price: 249.9, oldPrice: null, rating: 4.3, stock: 40, cover: g('photo-1511512578047-dfb367046c01'), badge: 'NOVIDADE', description: 'O futebol mais realista com a tecnologia HyperMotionV.' },
  { id: 'starfield', name: 'Starfield', category: 'xbox', price: 279.9, oldPrice: 349.9, rating: 4.2, stock: 12, cover: g('photo-1462331940025-496dfbfc7564'), badge: 'OFERTA', description: 'RPG espacial da Bethesda com mais de 1000 planetas para explorar.' },
  { id: 'halo-infinite', name: 'Halo Infinite', category: 'xbox', price: 199.9, oldPrice: 249.9, rating: 4.5, stock: 30, cover: g('photo-1542751371-adc38448a05e'), badge: null, description: 'Master Chief retorna na aventura definitiva de ficção científica.' },
  { id: 'zelda-tears', name: 'The Legend of Zelda: Tears of the Kingdom', category: 'switch', price: 399.9, oldPrice: null, rating: 5.0, stock: 15, cover: g('photo-1579373903781-dd92bc3eb501'), badge: 'TOP RATED', description: 'A jornada épica de Link por terra, céu e as profundezas de Hyrule.' },
  { id: 'mario-kart-8', name: "Mario Kart 8 Deluxe", category: 'switch', price: 299.9, oldPrice: 349.9, rating: 4.7, stock: 22, cover: g('photo-1560419015-7c427e8ae5ba'), badge: null, description: 'Corrida caótica com 96 pistas e todos os personagens icônicos.' },
  { id: 'smash-bros', name: 'Super Smash Bros. Ultimate', category: 'switch', price: 329.9, oldPrice: null, rating: 4.8, stock: 9, cover: g('photo-1550745165-9bc9b8b31a79'), badge: null, description: 'Todos os lutadores estão aqui no crossover definitivo dos games.' },
  { id: 'cyberpunk-2077', name: 'Cyberpunk 2077: Phantom Liberty', category: 'pc', price: 199.9, oldPrice: 299.9, rating: 4.6, stock: 50, cover: g('photo-1538481199705-c710c4e59f72'), badge: 'OFERTA', description: 'RPG futurista em Night City com a expansão vencedora do Game Awards.' },
  { id: 'cs2-bundle', name: 'Setup PC Gamer CS2 Edition', category: 'pc', price: 4999.9, oldPrice: 5999.9, rating: 4.9, stock: 5, cover: g('photo-1587202372775-e229f1cf2968'), badge: 'PREMIUM', description: 'RTX 4070, i7 14ª geração, 32GB DDR5 e monitor 240Hz montado e testado.' },
  { id: 'headset-hyperx', name: 'Headset HyperX Cloud III', category: 'acessorios', price: 449.9, oldPrice: 549.9, rating: 4.7, stock: 35, cover: g('photo-1599650089726-9a84492a4e07'), badge: null, description: 'Áudio espacial DTS:X, drivers de 53mm e conforto lendário.' },
  { id: 'controle-dualsense', name: 'Controle DualSense PS5', category: 'acessorios', price: 449.9, oldPrice: null, rating: 4.8, stock: 60, cover: g('photo-1507457439900-52a39e5187a4'), badge: null, description: 'Feedback háptico e gatilhos adaptáveis de última geração.' },
  { id: 'teclado-mecanico', name: 'Teclado Mecânico RGB TKL', category: 'acessorios', price: 329.9, oldPrice: 429.9, rating: 4.5, stock: 28, cover: g('photo-1541140532154-b024d705b90a'), badge: 'OFERTA', description: 'Switches red lineares, keycaps PBT e iluminação por tecla.' },
  { id: 'cadeira-gamer', name: 'Cadeira Gamer Thunder X7', category: 'acessorios', price: 1299.9, oldPrice: 1599.9, rating: 4.4, stock: 8, cover: g('photo-1598550476439-6847785fcea6'), badge: null, description: 'Espuma injetada, apoio 4D e reclinável até 190°.' },
]

export const BANNERS = [
  { id: 1, title: 'SEASON SALE', subtitle: 'Até 40% OFF em jogos digitais e físicos', cta: 'Ver ofertas', color: 'from-neon-600 via-brand-600 to-brand-800' },
  { id: 2, title: 'LANÇAMENTO: GTA VI', subtitle: 'Pré-venda aberta — garanta o seu antes de todo mundo', cta: 'Pré-comprar', color: 'from-pink-600 via-brand-600 to-brand-800' },
  { id: 3, title: 'PC GAMER', subtitle: 'Setups montados com garantia e frete grátis', cta: 'Montar meu PC', color: 'from-emerald-600 via-brand-600 to-brand-800' },
]

export const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
