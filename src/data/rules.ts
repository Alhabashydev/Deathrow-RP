import type { RuleCategory } from '../types'

export const rules: RuleCategory[] = [
  {
    category: 'General Rules',
    items: [
      { number: '1.1', title: 'Respect Everyone', description: 'Respect all players and staff. Toxic behavior, racism, harassment, and hate speech are not allowed.', severity: 'Critical', punishment: 'Warning / Temporary Ban / Permanent Ban' },
      { number: '1.2', title: 'No Exploiting', description: 'Using bugs, glitches, dupes, menus, or scripts to gain advantage is forbidden.', severity: 'Critical', punishment: 'Permanent Ban' },
      { number: '1.3', title: 'Follow Staff Instructions', description: 'Staff decisions must be followed during active situations. You may appeal later through support.', severity: 'High', punishment: 'Warning / Kick / Ban' },
    ],
  },
  {
    category: 'Roleplay Rules',
    items: [
      { number: '2.1', title: 'Stay In Character', description: 'Avoid breaking character during scenes unless staff instructs you to stop.', severity: 'Medium', punishment: 'Warning / Jail' },
      { number: '2.2', title: 'Value Your Life', description: 'Act realistically when your character is threatened, injured, or outnumbered.', severity: 'High', punishment: 'Jail / Temporary Ban' },
      { number: '2.3', title: 'No Fail RP', description: 'Do not perform unrealistic actions that ruin scenes or ignore roleplay consequences.', severity: 'High', punishment: 'Warning / Ban' },
    ],
  },
  {
    category: 'Police Rules',
    items: [
      { number: '3.1', title: 'Professional Conduct', description: 'Police must remain professional, follow department SOPs, and avoid abusing authority.', severity: 'High', punishment: 'Strike / Removal' },
      { number: '3.2', title: 'Evidence Required', description: 'Arrests and raids must be based on proper roleplay evidence and department procedure.', severity: 'Medium', punishment: 'Strike / Case Review' },
    ],
  },
  {
    category: 'EMS Rules',
    items: [
      { number: '4.1', title: 'Neutral Role', description: 'EMS should stay neutral and avoid helping one side of a criminal or police scene.', severity: 'High', punishment: 'Strike / Removal' },
      { number: '4.2', title: 'Medical RP', description: 'Use realistic treatment scenes and do not rush revives in major RP situations.', severity: 'Medium', punishment: 'Warning / Strike' },
    ],
  },
  {
    category: 'Gang Rules',
    items: [
      { number: '5.1', title: 'No Random Violence', description: 'Gang conflict must have roleplay reasons and escalation. Random shootings are not allowed.', severity: 'Critical', punishment: 'Gang Strike / Ban' },
      { number: '5.2', title: 'Respect Conflict Limits', description: 'Follow active war rules, group limits, and scene limits set by staff.', severity: 'High', punishment: 'Strike / Temporary Ban' },
    ],
  },
  {
    category: 'Vehicle Rules',
    items: [
      { number: '6.1', title: 'No VDM', description: 'Do not use vehicles as weapons unless the situation clearly allows realistic vehicle use.', severity: 'Critical', punishment: 'Temporary Ban / Permanent Ban' },
      { number: '6.2', title: 'Drive Realistically', description: 'Supercars, off-road vehicles, and emergency vehicles must be used in realistic ways.', severity: 'Medium', punishment: 'Warning / Fine' },
    ],
  },
  {
    category: 'Combat Rules',
    items: [
      { number: '7.1', title: 'No RDM', description: 'You must have proper RP interaction and reason before attacking another player.', severity: 'Critical', punishment: 'Temporary Ban / Permanent Ban' },
      { number: '7.2', title: 'No Combat Logging', description: 'Leaving during combat, chase, arrest, or staff situation is not allowed.', severity: 'High', punishment: 'Temporary Ban' },
    ],
  },
  {
    category: 'Safe Zone Rules',
    items: [
      { number: '8.1', title: 'No Crime In Safe Zones', description: 'Hospitals, spawn areas, support zones, and marked safe zones must stay peaceful.', severity: 'High', punishment: 'Jail / Ban' },
      { number: '8.2', title: 'No Camping', description: 'Do not wait outside safe zones to attack or rob players leaving the area.', severity: 'Medium', punishment: 'Warning / Jail' },
    ],
  },
]
