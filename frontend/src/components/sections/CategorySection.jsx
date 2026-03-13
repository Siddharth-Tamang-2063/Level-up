import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { COLLECTIONS } from '../../data/products'

const MARQUEE_ITEMS = [
  'Cash on Delivery Available', '✦', 'New Collection 2025', '✦',
  'Delivery All Over Nepal', '✦', 'Easy Exchange Policy', '✦',
  'New Arrivals Every Week', '✦', 'Quality Clothing', '✦',
  'Cash on Delivery Available', '✦', 'New Collection 2025', '✦',
  'Delivery All Over Nepal', '✦', 'Easy Exchange Policy', '✦',
  'New Arrivals Every Week', '✦', 'Quality Clothing', '✦',
]

export function Marquee() {
  return (
    <div className="bg-charcoal overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i}
            className={`mx-5 text-xs tracking-widest uppercase font-sans font-medium ${
              item === '✦' ? 'text-sand text-[8px]' : 'text-cream/60'
            }`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Shared card shell ─────────────────────────────────── */
function CategoryCard({ to, image, tag, tagGold, count, name, large }) {
  return (
    <Link to={to} className="group relative overflow-hidden block w-full h-full">
      <img
        src={image} alt={name} loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

      {/* Badge */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-sans font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 ${tagGold ? 'bg-sand text-white' : 'bg-cream/90 text-charcoal'}`}>
          {tag}
        </span>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
        <p className="text-[10px] sm:text-xs tracking-widest uppercase font-sans text-cream/50 mb-1">{count}</p>
        <div className="flex items-end justify-between gap-2">
          <h3 className={`font-display font-light text-cream leading-none ${large ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>
            {name}
          </h3>
          <div className="w-7 h-7 sm:w-8 sm:h-8 border border-cream/30 group-hover:border-cream group-hover:bg-cream flex items-center justify-center transition-all duration-300 flex-shrink-0">
            <ArrowUpRight size={12} className="text-cream group-hover:text-charcoal transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function CategoryCards() {
  return (
    <section className="py-14 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12 md:mb-16">
          <div>
            <p className="text-xs tracking-ultra uppercase font-sans font-medium text-sand mb-2 sm:mb-3">Shop by Category</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-charcoal">Find Your Style</h2>
          </div>
          <Link to="/collection"
            className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase font-sans font-medium text-charcoal/50 hover:text-sand transition-colors group">
            View All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── MOBILE: simple 2-col grid ───────────────────── */}
        <div className="grid grid-cols-2 gap-2.5 md:hidden">
          {[
           { to: '/collection?category=hoodies', image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',tag: 'Cozy Essentials nigga',count: '24 nigga styles',name: 'Hoodies'},
            { to: '/collection?category=jackets', image: 'https://images.unsplash.com/photo-1706765779494-2705542ebe74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFja2V0fGVufDB8fDB8fHww', tag: 'Outerwear', count: '18 styles', name: 'Jackets' },
            { to: '/collection?category=tshirts', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80', tag: 'The Basics', count: '36 styles', name: 'T-Shirts' },
            { to: '/collection?category=pants', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80', tag: 'Tailored Fit', count: '15 styles', name: 'Trousers' },
            { to: '/collection?category=dresses', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', tag: 'New Season', tagGold: true, count: '12 styles', name: 'Dresses' },
            { to: '/collection?filter=sale', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', tag: 'Up to 40% Off', tagGold: true, count: 'Limited Time', name: 'Sale' },
          ].map(c => (
            <div key={c.name} className="aspect-[3/4] relative">
              <CategoryCard {...c} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP: bento grid ──────────────────────────── */}
        <div className="hidden md:grid grid-cols-12 gap-4" style={{ gridTemplateRows: '320px 260px' }}>

          {/* Hoodies — tall left (2 rows) */}
          <div className="col-span-3 row-span-2 relative">
            <CategoryCard
              to="/collection?category=hoodies"
              image="https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              tag="Cozy Essentials" count="24 styles" name="Hoodies" large
            />
          </div>

          {/* Jackets — wide top center */}
          <div className="col-span-6 relative">
            <CategoryCard
              to="/collection?category=jackets"
              image="https://images.unsplash.com/photo-1706765779494-2705542ebe74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFja2V0fGVufDB8fDB8fHww"
              tag="Outerwear" count="18 styles" name="Jackets" large
            />
          </div>

          {/* Dresses — tall right (2 rows) */}
          <div className="col-span-3 row-span-2 relative">
            <CategoryCard
              to="/collection?category=dresses"
              image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85"
              tag="New Season" tagGold count="12 styles" name="Dresses" large
            />
          </div>

          {/* T-Shirts — bottom center left */}
          <div className="col-span-3 relative">
            <CategoryCard
              to="/collection?category=tshirts"
              image="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=85"
              tag="The Basics" count="36 styles" name="T-Shirts"
            />
          </div>

          {/* Trousers — bottom center right */}
          <div className="col-span-3 relative">
            <CategoryCard
              to="/collection?category=pants"
              image="https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=85"
              tag="Tailored Fit" count="15 styles" name="Trousers"
            />
          </div>

        </div>

        {/* Mobile view-all */}
        <div className="mt-6 text-center sm:hidden">
          <Link to="/collection" className="btn-outline inline-flex items-center gap-2 text-xs">
            Browse All <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function FeaturedCollections() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#10131F] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #BF7B1622 0%, transparent 60%), radial-gradient(circle at 80% 20%, #BF7B1611 0%, transparent 50%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <p className="text-xs tracking-ultra uppercase font-sans font-medium text-sand mb-3 sm:mb-4">Curated Edits</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-cream leading-tight">
              Our Collections
            </h2>
          </div>
          <p className="font-sans font-light text-cream/40 text-sm sm:text-base max-w-xs sm:text-right">
            Carefully selected styles for every occasion and season.
          </p>
        </div>

        {/* ── MOBILE: stacked cards ───────────────── */}
        <div className="flex flex-col gap-3 md:hidden">
          {COLLECTIONS.map((col, i) => (
            <Link key={col.id} to={`/collection?collection=${col.slug}`}
              className="group relative overflow-hidden aspect-[16/9]">
              <img src={col.image} alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              {i === 0 && (
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-widest uppercase font-sans border border-cream/30 text-cream/60 px-3 py-1.5">Featured</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-xs tracking-widest uppercase font-sans text-sand mb-1">{col.description}</p>
                  <h3 className="font-display text-2xl font-light text-cream">{col.name}</h3>
                  <p className="text-xs text-cream/35 font-sans mt-0.5">{col.itemCount} Pieces</p>
                </div>
                <div className="w-9 h-9 border border-cream/20 group-hover:border-sand group-hover:bg-sand flex items-center justify-center transition-all duration-300 flex-shrink-0">
                  <ArrowUpRight size={13} className="text-cream/50 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── DESKTOP: feature + stacked ──────────── */}
        <div className="hidden md:grid grid-cols-12 gap-5" style={{ minHeight: '520px' }}>

          {/* Big feature card */}
          <Link to={`/collection?collection=${COLLECTIONS[0].slug}`}
            className="col-span-7 group relative overflow-hidden">
            <img src={COLLECTIONS[0].image} alt={COLLECTIONS[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="text-[10px] tracking-widest uppercase font-sans border border-cream/30 text-cream/60 px-3 py-1.5">Featured</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-xs tracking-widest uppercase font-sans text-sand mb-3">{COLLECTIONS[0].description}</p>
              <h3 className="font-display text-4xl lg:text-5xl font-light text-cream mb-4 leading-tight">{COLLECTIONS[0].name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase font-sans text-cream/40">{COLLECTIONS[0].itemCount} Pieces</span>
                <div className="flex items-center gap-2 text-cream/50 group-hover:text-sand transition-colors duration-300">
                  <span className="text-xs tracking-widest uppercase font-sans">Explore</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </Link>

          {/* Two stacked on right */}
          <div className="col-span-5 flex flex-col gap-5">
            {COLLECTIONS.slice(1).map(col => (
              <Link key={col.id} to={`/collection?collection=${col.slug}`}
                className="flex-1 group relative overflow-hidden">
                <img src={col.image} alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-xs tracking-widest uppercase font-sans text-sand mb-2">{col.description}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-2xl lg:text-3xl font-light text-cream mb-1">{col.name}</h3>
                      <p className="text-xs tracking-widest uppercase font-sans text-cream/35">{col.itemCount} Pieces</p>
                    </div>
                    <div className="w-9 h-9 border border-cream/20 group-hover:border-sand group-hover:bg-sand flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      <ArrowUpRight size={13} className="text-cream/50 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-10 border-t border-cream/5 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-cream/30 text-center sm:text-left">New collection drops every season — follow us to stay updated.</p>
          <Link to="/collection"
            className="flex items-center gap-2 border border-cream/15 text-cream/50 hover:border-sand hover:text-sand px-6 py-3 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-200 group whitespace-nowrap">
            View All Collections
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}