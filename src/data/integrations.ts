import { Integration, ApiCredential, Webhook, EventLog } from '@/types'

export const integrations: Integration[] = [
  { id: 'int1', name: 'Vista by Viewpoint', category: 'ERP', status: 'Connected', lastSync: '2026-02-18 08:30', description: 'Bi-directional sync for GL, AP, and job cost data', logo: 'VI' },
  { id: 'int2', name: 'Spectrum Construction', category: 'ERP', status: 'Connected', lastSync: '2026-02-18 07:45', description: 'Job cost, payroll, and equipment integration', logo: 'SP' },
  { id: 'int3', name: 'CMIC', category: 'ERP', status: 'Error', lastSync: '2026-02-17 23:00', description: 'Enterprise project and financial management', logo: 'CM' },
  { id: 'int4', name: 'Sage 300 CRE', category: 'ERP', status: 'Disconnected', lastSync: '2026-01-20 14:00', description: 'Accounting and project management integration', logo: 'S3' },
  { id: 'int5', name: 'Procore', category: 'Project Management', status: 'Connected', lastSync: '2026-02-18 09:00', description: 'Project management, RFIs, and submittals sync', logo: 'PC' },
  { id: 'int6', name: 'Viewpoint Team', category: 'Project Management', status: 'Connected', lastSync: '2026-02-17 18:00', description: 'Field collaboration and document management', logo: 'VT' },
  { id: 'int7', name: 'ADP Workforce Now', category: 'HR', status: 'Connected', lastSync: '2026-02-18 06:00', description: 'Employee records, payroll, and benefits sync', logo: 'AD' },
  { id: 'int8', name: 'Salesforce CRM', category: 'CRM', status: 'Disconnected', lastSync: '2025-12-15 10:00', description: 'Lead and opportunity management for business dev', logo: 'SF' },
  { id: 'int9', name: 'Samsara Telematics', category: 'Telematics', status: 'Connected', lastSync: '2026-02-18 09:15', description: 'GPS tracking, engine hours, and fault codes', logo: 'SA' },
  { id: 'int10', name: 'Trimble Earthworks', category: 'Telematics', status: 'Connected', lastSync: '2026-02-18 08:55', description: 'Machine control and grade data integration', logo: 'TE' },
  { id: 'int11', name: 'QuickBooks Online', category: 'ERP', status: 'Disconnected', lastSync: 'Never', description: 'Small business accounting integration', logo: 'QB' },
  { id: 'int12', name: 'Gusto Payroll', category: 'Payroll', status: 'Disconnected', lastSync: 'Never', description: 'Payroll processing and benefits administration', logo: 'GU' },
]

export const apiCredentials: ApiCredential[] = [
  { id: 'cred1', name: 'Production API Key', clientId: 'hcss_live_4xK9...mR2p', created: '2025-06-01', lastUsed: '2026-02-18', scopes: ['read:jobs', 'write:jobs', 'read:employees', 'write:timecards'], status: 'Active' },
  { id: 'cred2', name: 'Staging / QA Key', clientId: 'hcss_test_7yN3...qA8d', created: '2025-08-15', lastUsed: '2026-02-17', scopes: ['read:jobs', 'read:employees'], status: 'Active' },
  { id: 'cred3', name: 'Vista ERP Connector', clientId: 'hcss_live_2mQ7...vB5s', created: '2025-03-22', lastUsed: '2026-02-18', scopes: ['read:jobs', 'write:costcodes', 'read:gl', 'write:ap'], status: 'Active' },
  { id: 'cred4', name: 'Old Dev Key (deprecated)', clientId: 'hcss_live_9wL1...kZ3f', created: '2024-11-10', lastUsed: '2025-10-30', scopes: ['read:jobs'], status: 'Revoked' },
]

export const webhooks: Webhook[] = [
  { id: 'wh1', endpoint: 'https://erp.acmeconst.com/hcss/timecard-hook', events: ['timecard.submitted', 'timecard.approved'], status: 'Active', lastTriggered: '2026-02-18 07:45', secretMasked: 'whsec_****wQzP' },
  { id: 'wh2', endpoint: 'https://erp.acmeconst.com/hcss/job-hook', events: ['job.created', 'job.updated', 'job.closed'], status: 'Active', lastTriggered: '2026-02-17 14:22', secretMasked: 'whsec_****aR3M' },
  { id: 'wh3', endpoint: 'https://slack.acmeconst.com/safety-alerts', events: ['incident.created', 'inspection.failed'], status: 'Active', lastTriggered: '2026-02-15 09:10', secretMasked: 'whsec_****kL9B' },
  { id: 'wh4', endpoint: 'https://api.staging.acmeconst.com/payroll', events: ['payroll.finalized'], status: 'Failing', lastTriggered: '2026-02-10 18:00', secretMasked: 'whsec_****nT4V' },
  { id: 'wh5', endpoint: 'https://procore.acmeconst.com/hcss-sync', events: ['job.created', 'document.uploaded'], status: 'Active', lastTriggered: '2026-02-18 08:50', secretMasked: 'whsec_****pU6Y' },
  { id: 'wh6', endpoint: 'https://notifications.acmeconst.com/billing', events: ['invoice.created', 'invoice.overdue'], status: 'Paused', lastTriggered: '2026-01-31 23:59', secretMasked: 'whsec_****sX2C' },
]

const now = new Date('2026-02-18T09:00:00')
function minutesAgo(m: number) {
  const d = new Date(now.getTime() - m * 60000)
  return d.toISOString().replace('T', ' ').slice(0, 19)
}

export const eventLogs: EventLog[] = [
  { id: 'el1', timestamp: minutesAgo(2), integration: 'ADP Workforce Now', eventType: 'employee.sync', entity: 'Employee #4421 - T. Castellanos', status: 'Success', details: 'Employee record synced from ADP. 3 fields updated.' },
  { id: 'el2', timestamp: minutesAgo(5), integration: 'Vista by Viewpoint', eventType: 'timecard.export', entity: 'Timecard Batch 2026-02-18', status: 'Success', details: '142 timecard entries exported to Vista GL batch.' },
  { id: 'el3', timestamp: minutesAgo(8), integration: 'Samsara Telematics', eventType: 'equipment.hours', entity: 'CAT 336 Excavator #0042', status: 'Success', details: 'Engine hours updated: 14,882 hrs. Location synced.' },
  { id: 'el4', timestamp: minutesAgo(12), integration: 'Procore', eventType: 'job.sync', entity: 'Job J-2024-087 Riverside HWY', status: 'Success', details: 'Project data synced to Procore. 2 RFIs imported.' },
  { id: 'el5', timestamp: minutesAgo(15), integration: 'CMIC', eventType: 'costcode.import', entity: 'Job J-2024-092', status: 'Error', details: 'Authentication failed: token expired. Retrying in 15 min.' },
  { id: 'el6', timestamp: minutesAgo(22), integration: 'Vista by Viewpoint', eventType: 'ap.invoice', entity: 'Invoice INV-V-44291', status: 'Success', details: 'AP invoice imported from Vista. Amount: $24,550.00' },
  { id: 'el7', timestamp: minutesAgo(30), integration: 'ADP Workforce Now', eventType: 'payroll.sync', entity: 'Pay Period 2026-02-15', status: 'Warning', details: '3 employees missing craft codes. Partial sync completed.' },
  { id: 'el8', timestamp: minutesAgo(45), integration: 'Trimble Earthworks', eventType: 'equipment.grade', entity: 'CAT D8T Dozer #0018', status: 'Success', details: 'Grade data updated for 4 passes on Segment 7B.' },
  { id: 'el9', timestamp: minutesAgo(60), integration: 'Samsara Telematics', eventType: 'fault.code', entity: 'Volvo EC220 Excavator #0031', status: 'Warning', details: 'DTC P0128 detected. Alert sent to equipment manager.' },
  { id: 'el10', timestamp: minutesAgo(75), integration: 'Procore', eventType: 'document.upload', entity: 'Drawing REV-C Site Plan', status: 'Success', details: 'Document uploaded to Procore project library.' },
  { id: 'el11', timestamp: minutesAgo(90), integration: 'Vista by Viewpoint', eventType: 'job.cost', entity: 'Job J-2024-087', status: 'Success', details: 'Job cost data synced. 18 cost codes updated.' },
  { id: 'el12', timestamp: minutesAgo(110), integration: 'CMIC', eventType: 'employee.sync', entity: 'Batch Employee Sync', status: 'Error', details: 'Connection timeout after 30s. 0 records synced.' },
  { id: 'el13', timestamp: minutesAgo(130), integration: 'ADP Workforce Now', eventType: 'benefits.sync', entity: 'Open Enrollment 2026', status: 'Success', details: 'Benefits elections imported for 38 employees.' },
  { id: 'el14', timestamp: minutesAgo(150), integration: 'Samsara Telematics', eventType: 'geofence.event', entity: 'Job Site Eastside WT', status: 'Success', details: 'CAT 336 entered job site geofence at 06:42.' },
  { id: 'el15', timestamp: minutesAgo(180), integration: 'Vista by Viewpoint', eventType: 'gl.export', entity: 'GL Batch February', status: 'Success', details: '284 GL entries exported. Batch balanced.' },
  { id: 'el16', timestamp: minutesAgo(210), integration: 'Procore', eventType: 'submittal.import', entity: 'Submittal SUB-044', status: 'Success', details: 'Approved submittal imported from Procore.' },
  { id: 'el17', timestamp: minutesAgo(240), integration: 'CMIC', eventType: 'costcode.import', entity: 'Job J-2024-101', status: 'Error', details: 'Schema mismatch on field "cost_class". Expected string, got integer.' },
  { id: 'el18', timestamp: minutesAgo(280), integration: 'Trimble Earthworks', eventType: 'survey.import', entity: 'Survey 2026-02-17-AM', status: 'Success', details: 'As-built survey data imported for Segment 12A.' },
  { id: 'el19', timestamp: minutesAgo(320), integration: 'ADP Workforce Now', eventType: 'timecard.validate', entity: 'Pay Period 2026-02-08', status: 'Success', details: 'Payroll validation complete. No discrepancies found.' },
  { id: 'el20', timestamp: minutesAgo(360), integration: 'Samsara Telematics', eventType: 'fuel.sync', entity: 'Fleet Fuel Report', status: 'Success', details: 'Fuel consumption data synced for 22 assets.' },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `el${21 + i}`,
    timestamp: minutesAgo(400 + i * 15),
    integration: ['Vista by Viewpoint', 'ADP Workforce Now', 'Samsara Telematics', 'Procore', 'Trimble Earthworks'][i % 5],
    eventType: ['timecard.export', 'employee.sync', 'equipment.hours', 'job.sync', 'document.upload'][i % 5],
    entity: `Entity ref ${i + 1}`,
    status: (i % 7 === 0 ? 'Error' : i % 5 === 0 ? 'Warning' : 'Success') as 'Success' | 'Warning' | 'Error',
    details: `Automated sync operation completed. Record ID: REF-${10000 + i}`,
  })),
]

export const errorLogs: EventLog[] = eventLogs.filter(e => e.status === 'Error').concat([
  { id: 'err_extra1', timestamp: minutesAgo(500), integration: 'CMIC', eventType: 'auth.failure', entity: 'OAuth Token Refresh', status: 'Error', details: 'Stack: Error: invalid_grant\n  at TokenClient.refresh (oauth.js:142)\n  at IntegrationRunner.run (runner.js:88)' },
  { id: 'err_extra2', timestamp: minutesAgo(600), integration: 'Sage 300 CRE', eventType: 'connection.failed', entity: 'ODBC Connection', status: 'Error', details: 'Stack: ODBC Error [08001] TCP/IP Connection to host 192.168.4.22 failed.\n  Connection attempt timed out after 30000ms.' },
])
