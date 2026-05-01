export type Language = 'en' | 'ar'
export type Theme = 'dark' | 'light'

export interface TeamMember {
  name: string
  role: 'Owner' | 'Founder' | 'Developer' | 'Manager' | 'Staff Lead'
  image: string
  description: string
  portfolio: string
  status?: 'Online' | 'Offline' | 'Available' | 'Busy'
  socials?: SocialLinks
}

export interface Job {
  name: string
  icon: string
  shortDescription: string
  description: string
  videoUrl: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  salary: string
  location: string
  requirements: string[]
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface RuleItem {
  number: string
  title: string
  description: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  punishment?: string
}

export interface RuleCategory {
  category: string
  items: RuleItem[]
}

export interface GalleryItem {
  image: string
  title: string
  category: 'Cars' | 'Police' | 'EMS' | 'Jobs' | 'Events' | 'Community' | 'Businesses' | 'Houses' | 'Gangs'
  description: string
}

export interface AboutContent {
  story: string
  mission: string
  vision: string
  difference: string
  community: string
  roleplayQuality: string
  stats: Array<{
    label: string
    value: string
  }>
}

export interface Announcement {
  title: string
  date: string
  category: string
  description: string
  author: string
  image?: string
  priority: 'Normal' | 'Important' | 'Maintenance' | 'Event'
}

export interface PlayerGuideItem {
  title: string
  icon: string
  description: string
  steps: string[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface ChangelogItem {
  version: string
  date: string
  title: string
  added: string[]
  removed: string[]
  changed: string[]
}

export interface SocialLinks {
  discord?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  website?: string
}

export interface Partner {
  name: string
  type: 'Community Partner' | 'Streamer' | 'Content Creator' | 'Sponsor' | 'Developer Partner' | 'Discord Partner'
  image: string
  description: string
  url: string
  verified?: boolean
  socials?: SocialLinks
}

export interface ServerStatus {
  online: boolean
  players: number
  maxPlayers: number
  serverName: string
  serverIp: string
  cfxCode: string
  queue: number
  restartTime: string
  version: string
  lastUpdated: string
}
