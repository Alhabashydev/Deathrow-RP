import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import type { Job } from '../types'

interface JobVideoModalProps {
  job: Job | null
  onClose: () => void
}

export default function JobVideoModal({ job, onClose }: JobVideoModalProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-xl"
          onMouseDown={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${job.name} explanation video`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-black/20 dark:border-white/30 bg-black shadow-mtGlow"
          >
            <div className="flex items-center justify-between border-b border-white/20 p-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">Job Video</p>
                <h3 className="text-xl font-black text-white">{job.name}</h3>
              </div>
              <button aria-label="Close job video" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition hover:bg-red-500 hover:text-white">
                <FaTimes />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                title={`${job.name} explanation video`}
                src={job.videoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
