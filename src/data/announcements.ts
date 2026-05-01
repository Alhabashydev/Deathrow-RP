import type { Announcement } from '../types'

export const announcements: Announcement[] = [
  {
    title: 'Public Jobs Update Released',
    date: '2026-04-29',
    category: 'Update',
    priority: 'Important',
    author: 'Alhabashy',
    description: 'We added new public jobs, improved payments, balanced job routes, and updated the jobs UI for better new-player flow.',
    image: '/announcements/jobs-update.svg',
  },
  {
    title: 'Weekend Community Event',
    date: '2026-05-02',
    category: 'Event',
    priority: 'Event',
    author: 'Staff Team',
    description: 'Join the city-wide event with prizes, car showcase, police interactions, and community roleplay scenes.',
    image: '/announcements/community-event.svg',
  },
  {
    title: 'Scheduled Maintenance',
    date: '2026-05-05',
    category: 'Maintenance',
    priority: 'Maintenance',
    author: 'Development Team',
    description: 'Short maintenance window for database cleanup, performance improvements, and server artifact update.',
    image: '/announcements/maintenance.svg',
  },
  {
    title: 'New Staff Applications',
    date: '2026-05-07',
    category: 'Staff',
    priority: 'Normal',
    author: 'Management',
    description: 'Staff applications are open for support-focused members with clean records and strong communication.',
    image: '/announcements/staff.svg',
  },
]
