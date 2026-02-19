// Mock construction project data

export const projects = [
  {
    id: "P001",
    name: "Riverside Highway Expansion",
    client: "State DOT",
    type: "Highway",
    status: "On Track",
    startDate: "2024-03-01",
    endDate: "2026-08-31",
    completionPct: 58,
    budget: {
      total: 42500000,
      spent: 24650000,
      committed: 4800000,
      remaining: 13050000,
      forecast: 43100000,
    },
    schedule: {
      plannedDays: 912,
      elapsedDays: 529,
      remainingDays: 383,
      criticalActivities: ["Subgrade Prep - Section 4", "Bridge Deck Pour - Span 3"],
      milestones: [
        { name: "Grading Complete", plannedDate: "2024-09-15", actualDate: "2024-09-22", status: "Complete" },
        { name: "Base Course Complete", plannedDate: "2025-01-10", actualDate: "2025-01-08", status: "Complete" },
        { name: "Bridge Substructure", plannedDate: "2025-06-30", actualDate: null, status: "On Track" },
        { name: "Asphalt Paving", plannedDate: "2026-02-28", actualDate: null, status: "At Risk" },
        { name: "Final Inspection", plannedDate: "2026-08-01", actualDate: null, status: "On Track" },
      ],
    },
    labor: {
      totalHoursBudgeted: 185000,
      totalHoursWorked: 107300,
      thisWeekHours: 3840,
      overtimeHoursYTD: 8200,
      productivity: 1.03,
      crew: [
        { trade: "Equipment Operators", headcount: 28, hoursThisWeek: 1120 },
        { trade: "Laborers", headcount: 42, hoursThisWeek: 1680 },
        { trade: "Iron Workers", headcount: 18, hoursThisWeek: 720 },
        { trade: "Carpenters", headcount: 8, hoursThisWeek: 320 },
      ],
    },
    equipment: [
      { id: "E101", name: "Cat 390 Excavator", type: "Excavator", utilization: 87, hoursThisWeek: 44, status: "Active" },
      { id: "E102", name: "Komatsu D375 Dozer", type: "Dozer", utilization: 91, hoursThisWeek: 46, status: "Active" },
      { id: "E103", name: "John Deere 872G Motor Grader", type: "Grader", utilization: 72, hoursThisWeek: 36, status: "Active" },
      { id: "E104", name: "Liebherr LTM 1160 Crane", type: "Crane", utilization: 64, hoursThisWeek: 32, status: "Active" },
      { id: "E105", name: "Volvo A60H Articulated Truck", type: "Haul Truck", utilization: 95, hoursThisWeek: 48, status: "Active" },
      { id: "E106", name: "Hamm HD 120i Compactor", type: "Compactor", utilization: 78, hoursThisWeek: 40, status: "Active" },
      { id: "E107", name: "Cat 336 Excavator", type: "Excavator", utilization: 0, hoursThisWeek: 0, status: "Down - Maintenance" },
    ],
    issues: [
      { id: "I01", severity: "High", description: "Asphalt paving section delayed 3 weeks due to utility conflict", openDate: "2025-11-12" },
      { id: "I02", severity: "Low", description: "Minor rework on bridge abutment forming", openDate: "2025-12-03" },
    ],
    costCodes: [
      { code: "CC-100", description: "Earthwork & Grading", budgeted: 8200000, actual: 7950000, remaining: 250000 },
      { code: "CC-200", description: "Drainage & Utilities", budgeted: 5100000, actual: 4200000, remaining: 900000 },
      { code: "CC-300", description: "Bridge Structure", budgeted: 12400000, actual: 6800000, remaining: 5600000 },
      { code: "CC-400", description: "Paving", budgeted: 9800000, actual: 2400000, remaining: 7400000 },
      { code: "CC-500", description: "Signage & Striping", budgeted: 1800000, actual: 0, remaining: 1800000 },
      { code: "CC-600", description: "General Conditions", budgeted: 5200000, actual: 3300000, remaining: 1900000 },
    ],
  },
  {
    id: "P002",
    name: "Northgate Commercial Complex",
    client: "Northgate Developers LLC",
    type: "Commercial Building",
    status: "Behind Schedule",
    startDate: "2024-07-15",
    endDate: "2026-03-31",
    completionPct: 44,
    budget: {
      total: 28700000,
      spent: 12640000,
      committed: 6900000,
      remaining: 9160000,
      forecast: 30200000,
    },
    schedule: {
      plannedDays: 624,
      elapsedDays: 218,
      remainingDays: 406,
      criticalActivities: ["Structural Steel Erection - Tower B", "MEP Rough-In - Floors 4-8"],
      milestones: [
        { name: "Foundation Complete", plannedDate: "2024-10-01", actualDate: "2024-10-18", status: "Complete - Late" },
        { name: "Steel Erection Complete", plannedDate: "2025-02-28", actualDate: null, status: "Behind - 3 weeks" },
        { name: "Envelope Closed", plannedDate: "2025-07-15", actualDate: null, status: "At Risk" },
        { name: "MEP Rough-In", plannedDate: "2025-10-30", actualDate: null, status: "At Risk" },
        { name: "Certificate of Occupancy", plannedDate: "2026-03-01", actualDate: null, status: "At Risk" },
      ],
    },
    labor: {
      totalHoursBudgeted: 142000,
      totalHoursWorked: 62480,
      thisWeekHours: 2960,
      overtimeHoursYTD: 6100,
      productivity: 0.91,
      crew: [
        { trade: "Iron Workers", headcount: 22, hoursThisWeek: 880 },
        { trade: "Carpenters", headcount: 18, hoursThisWeek: 720 },
        { trade: "Electricians", headcount: 14, hoursThisWeek: 560 },
        { trade: "Plumbers", headcount: 10, hoursThisWeek: 400 },
        { trade: "Laborers", headcount: 10, hoursThisWeek: 400 },
      ],
    },
    equipment: [
      { id: "E201", name: "Liebherr 280 EC-H Tower Crane", type: "Tower Crane", utilization: 82, hoursThisWeek: 41, status: "Active" },
      { id: "E202", name: "Manitowoc 18000 Crawler Crane", type: "Crane", utilization: 68, hoursThisWeek: 34, status: "Active" },
      { id: "E203", name: "Cat 320 Excavator", type: "Excavator", utilization: 15, hoursThisWeek: 8, status: "Idle" },
      { id: "E204", name: "JLG 1930ES Scissor Lift", type: "Aerial Lift", utilization: 88, hoursThisWeek: 44, status: "Active" },
      { id: "E205", name: "Skyjack SJ3219 Scissor Lift", type: "Aerial Lift", utilization: 84, hoursThisWeek: 42, status: "Active" },
      { id: "E206", name: "Genie Z-62/40 Boom Lift", type: "Aerial Lift", utilization: 76, hoursThisWeek: 38, status: "Active" },
    ],
    issues: [
      { id: "I03", severity: "High", description: "Steel fabrication delays from supplier — 3-week impact to schedule", openDate: "2025-09-05" },
      { id: "I04", severity: "High", description: "Revised MEP drawings required redesign — additional cost $180K", openDate: "2025-10-22" },
      { id: "I05", severity: "Medium", description: "Concrete pour delayed due to cold weather — 5 days lost", openDate: "2025-12-18" },
    ],
    costCodes: [
      { code: "CC-100", description: "Site Work & Foundation", budgeted: 4200000, actual: 4350000, remaining: -150000 },
      { code: "CC-200", description: "Structural Steel", budgeted: 7800000, actual: 3100000, remaining: 4700000 },
      { code: "CC-300", description: "Envelope & Glazing", budgeted: 5400000, actual: 800000, remaining: 4600000 },
      { code: "CC-400", description: "MEP Systems", budgeted: 6900000, actual: 2400000, remaining: 4500000 },
      { code: "CC-500", description: "Interior Finishes", budgeted: 3200000, actual: 0, remaining: 3200000 },
      { code: "CC-600", description: "General Conditions", budgeted: 1200000, actual: 1990000, remaining: -790000 },
    ],
  },
  {
    id: "P003",
    name: "Eastside Water Treatment Plant",
    client: "Municipal Water Authority",
    type: "Water/Wastewater",
    status: "On Track",
    startDate: "2023-11-01",
    endDate: "2026-10-31",
    completionPct: 71,
    budget: {
      total: 67200000,
      spent: 47700000,
      committed: 8400000,
      remaining: 11100000,
      forecast: 66800000,
    },
    schedule: {
      plannedDays: 1095,
      elapsedDays: 840,
      remainingDays: 255,
      criticalActivities: ["Membrane Bioreactor Installation", "Electrical Switchgear Commissioning"],
      milestones: [
        { name: "Civil/Structural Complete", plannedDate: "2025-04-30", actualDate: "2025-04-25", status: "Complete" },
        { name: "Process Piping Complete", plannedDate: "2025-09-30", actualDate: "2025-10-08", status: "Complete - Late" },
        { name: "Electrical Systems", plannedDate: "2026-03-15", actualDate: null, status: "On Track" },
        { name: "Commissioning Start", plannedDate: "2026-06-01", actualDate: null, status: "On Track" },
        { name: "Substantial Completion", plannedDate: "2026-10-01", actualDate: null, status: "On Track" },
      ],
    },
    labor: {
      totalHoursBudgeted: 310000,
      totalHoursWorked: 220100,
      thisWeekHours: 4480,
      overtimeHoursYTD: 14200,
      productivity: 1.08,
      crew: [
        { trade: "Pipefitters", headcount: 34, hoursThisWeek: 1360 },
        { trade: "Electricians", headcount: 26, hoursThisWeek: 1040 },
        { trade: "Instrumentation Techs", headcount: 16, hoursThisWeek: 640 },
        { trade: "Carpenters", headcount: 8, hoursThisWeek: 320 },
        { trade: "Laborers", headcount: 28, hoursThisWeek: 1120 },
      ],
    },
    equipment: [
      { id: "E301", name: "Cat 349 Excavator", type: "Excavator", utilization: 45, hoursThisWeek: 22, status: "Active" },
      { id: "E302", name: "Grove GMK5150L Crane", type: "Mobile Crane", utilization: 72, hoursThisWeek: 36, status: "Active" },
      { id: "E303", name: "Manitou MRT 2470 Telehandler", type: "Telehandler", utilization: 91, hoursThisWeek: 46, status: "Active" },
      { id: "E304", name: "Genie GTH-1056 Telehandler", type: "Telehandler", utilization: 85, hoursThisWeek: 43, status: "Active" },
      { id: "E305", name: "JLG 1350SJP Boom Lift", type: "Aerial Lift", utilization: 78, hoursThisWeek: 39, status: "Active" },
      { id: "E306", name: "Atlas Copco XAS 375 Air Compressor", type: "Compressor", utilization: 62, hoursThisWeek: 31, status: "Active" },
    ],
    issues: [
      { id: "I06", severity: "Medium", description: "Membrane bioreactor delivery delayed 2 weeks — mitigation plan in place", openDate: "2026-01-08" },
    ],
    costCodes: [
      { code: "CC-100", description: "Civil & Structural", budgeted: 18500000, actual: 18200000, remaining: 300000 },
      { code: "CC-200", description: "Process Piping", budgeted: 14200000, actual: 13900000, remaining: 300000 },
      { code: "CC-300", description: "Electrical & Instrumentation", budgeted: 16800000, actual: 9400000, remaining: 7400000 },
      { code: "CC-400", description: "Process Equipment", budgeted: 12000000, actual: 5100000, remaining: 6900000 },
      { code: "CC-500", description: "General Conditions", budgeted: 5700000, actual: 1100000, remaining: 4600000 },
    ],
  },
  {
    id: "P004",
    name: "Summit Industrial Warehouse",
    client: "Summit Logistics Group",
    type: "Industrial",
    status: "Ahead of Schedule",
    startDate: "2025-01-20",
    endDate: "2025-12-15",
    completionPct: 39,
    budget: {
      total: 14800000,
      spent: 5780000,
      committed: 2900000,
      remaining: 6120000,
      forecast: 14500000,
    },
    schedule: {
      plannedDays: 329,
      elapsedDays: 108,
      remainingDays: 221,
      criticalActivities: ["Precast Panel Erection", "Roof Deck Installation"],
      milestones: [
        { name: "Foundation Complete", plannedDate: "2025-04-01", actualDate: "2025-03-24", status: "Complete - Early" },
        { name: "Steel & Precast Erection", plannedDate: "2025-07-15", actualDate: null, status: "Ahead" },
        { name: "Roof Complete", plannedDate: "2025-08-30", actualDate: null, status: "Ahead" },
        { name: "Interior MEP", plannedDate: "2025-10-31", actualDate: null, status: "On Track" },
        { name: "Substantial Completion", plannedDate: "2025-12-01", actualDate: null, status: "Ahead" },
      ],
    },
    labor: {
      totalHoursBudgeted: 68000,
      totalHoursWorked: 26520,
      thisWeekHours: 2240,
      overtimeHoursYTD: 1800,
      productivity: 1.14,
      crew: [
        { trade: "Iron Workers", headcount: 16, hoursThisWeek: 640 },
        { trade: "Carpenters", headcount: 12, hoursThisWeek: 480 },
        { trade: "Laborers", headcount: 20, hoursThisWeek: 800 },
        { trade: "Equipment Operators", headcount: 8, hoursThisWeek: 320 },
      ],
    },
    equipment: [
      { id: "E401", name: "Liebherr LTM 1300 Mobile Crane", type: "Mobile Crane", utilization: 88, hoursThisWeek: 44, status: "Active" },
      { id: "E402", name: "Cat 320 Excavator", type: "Excavator", utilization: 55, hoursThisWeek: 28, status: "Active" },
      { id: "E403", name: "Pettibone Cary-Lift 144", type: "Forklift", utilization: 80, hoursThisWeek: 40, status: "Active" },
      { id: "E404", name: "Bobcat S650 Skid Steer", type: "Skid Steer", utilization: 72, hoursThisWeek: 36, status: "Active" },
    ],
    issues: [],
    costCodes: [
      { code: "CC-100", description: "Site Work & Foundation", budgeted: 2800000, actual: 2650000, remaining: 150000 },
      { code: "CC-200", description: "Structural Steel & Precast", budgeted: 4900000, actual: 1800000, remaining: 3100000 },
      { code: "CC-300", description: "Roofing & Envelope", budgeted: 2600000, actual: 400000, remaining: 2200000 },
      { code: "CC-400", description: "MEP & Fire Protection", budgeted: 2200000, actual: 600000, remaining: 1600000 },
      { code: "CC-500", description: "Doors, Docks & Finishes", budgeted: 1400000, actual: 180000, remaining: 1220000 },
      { code: "CC-600", description: "General Conditions", budgeted: 900000, actual: 150000, remaining: 750000 },
    ],
  },
];

// Aggregate summary helpers
export const getSummary = () => {
  const totalBudget = projects.reduce((s, p) => s + p.budget.total, 0);
  const totalSpent = projects.reduce((s, p) => s + p.budget.spent, 0);
  const totalForecast = projects.reduce((s, p) => s + p.budget.forecast, 0);
  const totalLaborHoursWorked = projects.reduce((s, p) => s + p.labor.totalHoursWorked, 0);
  const totalLaborHoursBudgeted = projects.reduce((s, p) => s + p.labor.totalHoursBudgeted, 0);
  const totalThisWeekHours = projects.reduce((s, p) => s + p.labor.thisWeekHours, 0);
  const allEquipment = projects.flatMap((p) => p.equipment);
  const avgUtilization = Math.round(
    allEquipment.filter((e) => e.status !== "Down - Maintenance").reduce((s, e) => s + e.utilization, 0) /
      allEquipment.filter((e) => e.status !== "Down - Maintenance").length
  );

  return {
    projectCount: projects.length,
    totalBudget,
    totalSpent,
    totalForecast,
    budgetVariance: totalForecast - totalBudget,
    totalLaborHoursWorked,
    totalLaborHoursBudgeted,
    totalThisWeekHours,
    avgEquipmentUtilization: avgUtilization,
    equipmentCount: allEquipment.length,
    statusCounts: {
      onTrack: projects.filter((p) => p.status === "On Track").length,
      behindSchedule: projects.filter((p) => p.status === "Behind Schedule").length,
      aheadOfSchedule: projects.filter((p) => p.status === "Ahead of Schedule").length,
    },
    openIssues: projects.reduce((s, p) => s + p.issues.length, 0),
    highSeverityIssues: projects.flatMap((p) => p.issues).filter((i) => i.severity === "High").length,
  };
};
