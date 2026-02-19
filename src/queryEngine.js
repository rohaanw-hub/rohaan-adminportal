import { projects, getSummary } from "./data/projects.js";

const fmt = {
  currency: (n) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : `$${(n / 1_000).toFixed(0)}K`,
  pct: (n) => `${n}%`,
  num: (n) => n.toLocaleString(),
};

// Find a project by partial name match
function findProject(text) {
  const lower = text.toLowerCase();
  return projects.find(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.id.toLowerCase().includes(lower) ||
      (lower.includes("riverside") && p.id === "P001") ||
      (lower.includes("northgate") && p.id === "P002") ||
      (lower.includes("eastside") && p.id === "P003") ||
      (lower.includes("water treatment") && p.id === "P003") ||
      (lower.includes("summit") && p.id === "P004") ||
      (lower.includes("warehouse") && p.id === "P004")
  );
}

function matchesAny(text, ...keywords) {
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

// ─── Response Builders ────────────────────────────────────────────────────────

function budgetResponse(project) {
  const b = project.budget;
  const pctSpent = Math.round((b.spent / b.total) * 100);
  const variance = b.forecast - b.total;
  const varStr =
    variance > 0
      ? `**${fmt.currency(variance)} over budget** (forecast)`
      : variance < 0
      ? `**${fmt.currency(Math.abs(variance))} under budget** (forecast)`
      : "**on budget**";

  return `**Budget — ${project.name}**

| Item | Amount |
|------|--------|
| Total Budget | ${fmt.currency(b.total)} |
| Spent to Date | ${fmt.currency(b.spent)} (${pctSpent}%) |
| Committed | ${fmt.currency(b.committed)} |
| Remaining | ${fmt.currency(b.remaining)} |
| Forecast at Completion | ${fmt.currency(b.forecast)} |

The project is currently ${varStr}.`;
}

function scheduleResponse(project) {
  const s = project.schedule;
  const milestoneLines = project.schedule.milestones
    .map((m) => {
      const icon =
        m.status === "Complete"
          ? "✓"
          : m.status.includes("Late") || m.status.includes("Complete - Late")
          ? "✓ (late)"
          : m.status === "Behind" || m.status.includes("Behind")
          ? "⚠"
          : m.status === "At Risk"
          ? "⚠"
          : m.status === "Ahead" || m.status.includes("Early")
          ? "↑"
          : "→";
      const date = m.actualDate
        ? `Completed ${m.actualDate}`
        : `Planned ${m.plannedDate}`;
      return `| ${icon} ${m.name} | ${date} | ${m.status} |`;
    })
    .join("\n");

  return `**Schedule — ${project.name}**

- **Status:** ${project.status}
- **Completion:** ${project.completionPct}%
- **Elapsed:** ${s.elapsedDays} of ${s.plannedDays} days
- **Remaining:** ${s.remainingDays} days

**Critical Path Activities:** ${s.criticalActivities.join("; ")}

**Milestones:**
| Milestone | Date | Status |
|-----------|------|--------|
${milestoneLines}`;
}

function laborResponse(project) {
  const l = project.labor;
  const pctComplete = Math.round((l.totalHoursWorked / l.totalHoursBudgeted) * 100);
  const crewLines = l.crew
    .map((c) => `| ${c.trade} | ${c.headcount} | ${fmt.num(c.hoursThisWeek)} |`)
    .join("\n");

  const prodLabel =
    l.productivity >= 1.05
      ? "above plan"
      : l.productivity <= 0.95
      ? "below plan"
      : "on plan";

  return `**Labor — ${project.name}**

| Metric | Value |
|--------|-------|
| Hours Budgeted | ${fmt.num(l.totalHoursBudgeted)} |
| Hours Worked | ${fmt.num(l.totalHoursWorked)} (${pctComplete}%) |
| This Week | ${fmt.num(l.thisWeekHours)} hrs |
| Overtime YTD | ${fmt.num(l.overtimeHoursYTD)} hrs |
| Productivity Factor | ${l.productivity.toFixed(2)} (${prodLabel}) |

**Crew by Trade (this week):**
| Trade | Headcount | Hours |
|-------|-----------|-------|
${crewLines}`;
}

function equipmentResponse(project) {
  const equip = project.equipment;
  const active = equip.filter((e) => e.status === "Active");
  const down = equip.filter((e) => !e.status.startsWith("Active") && !e.status.startsWith("Idle"));
  const idle = equip.filter((e) => e.status === "Idle");
  const avgUtil = Math.round(active.reduce((s, e) => s + e.utilization, 0) / (active.length || 1));

  const lines = equip
    .map((e) => {
      const util = e.status === "Active" ? `${e.utilization}%` : e.status;
      return `| ${e.name} | ${e.type} | ${util} | ${e.hoursThisWeek}h |`;
    })
    .join("\n");

  return `**Equipment — ${project.name}**

- **Total Units:** ${equip.length} (${active.length} active, ${idle.length} idle, ${down.length} down)
- **Average Utilization (active):** ${avgUtil}%

| Equipment | Type | Utilization | This Week |
|-----------|------|-------------|-----------|
${lines}`;
}

function issuesResponse(project) {
  if (project.issues.length === 0) {
    return `**Issues — ${project.name}**\n\nNo open issues. This project is tracking clean.`;
  }
  const lines = project.issues
    .map((i) => `| ${i.severity} | ${i.description} | Opened ${i.openDate} |`)
    .join("\n");

  return `**Issues — ${project.name}**

${project.issues.length} open issue(s):

| Severity | Description | Opened |
|----------|-------------|--------|
${lines}`;
}

function overviewResponse(project) {
  const b = project.budget;
  const l = project.labor;
  const variance = b.forecast - b.total;
  const varStr =
    variance > 0
      ? `${fmt.currency(variance)} over`
      : variance < 0
      ? `${fmt.currency(Math.abs(variance))} under`
      : "on";

  return `**Project Overview — ${project.name}**

**Client:** ${project.client}
**Type:** ${project.type}
**Status:** ${project.status}
**Completion:** ${project.completionPct}%
**Timeline:** ${project.startDate} → ${project.endDate}

| | Budget | Schedule | Labor | Issues |
|-|--------|----------|-------|--------|
| Summary | ${fmt.currency(b.spent)} spent of ${fmt.currency(b.total)} | ${project.status} | ${fmt.num(l.thisWeekHours)} hrs this week | ${project.issues.length} open |

**Forecast:** ${varStr} budget at ${fmt.currency(b.forecast)}
**Critical Path:** ${project.schedule.criticalActivities.join("; ")}`;
}

function costCodeResponse(project) {
  const lines = project.costCodes
    .map((c) => {
      const pct = Math.round((c.actual / c.budgeted) * 100);
      const flag = c.remaining < 0 ? " ⚠" : "";
      return `| ${c.code} | ${c.description} | ${fmt.currency(c.budgeted)} | ${fmt.currency(c.actual)} (${pct}%) | ${fmt.currency(c.remaining)}${flag} |`;
    })
    .join("\n");

  const overBudget = project.costCodes.filter((c) => c.remaining < 0);

  return `**Cost Codes — ${project.name}**

| Code | Description | Budget | Actual | Remaining |
|------|-------------|--------|--------|-----------|
${lines}

${overBudget.length > 0 ? `⚠ **Over budget:** ${overBudget.map((c) => c.description).join(", ")}` : "All cost codes within budget."}`;
}

function portfolioSummaryResponse() {
  const s = getSummary();
  const variance = s.budgetVariance;
  const varStr =
    variance > 0
      ? `${fmt.currency(variance)} over across portfolio`
      : `${fmt.currency(Math.abs(variance))} under across portfolio`;

  const projectLines = projects
    .map(
      (p) =>
        `| ${p.name} | ${p.status} | ${p.completionPct}% | ${fmt.currency(p.budget.spent)}/${fmt.currency(p.budget.total)} | ${p.issues.length} issues |`
    )
    .join("\n");

  return `**Portfolio Summary — All Projects**

**${s.projectCount} Active Projects**

| Project | Status | Complete | Budget (Spent/Total) | Issues |
|---------|--------|----------|----------------------|--------|
${projectLines}

**Portfolio Totals:**
- Total Budget: ${fmt.currency(s.totalBudget)}
- Spent to Date: ${fmt.currency(s.totalSpent)}
- Forecast Variance: ${varStr}
- Labor Hours This Week: ${fmt.num(s.totalThisWeekHours)}
- Avg Equipment Utilization: ${s.avgEquipmentUtilization}%
- Open Issues: ${s.openIssues} (${s.highSeverityIssues} high severity)

**Schedule Health:** ${s.statusCounts.onTrack} on track, ${s.statusCounts.behindSchedule} behind, ${s.statusCounts.aheadOfSchedule} ahead`;
}

function equipmentPortfolioResponse() {
  const allEquip = projects.flatMap((p) =>
    p.equipment.map((e) => ({ ...e, project: p.name }))
  );
  const sorted = [...allEquip].sort((a, b) => b.utilization - a.utilization);
  const down = allEquip.filter((e) => e.status.includes("Down"));
  const idle = allEquip.filter((e) => e.status === "Idle");

  const topLines = sorted
    .slice(0, 5)
    .map((e) => `| ${e.name} | ${e.project} | ${e.utilization}% |`)
    .join("\n");

  return `**Equipment — All Projects**

**${allEquip.length} total units** across ${projects.length} projects

**Top Utilization:**
| Equipment | Project | Utilization |
|-----------|---------|-------------|
${topLines}

**Attention Needed:**
- Down for maintenance: ${down.map((e) => `${e.name} (${e.project})`).join(", ") || "None"}
- Idle units: ${idle.map((e) => `${e.name} (${e.project})`).join(", ") || "None"}

**By Project:**
${projects
  .map((p) => {
    const avg = Math.round(
      p.equipment.filter((e) => e.status === "Active").reduce((s, e) => s + e.utilization, 0) /
        (p.equipment.filter((e) => e.status === "Active").length || 1)
    );
    return `- ${p.name}: ${p.equipment.length} units, ${avg}% avg utilization`;
  })
  .join("\n")}`;
}

function laborPortfolioResponse() {
  const totalLines = projects
    .map((p) => {
      const l = p.labor;
      const prodLabel =
        l.productivity >= 1.05 ? "above" : l.productivity <= 0.95 ? "below" : "on";
      return `| ${p.name} | ${fmt.num(l.thisWeekHours)} | ${fmt.num(l.totalHoursWorked)}/${fmt.num(l.totalHoursBudgeted)} | ${l.productivity.toFixed(2)} (${prodLabel}) |`;
    })
    .join("\n");

  return `**Labor — All Projects**

| Project | Hours This Week | Total Hours (Worked/Budget) | Productivity |
|---------|-----------------|-----------------------------|--------------|
${totalLines}

**Portfolio Labor This Week:** ${fmt.num(getSummary().totalThisWeekHours)} hrs`;
}

function issuesPortfolioResponse() {
  const allIssues = projects.flatMap((p) =>
    p.issues.map((i) => ({ ...i, project: p.name }))
  );

  if (allIssues.length === 0) {
    return "No open issues across the portfolio.";
  }

  const lines = allIssues
    .sort((a, b) => (a.severity === "High" ? -1 : 1))
    .map((i) => `| ${i.severity} | ${i.project} | ${i.description} |`)
    .join("\n");

  return `**Open Issues — All Projects**

${allIssues.length} open issue(s) (${allIssues.filter((i) => i.severity === "High").length} high severity)

| Severity | Project | Description |
|----------|---------|-------------|
${lines}`;
}

function helpResponse() {
  return `**What can I help you with?**

I can answer questions about your construction projects. Try asking:

**Portfolio-level:**
- "Give me a portfolio summary"
- "Which projects are behind schedule?"
- "Show me all open issues"
- "How is equipment utilization across projects?"

**Project-specific:**
- "What's the budget status for Riverside Highway?"
- "Show me the schedule for Northgate Commercial"
- "How many labor hours has the water treatment plant logged?"
- "What equipment is on the Summit warehouse?"
- "Are there any cost codes over budget on Eastside?"

**Current projects:** Riverside Highway Expansion, Northgate Commercial Complex, Eastside Water Treatment Plant, Summit Industrial Warehouse`;
}

// ─── Main Query Function ──────────────────────────────────────────────────────

export function query(input) {
  const text = input.trim();
  if (!text) return "Please type a question about your construction projects.";

  const lower = text.toLowerCase();

  // Greetings
  if (matchesAny(lower, "hello", "hi ", "hey", "howdy")) {
    return `Hello! I'm your construction project assistant. Ask me about budgets, schedules, labor, equipment, or issues across your projects.\n\n${helpResponse()}`;
  }

  // Help
  if (matchesAny(lower, "help", "what can you", "what do you", "capabilities", "how to use")) {
    return helpResponse();
  }

  // ── Portfolio-level queries (no specific project) ──────────────────────────
  const isPortfolio =
    matchesAny(lower, "all projects", "portfolio", "overall", "across") ||
    (!findProject(lower) && matchesAny(lower, "summary", "overview", "status"));

  if (isPortfolio || matchesAny(lower, "summary", "overview") && !findProject(lower)) {
    if (matchesAny(lower, "equip", "machine", "fleet", "crane", "excavator", "dozer")) {
      return equipmentPortfolioResponse();
    }
    if (matchesAny(lower, "labor", "hours", "crew", "workers", "workforce", "headcount")) {
      return laborPortfolioResponse();
    }
    if (matchesAny(lower, "issue", "problem", "risk", "concern", "behind")) {
      return issuesPortfolioResponse();
    }
    return portfolioSummaryResponse();
  }

  // Which / what projects are [status]?
  if (matchesAny(lower, "which project", "what project")) {
    if (matchesAny(lower, "behind", "late", "delay")) {
      const behind = projects.filter((p) => p.status === "Behind Schedule");
      if (behind.length === 0) return "No projects are currently behind schedule.";
      return `**Projects Behind Schedule:**\n\n${behind.map((p) => `- **${p.name}** — ${p.completionPct}% complete. Issues: ${p.issues.map((i) => i.description).join("; ") || "None logged"}`).join("\n")}`;
    }
    if (matchesAny(lower, "on track", "on schedule")) {
      const onTrack = projects.filter((p) => p.status === "On Track");
      return `**Projects On Track:**\n\n${onTrack.map((p) => `- **${p.name}** (${p.completionPct}% complete)`).join("\n")}`;
    }
    if (matchesAny(lower, "ahead", "early")) {
      const ahead = projects.filter((p) => p.status === "Ahead of Schedule");
      return `**Projects Ahead of Schedule:**\n\n${ahead.map((p) => `- **${p.name}** (${p.completionPct}% complete)`).join("\n")}`;
    }
    if (matchesAny(lower, "over budget", "overrun")) {
      const over = projects.filter((p) => p.budget.forecast > p.budget.total);
      if (over.length === 0) return "No projects are currently forecast to be over budget.";
      return `**Projects Forecast Over Budget:**\n\n${over.map((p) => `- **${p.name}** — ${fmt.currency(p.budget.forecast - p.budget.total)} over (${fmt.currency(p.budget.forecast)} forecast vs ${fmt.currency(p.budget.total)} budget)`).join("\n")}`;
    }
  }

  // ── Single-project queries ─────────────────────────────────────────────────
  const project = findProject(lower);

  if (!project) {
    // Try to match by intent without a specific project
    if (matchesAny(lower, "budget", "spend", "cost", "financial", "money", "dollar")) {
      return `Here's the budget status across all projects:\n\n${projects.map((p) => `- **${p.name}**: ${fmt.currency(p.budget.spent)} spent of ${fmt.currency(p.budget.total)} (${Math.round((p.budget.spent / p.budget.total) * 100)}%) — forecast ${fmt.currency(p.budget.forecast)}`).join("\n")}`;
    }
    if (matchesAny(lower, "schedule", "milestone", "completion")) {
      return `**Schedule Status — All Projects:**\n\n${projects.map((p) => `- **${p.name}**: ${p.status} (${p.completionPct}% complete)\n  Critical: ${p.schedule.criticalActivities.join("; ")}`).join("\n\n")}`;
    }
    if (matchesAny(lower, "labor", "hours", "crew", "worker")) {
      return laborPortfolioResponse();
    }
    if (matchesAny(lower, "equip", "machine", "fleet")) {
      return equipmentPortfolioResponse();
    }
    if (matchesAny(lower, "issue", "problem", "risk")) {
      return issuesPortfolioResponse();
    }
    return `I couldn't identify a specific project in your question. Our active projects are:\n\n${projects.map((p) => `- **${p.name}** (${p.status})`).join("\n")}\n\nTry asking about one of these, or ask for a portfolio summary.`;
  }

  // Route to specific data category
  if (matchesAny(lower, "budget", "spend", "cost", "financial", "money", "dollar", "over budget", "forecast")) {
    return budgetResponse(project);
  }
  if (matchesAny(lower, "cost code", "cost codes", "cost breakdown", "line item")) {
    return costCodeResponse(project);
  }
  if (matchesAny(lower, "schedule", "milestone", "timeline", "on track", "behind", "ahead", "delay", "critical path", "date")) {
    return scheduleResponse(project);
  }
  if (matchesAny(lower, "labor", "hours", "crew", "worker", "headcount", "staffing", "overtime", "productivity")) {
    return laborResponse(project);
  }
  if (matchesAny(lower, "equip", "machine", "fleet", "crane", "excavator", "dozer", "utilization", "unit")) {
    return equipmentResponse(project);
  }
  if (matchesAny(lower, "issue", "problem", "risk", "concern", "flag")) {
    return issuesResponse(project);
  }

  // Default: project overview
  return overviewResponse(project);
}
