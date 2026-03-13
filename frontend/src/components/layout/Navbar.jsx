import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'
import logo from '../../assets/logo.jpeg'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Men', href: '/collection?gender=men', sub: [
    { label: 'New In', href: '/collection?gender=men&filter=new' },
    { label: 'Hoodies', href: '/collection?category=hoodies' },
    { label: 'Jackets', href: '/collection?category=jackets' },
    { label: 'T-Shirts', href: '/collection?category=tshirts' },
    { label: 'Trousers', href: '/collection?category=pants' },
  ]},
  { label: 'Women', href: '/collection?gender=women', sub: [
    { label: 'New In', href: '/collection?gender=women&filter=new' },
    { label: 'Dresses', href: '/collection?category=dresses' },
    { label: 'Jackets', href: '/collection?category=jackets' },
    { label: 'Hoodies', href: '/collection?category=hoodies' },
    { label: 'Trousers', href: '/collection?category=pants' },
  ]},
  { label: 'Sale', href: '/collection?filter=sale', accent: true },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { itemCount } = useCart()
  const location = useLocation()
  const searchRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [location.pathname])

  useEffect(() => {
    if (searchQuery.length > 1) {
      const q = searchQuery.toLowerCase()
      setSearchResults(PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) || p.category.includes(q)
      ).slice(0, 5))
    } else setSearchResults([])
  }, [searchQuery])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  return (
    <>
      <div id="site-header" className="sticky top-0 z-40">
        {/* Announcement bar */}
        <div className="bg-charcoal text-cream py-2.5 px-4 text-xs tracking-widest uppercase font-sans overflow-hidden">
          {/* Desktop - static centered */}
          <p className="hidden md:block text-center">Free delivery inside Pokhara · Cash on Delivery Available · Delivery all over Nepal</p>

          {/* Mobile - marquee */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex whitespace-nowrap announcement-marquee">
              {[0,1].map(i => (
                <span key={i} className="flex items-center gap-6 pr-6">
                  <span>🚚 Free Delivery in Pokhara</span>
                  <span className="text-sand/60">✦</span>
                  <span>💵 Cash on Delivery Available</span>
                  <span className="text-sand/60">✦</span>
                  <span>📦 Delivery All Over Nepal</span>
                  <span className="text-sand/60">✦</span>
                  <span>🔄 Easy Exchange Policy</span>
                  <span className="text-sand/60">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes announcement-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .announcement-marquee {
            animation: announcement-scroll 18s linear infinite;
            width: max-content;
          }
          .announcement-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <header className={`transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-luxury' : 'bg-cream'}`}>
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 -ml-2 text-charcoal"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex-shrink-0"
              >
                <img
                  src={logo}
                  alt="Level Up Fashion"
                  className="h-10 md:h-14 w-auto object-contain"
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-8 ml-10">
                {NAV_LINKS.map(link => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-1 text-xs tracking-widest uppercase font-sans font-medium transition-colors duration-200 py-7 ${
                        link.accent ? 'text-red-500 hover:text-red-600' : 'text-charcoal hover:text-sand'
                      }`}
                    >
                      {link.label}
                      {link.sub && (
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {link.sub && activeDropdown === link.label && (
                      <div className="absolute top-full left-0 bg-cream shadow-luxury-lg py-4 w-48 animate-fade-up">
                        {link.sub.map(s => (
                          <Link
                            key={s.label}
                            to={s.href}
                            className="block px-6 py-2.5 text-xs tracking-widest uppercase font-sans text-charcoal/70 hover:text-sand hover:bg-cream-200 transition-colors duration-150"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2.5 text-charcoal hover:text-sand transition-colors duration-200"
                >
                  <Search size={18} />
                </button>

                <Link
                  to="/cart"
                  className="relative p-2.5 text-charcoal hover:text-sand transition-colors duration-200"
                >
                  <ShoppingBag size={18} />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-charcoal text-cream text-[10px] font-sans font-medium flex items-center justify-center rounded-full animate-scale-in">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </nav>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-charcoal/10 bg-cream/98 backdrop-blur-md animate-fade-up">
              <div className="max-w-2xl mx-auto px-6 py-5">
                <div className="relative">
                  <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/40" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products, collections..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Escape') setSearchOpen(false) }}
                    className="w-full pl-7 pb-3 pt-1 bg-transparent border-b border-charcoal/20 text-charcoal placeholder:text-charcoal/40 font-sans text-sm focus:outline-none focus:border-sand transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-4 divide-y divide-charcoal/5">
                    {searchResults.map(p => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                        className="flex items-center gap-4 py-3 hover:text-sand transition-colors group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-16 object-cover bg-cream-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-display text-base font-light text-charcoal group-hover:text-sand transition-colors">
                            {p.name}
                          </p>
                          <p className="text-xs text-charcoal/50 font-sans mt-0.5">Rs. {p.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {searchQuery.length > 1 && searchResults.length === 0 && (
                  <p className="mt-4 text-sm text-charcoal/50 font-sans">No results for "{searchQuery}"</p>
                )}
              </div>
            </div>
          )}
        </header>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-cream z-50 lg:hidden animate-slide-right overflow-y-auto">
            <div className="p-6">
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-8">
                <img src={logo} alt="Level Up Fashion" className="h-10 w-auto object-contain" />
                <button onClick={() => setMenuOpen(false)} className="text-charcoal p-1">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1">
                {NAV_LINKS.map(link => (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      className={`block py-4 border-b border-charcoal/5 text-sm tracking-widest uppercase font-sans font-medium ${
                        link.accent ? 'text-red-500' : 'text-charcoal'
                      }`}
                    >
                      {link.label}
                    </Link>
                    {link.sub && (
                      <div className="pl-4 pt-1 pb-2 space-y-1">
                        {link.sub.map(s => (
                          <Link
                            key={s.label}
                            to={s.href}
                            className="block py-2 text-xs tracking-widest uppercase font-sans text-charcoal/60 hover:text-sand"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-charcoal/10 space-y-4">
                <Link to="/cart" className="flex items-center gap-3 text-sm font-sans text-charcoal">
                  <ShoppingBag size={16} />
                  Cart
                  {itemCount > 0 && (
                    <span className="bg-charcoal text-cream text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 text-sm font-sans text-charcoal/70 hover:text-sand"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}