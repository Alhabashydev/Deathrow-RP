import type { ChangelogItem } from '../types'

export const changelog: ChangelogItem[] = [
  {
    version: 'v1.2.0',
    date: '2026-04-29',
    title: 'Public Jobs Update',
    added: ['Added miner job', 'Added plumber job', 'Added electricity worker job', 'Added job explanation videos'],
    removed: ['Removed old delivery job UI'],
    changed: ['Changed job payment balance', 'Changed server loading screen', 'Changed job route timing'],
  },
  {
    version: 'v1.1.0',
    date: '2026-04-18',
    title: 'Police & EMS Improvements',
    added: ['Added EMS treatment flow', 'Added police evidence lockers', 'Added department callsigns'],
    removed: ['Removed outdated MDT test commands'],
    changed: ['Changed radio channel permissions', 'Changed emergency vehicle repair rules'],
  },
  {
    version: 'v1.0.0',
    date: '2026-04-01',
    title: 'City Launch',
    added: ['Added core economy', 'Added public jobs', 'Added staff support system', 'Added starter guide'],
    removed: [],
    changed: ['Changed default spawn flow after beta testing'],
  },
]
