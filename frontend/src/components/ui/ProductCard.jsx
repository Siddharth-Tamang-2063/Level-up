import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, Eye } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const BADGE_COLORS = {
  'Best Seller': 'bg-charcoal text-cream',
  'New Arrival': 'bg-sand text-white',
  'Sale': 'bg-red-500 text-white',
  'Limited': 'bg-blush text-charcoal',
  'Luxury': 'bg-sand-dark text-white',
  'Premium': 'bg-sand-dark text-white',
}

export default function ProductCard({ product, layout = 'grid' }) {
  if (!product) return null
  const [hovered, setHovered] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const sizes = product.sizes || []
    addItem(product, sizes[2] || sizes[0] || 'M')
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1800)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const img1 = product.images?.[0]
  const img2 = product.images?.[1]

  if (layout === 'list') {
    return (
      <Link to={`/product/${product.slug}`}
        className="flex gap-4 p-4 bg-white hover:shadow-card transition-shadow duration-300 group">
        <div className="w-28 h-36 flex-shrink-0 overflow-hidden bg-cream-200 relative">
          <img src={img1} alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ opacity: 1 }} />
        </div>
        <div className="flex flex-col justify-between py-1 flex-1">
          <div>
            <p className="text-xs tracking-widest uppercase text-sand font-medium mb-1">{product.category}</p>
            <h3 className="font-display text-xl font-light text-charcoal leading-tight mb-2">{product.name}</h3>
            <p className="text-sm text-charcoal/60 line-clamp-2 font-sans">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-lg font-medium text-charcoal">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-sm text-charcoal/40 line-through">Rs. {product.originalPrice.toLocaleString()}</span>}
            </div>
            <div className="flex gap-1">
              {(product.sizes || []).slice(0, 4).map(s => (
                <span key={s} className="text-xs border border-charcoal/20 px-2 py-0.5 text-charcoal/60">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: 1 }}
    >
      <Link to={`/product/${product.slug}`} className="block">

        {/* ── Image Shell ───────────────────────────── */}
        <div
          className="relative overflow-hidden bg-cream-200"
          style={{ paddingBottom: '133.33%' }}
        >
          {/* Primary image */}
          <img
            src={img1}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 1,
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />

          {/* Secondary image crossfade */}
          {img2 && (
            <img
              src={img2}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'scale(1.07)' : 'scale(1.03)',
                transition: 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          )}

          {/* Dark scrim — deepens on hover */}
          <div
            className="absolute inset-0 bg-charcoal pointer-events-none"
            style={{
              opacity: hovered ? 0.12 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <span className={`absolute top-3 left-3 text-xs tracking-widest uppercase font-sans font-medium px-2.5 py-1 z-10 ${BADGE_COLORS[product.badge] || 'bg-charcoal text-cream'}`}
              style={{
                opacity: hovered ? 0 : 1,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}>
              {product.badge}
            </span>
          )}

          {/* Discount % */}
          {discount && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2 py-1 font-sans z-10">
              -{discount}%
            </span>
          )}

          {/* Wishlist — slides in from top-right */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlist(!wishlist) }}
            className="absolute w-9 h-9 bg-white flex items-center justify-center z-20"
            style={{
              top: discount ? '46px' : '12px',
              right: '12px',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.85)',
              transition: 'opacity 0.3s ease 0.05s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }}
          >
            <Heart
              size={14}
              className={wishlist ? 'fill-red-400 text-red-400' : 'text-charcoal'}
              style={{ transition: 'color 0.2s ease, fill 0.2s ease' }}
            />
          </button>

          {/* Quick-view pill — fades in center */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease 0.1s',
            }}
          >
            <Link
              to={`/product/${product.slug}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs tracking-widest uppercase font-sans font-medium text-charcoal pointer-events-auto"
              style={{
                transform: hovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.95)',
                transition: 'transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1) 0.1s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              <Eye size={13} />
              Quick View
            </Link>
          </div>

          {/* Add to Cart bar — slides up from bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20"
            style={{
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-widest uppercase font-sans font-medium"
              style={{
                background: addedToCart ? '#185C3E' : '#0D0B09',
                color: '#F2EBE0',
                transition: 'background 0.3s ease',
              }}
            >
              <ShoppingBag
                size={13}
                style={{
                  transform: addedToCart ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
              {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* ── Product Info ──────────────────────────── */}
        <div className="pt-3.5 pb-1">
          <p className="text-xs tracking-widest uppercase text-sand font-medium font-sans mb-1">{product.category}</p>
          <h3
            className="font-display text-lg md:text-xl font-light leading-tight mb-2"
            style={{
              color: hovered ? '#BF7B16' : '#0D0B09',
              transition: 'color 0.3s ease',
            }}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-medium text-charcoal">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-charcoal/40 line-through font-sans">Rs. {product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sand text-xs">★</span>
              <span className="text-xs text-charcoal/60 font-sans">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}