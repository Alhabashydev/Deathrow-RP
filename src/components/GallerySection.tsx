import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import { galleryItems } from '../data/gallery'
import type { GalleryItem, Language } from '../types'
import { translations } from '../i18n/translations'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface GallerySectionProps {
  language: Language
}

const categories = ['All', 'Cars', 'Police', 'EMS', 'Jobs', 'Events', 'Community', 'Businesses', 'Houses', 'Gangs'] as const

export default function GallerySection({ language }: GallerySectionProps) {
  const t = translations[language]
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filteredItems = useMemo(() => (activeCategory === 'All' ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)), [activeCategory])
  const selectedItem: GalleryItem | null = selectedIndex === null ? null : filteredItems[selectedIndex] ?? null

  const close = () => setSelectedIndex(null)
  const next = () => setSelectedIndex((value) => (value === null ? 0 : (value + 1) % filteredItems.length))
  const previous = () => setSelectedIndex((value) => (value === null ? 0 : (value - 1 + filteredItems.length) % filteredItems.length))

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!selectedItem) return
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedItem, filteredItems.length])

  return (
    <section id="gallery" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.gallery} subtitle="Filterable image grid with hover zoom, black-white border glow, and keyboard-friendly lightbox modal." />
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${activeCategory === category ? 'bg-black text-white dark:bg-white dark:text-black shadow-mtGlow' : 'border border-black/25 bg-white dark:border-white/25 dark:bg-black text-black/85 hover:border-black/45 dark:hover:border-white/50 hover:text-black dark:hover:text-white dark:text-white/80'}`}>
              {category === 'All' ? t.labels.all : category}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <motion.button
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedIndex(index)}
              className="text-start"
            >
              <Card className="overflow-hidden p-0">
                <div className="overflow-hidden rounded-t-[2rem]">
                  <img src={item.image} alt={item.title} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-black/5 dark:bg-black px-3 py-1 text-xs font-black text-black dark:text-white">{item.category}</span>
                  <h3 className="mt-3 text-xl font-black text-black dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-black/75 dark:text-white/80">{item.description}</p>
                </div>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-xl" onMouseDown={close} role="dialog" aria-modal="true" aria-label={selectedItem.title}>
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.95 }} onMouseDown={(event) => event.stopPropagation()} className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/20 dark:border-white/30 bg-black shadow-mtGlow">
              <img src={selectedItem.image} alt={selectedItem.title} className="max-h-[68vh] w-full object-cover" />
              <div className="p-5 text-white">
                <span className="rounded-full bg-black/10 dark:bg-black px-3 py-1 text-xs font-black text-black/85 dark:text-white/90">{selectedItem.category}</span>
                <h3 className="mt-3 text-2xl font-black">{selectedItem.title}</h3>
                <p className="mt-2 text-white/80">{selectedItem.description}</p>
              </div>
              <button aria-label="Close gallery lightbox" onClick={close} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-red-500">
                <FaTimes />
              </button>
              <button aria-label="Previous image" onClick={previous} className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black dark:hover:bg-white dark:hover:text-black">
                <FaChevronLeft />
              </button>
              <button aria-label="Next image" onClick={next} className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black dark:hover:bg-white dark:hover:text-black">
                <FaChevronRight />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
