import { useState } from 'react'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaBolt, FaBus, FaFish, FaHardHat, FaPlay, FaRecycle, FaSeedling, FaTaxi, FaTree, FaTruck, FaWrench } from 'react-icons/fa'
import { jobs } from '../data/jobs'
import type { Job, Language } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'
import Card from './Card'
import JobVideoModal from './JobVideoModal'
import SectionTitle from './SectionTitle'

interface JobsSectionProps {
  language: Language
}

const iconMap: Record<string, IconType> = {
  FaHardHat,
  FaBolt,
  FaWrench,
  FaTruck,
  FaRecycle,
  FaTaxi,
  FaFish,
  FaTree,
  FaSeedling,
  FaBus,
}

export default function JobsSection({ language }: JobsSectionProps) {
  const t = translations[language]
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  return (
    <section id="jobs" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.jobs} subtitle="Public jobs with difficulty, salary, location, requirements, and video explanation modal." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => {
            const JobIcon = iconMap[job.icon] ?? FaHardHat
            return (
              <motion.div
                key={job.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.045 }}
              >
                <Card className="relative h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-black/10 dark:bg-black text-2xl text-black dark:text-white transition group-hover:rotate-3 group-hover:scale-110 group-hover:shadow-mtGlow">
                      <JobIcon />
                    </div>
                    <h3 className="text-2xl font-black text-black dark:text-white">{job.name}</h3>
                    <p className="mt-2 text-sm font-bold text-black dark:text-white">{job.shortDescription}</p>
                    <p className="mt-4 text-sm leading-7 text-black/75 dark:text-white/80">{job.description}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white p-3 dark:bg-black">
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/60">{t.labels.difficulty}</p>
                        <p className="mt-1 font-black text-black dark:text-white">{job.difficulty}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3 dark:bg-black">
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/60">{t.labels.salary}</p>
                        <p className="mt-1 font-black text-black dark:text-white">{job.salary}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3 dark:bg-black">
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/60">{t.labels.location}</p>
                        <p className="mt-1 font-black text-black dark:text-white">{job.location}</p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-black uppercase tracking-widest text-black/60">{t.labels.requirements}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((requirement) => (
                          <span key={requirement} className="rounded-full border border-black/25 bg-white dark:border-white/25 dark:bg-black px-3 py-1 text-xs font-bold text-black/75 dark:text-white/80">
                            {requirement}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button onClick={() => setSelectedJob(job)} icon={<FaPlay />} className="mt-6 w-full" variant="primary">
                      {t.buttons.watchVideo}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
      <JobVideoModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </section>
  )
}
