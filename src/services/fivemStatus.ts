import { serverConfig } from '../config/server'
import type { ServerStatus } from '../types'

interface FiveMApiPlayer {
  id?: number
  name?: string
  ping?: number
}

interface FiveMApiData {
  hostname?: string
  clients?: number
  sv_maxclients?: number
  players?: FiveMApiPlayer[]
  vars?: Record<string, string | number | undefined>
}

interface FiveMApiResponse {
  Data?: FiveMApiData
}

export const fallbackStatus: ServerStatus = {
  online: true,
  players: 120,
  maxPlayers: 256,
  serverName: serverConfig.serverName,
  serverIp: serverConfig.connectIp,
  cfxCode: serverConfig.cfxCode,
  queue: 4,
  restartTime: '06:00 UTC',
  version: 'RP Core v1.2.0',
  lastUpdated: 'Fallback data',
}

const getNumber = (value: unknown, fallback: number): number => {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

export async function fetchFiveMStatus(): Promise<ServerStatus> {
  if (!serverConfig.cfxCode || serverConfig.cfxCode === 'YOUR_CFX_CODE') {
    return {
      ...fallbackStatus,
      online: false,
      lastUpdated: new Date().toLocaleTimeString(),
    }
  }

  const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${serverConfig.cfxCode}`)

  if (!response.ok) {
    throw new Error('FiveM status API failed')
  }

  const json = (await response.json()) as FiveMApiResponse
  const data = json.Data

  if (!data) {
    throw new Error('FiveM status data unavailable')
  }

  return {
    online: true,
    players: getNumber(data.clients, data.players?.length ?? 0),
    maxPlayers: getNumber(data.sv_maxclients ?? data.vars?.sv_maxClients, fallbackStatus.maxPlayers),
    serverName: data.hostname ?? serverConfig.serverName,
    serverIp: serverConfig.connectIp,
    cfxCode: serverConfig.cfxCode,
    queue: getNumber(data.vars?.queue, 0),
    restartTime: String(data.vars?.restartTime ?? fallbackStatus.restartTime),
    version: String(data.vars?.serverVersion ?? fallbackStatus.version),
    lastUpdated: new Date().toLocaleTimeString(),
  }
}
