export const serverConfig = {
  serverName: 'ALHABASHY RP',
  serverTagline: 'A premium FiveM roleplay experience.',
  description:
    'Join a polished roleplay city built for serious stories, active staff, custom jobs, clean systems, and a strong community.',
  connectIp: 'YOUR_SERVER_IP:30120',
  cfxCode: 'YOUR_CFX_CODE',
  discordUrl: 'https://discord.gg/YOUR_LINK',
  portfolioUrl: 'https://your-portfolio.com',
  instagramUrl: 'https://instagram.com/YOUR_ACCOUNT',
  tiktokUrl: 'https://tiktok.com/@YOUR_ACCOUNT',
  youtubeUrl: 'https://youtube.com/@YOUR_ACCOUNT',
  supportUrl: 'https://discord.gg/YOUR_LINK',
  reportUrl: 'https://discord.gg/YOUR_LINK',
  banAppealUrl: 'https://discord.gg/YOUR_LINK',
  bugReportUrl: 'https://discord.gg/YOUR_LINK',
  staffComplaintUrl: 'https://discord.gg/YOUR_LINK',
  donationUrl: 'https://discord.gg/YOUR_LINK',
}

export const getConnectUrl = () => `fivem://connect/${serverConfig.connectIp}`
