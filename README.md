# Premium FiveM RP Server Website

A complete single-page FiveM roleplay server website built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Icons, localStorage theme/language saving, mock data, and a FiveM status service with safe fallback data.

## Features

- Single-page landing page with smooth section scrolling
- Sticky animated navbar with active section highlight
- Dark/light theme toggle saved in localStorage
- English/Arabic language switcher saved in localStorage
- RTL layout support for Arabic
- Hero section with animated glow background and quick stats
- FiveM connect buttons using `fivem://connect/IP:PORT`
- Live FiveM status fetch using CFX code with fallback/mock data
- Team cards with roles, profile images, links, and socials
- Public jobs section with video modal
- Server features grid
- Rules section with tabs, search, and accordions
- Server gallery with filters and keyboard-friendly lightbox
- About/server story section
- Announcements filter layout
- New player guide with localStorage checklist
- FAQ search and accordion
- Changelog timeline with added/removed/changed filters
- Server partners section with filters, search, verified badges, and socials
- Support CTA section
- Premium footer
- Fully responsive layout
- Ready for Vercel deployment

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Open Vercel.
3. Import the repository.
4. Framework preset: `Vite`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

## Change server name, IP, CFX code, and links

Edit:

```txt
src/config/server.ts
```

Important fields:

```ts
serverName: 'ALHABASHY RP'
connectIp: 'YOUR_SERVER_IP:30120'
cfxCode: 'YOUR_CFX_CODE'
discordUrl: 'https://discord.gg/YOUR_LINK'
portfolioUrl: 'https://your-portfolio.com'
```

The connect button uses:

```ts
fivem://connect/YOUR_SERVER_IP:30120
```

## FiveM server status

The status service is here:

```txt
src/services/fivemStatus.ts
```

It tries to fetch:

```txt
https://servers-frontend.fivem.net/api/servers/single/YOUR_CFX_CODE
```

If the API fails, the CFX code is invalid, or the request is blocked by CORS, the website automatically shows fallback/mock data instead of breaking.

Later, you can replace the service with your own backend proxy.

## Edit team members

Edit:

```txt
src/data/team.ts
```

Change names, roles, images, portfolio links, descriptions, statuses, and social links.

Team images are currently stored as SVG placeholders in:

```txt
public/team/
```

Replace them with your own PNG/JPG/WebP files and update the image paths.

## Edit jobs

Edit:

```txt
src/data/jobs.ts
```

Each job supports:

- Name
- Icon string
- Short description
- Detailed description
- YouTube embed URL
- Difficulty
- Salary
- Location
- Requirements

Use YouTube embed links like:

```txt
https://www.youtube.com/embed/VIDEO_ID
```

## Edit server features

Edit:

```txt
src/data/features.ts
```

Each feature has an icon string, title, and description.

## Edit rules

Edit:

```txt
src/data/rules.ts
```

Each category contains rule items with:

- Rule number
- Title
- Description
- Severity: `Low`, `Medium`, `High`, or `Critical`
- Optional punishment

Rules search works across all categories.

## Edit gallery images

Edit:

```txt
src/data/gallery.ts
```

Gallery placeholder assets are in:

```txt
public/gallery/
```

Replace the SVG files with real screenshots and update the paths if needed.

Supported categories:

- Cars
- Police
- EMS
- Jobs
- Events
- Community
- Businesses
- Houses
- Gangs

## Edit about/server story

Edit:

```txt
src/data/about.ts
```

Update story, mission, vision, what makes the server different, community paragraph, RP quality paragraph, and stat cards.

## Edit announcements

Edit:

```txt
src/data/announcements.ts
```

Announcement images are in:

```txt
public/announcements/
```

Priorities:

- Normal
- Important
- Maintenance
- Event

## Edit player guide

Edit:

```txt
src/data/playerGuide.ts
```

Each guide item has a title, icon, description, and numbered steps.

The new-player checklist saves progress in localStorage using the key:

```txt
new-player-checklist
```

## Edit FAQ

Edit:

```txt
src/data/faq.ts
```

The FAQ section includes search and animated accordions.

## Edit changelog

Edit:

```txt
src/data/changelog.ts
```

Each update supports:

- Version
- Date
- Title
- Added list
- Removed list
- Changed list

Colors:

- Added = green
- Removed = red
- Changed = blue

## Edit partners

Edit:

```txt
src/data/partners.ts
```

Partner assets are in:

```txt
public/partners/
```

Supported partner types:

- Community Partner
- Streamer
- Content Creator
- Sponsor
- Developer Partner
- Discord Partner

Each partner supports:

- Logo/avatar
- Name
- Type badge
- Description
- URL
- Verified badge
- Social links

## Edit portfolio/social links

Edit:

```txt
src/config/server.ts
```

Fields:

```ts
portfolioUrl
instagramUrl
tiktokUrl
youtubeUrl
discordUrl
supportUrl
reportUrl
banAppealUrl
bugReportUrl
staffComplaintUrl
donationUrl
```

## Theme toggle

Component:

```txt
src/components/ThemeToggle.tsx
```

The selected theme is saved in localStorage with key:

```txt
theme
```

Tailwind uses dark mode class strategy.

## Language switcher

Component:

```txt
src/components/LanguageSwitcher.tsx
```

Translations:

```txt
src/i18n/translations.ts
```

Selected language is saved in localStorage with key:

```txt
language
```

Arabic sets:

```html
dir="rtl"
```

English sets:

```html
dir="ltr"
```

## Main file structure

```txt
src/
  components/
  data/
  i18n/
  services/
  config/
  types/
  App.tsx
  main.tsx
  index.css
```

## Notes

- This is frontend-only.
- Mock data is included everywhere.
- It is ready for backend integration later.
- Replace placeholder images inside `public/` with real server screenshots, staff avatars, and partner logos.
