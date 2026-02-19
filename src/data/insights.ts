import { Report } from '@/types'

export const reports: Report[] = [
  {
    id: 'r1',
    name: 'Project Cost Summary',
    folder: 'Financial',
    lastRefreshed: '2026-02-18 06:00',
    sharedWithGroups: ['Administrators', 'Project Management'],
    description: 'Compares budget vs actual costs across all active jobs by cost category.',
  },
  {
    id: 'r2',
    name: 'Equipment Utilization',
    folder: 'Equipment',
    lastRefreshed: '2026-02-18 07:30',
    sharedWithGroups: ['Administrators', 'Field Operations'],
    description: 'Equipment uptime, idle hours, and utilization rate by asset class.',
  },
  {
    id: 'r3',
    name: 'Labor Productivity',
    folder: 'Operations',
    lastRefreshed: '2026-02-18 06:00',
    sharedWithGroups: ['Administrators', 'Project Management', 'Field Operations'],
    description: 'Labor hours by craft code vs budgeted hours. Productivity index by crew.',
  },
  {
    id: 'r4',
    name: 'Safety Incidents',
    folder: 'Safety',
    lastRefreshed: '2026-02-17 23:00',
    sharedWithGroups: ['Safety & Compliance', 'Administrators'],
    description: 'TRIR, DART, and near-miss incidents YTD. Breakdown by type and job site.',
  },
  {
    id: 'r5',
    name: 'Job Profitability',
    folder: 'Financial',
    lastRefreshed: '2026-02-18 06:00',
    sharedWithGroups: ['Administrators'],
    description: 'Gross margin and earned value analysis by job. Projected vs actual margin.',
  },
  {
    id: 'r6',
    name: 'Fleet Hours',
    folder: 'Equipment',
    lastRefreshed: '2026-02-18 08:00',
    sharedWithGroups: ['Administrators', 'Field Operations'],
    description: 'Engine hours, fuel consumption, and maintenance cost per unit. YTD fleet spend.',
  },
]

export const reportFolders = ['Financial', 'Equipment', 'Operations', 'Safety']
