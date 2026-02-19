import { useState } from 'react'
import {
  BarChart3, Download, Share2, RefreshCw, Filter, ChevronRight, ChevronDown, FileText, Users, Clock
} from 'lucide-react'
import { reports, reportFolders } from '@/data/insights'
import { Report } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// A simple mock chart SVG
function MockChart({ type }: { type: 'bar' | 'line' | 'pie' }) {
  if (type === 'bar') return (
    <svg viewBox="0 0 400 200" className="w-full h-48 text-[#0f2137]">
      {[80, 120, 90, 160, 110, 140, 100].map((h, i) => (
        <rect key={i} x={20 + i * 52} y={200 - h} width={36} height={h}
          fill={i % 2 === 0 ? '#0f2137' : '#f59e0b'} rx="2" opacity="0.8" />
      ))}
      <line x1="10" y1="198" x2="390" y2="198" stroke="#e5e7eb" strokeWidth="1" />
      {[0, 50, 100, 150, 200].map(y => (
        <line key={y} x1="10" y1={200 - y} x2="390" y2={200 - y} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4,4" />
      ))}
    </svg>
  )
  if (type === 'line') return (
    <svg viewBox="0 0 400 200" className="w-full h-48">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2137" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0f2137" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points="20,160 80,130 140,90 200,110 260,70 320,50 380,80"
        fill="none" stroke="#0f2137" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="20,160 80,130 140,90 200,110 260,70 320,50 380,80 380,198 20,198"
        fill="url(#lineGrad)" />
      <polyline points="20,140 80,150 140,110 200,130 260,90 320,70 380,100"
        fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" strokeLinejoin="round" />
      {[20, 80, 140, 200, 260, 320, 380].map((x, i) => (
        <circle key={i} cx={x} cy={[160,130,90,110,70,50,80][i]} r="3" fill="#0f2137" />
      ))}
      <line x1="10" y1="198" x2="390" y2="198" stroke="#e5e7eb" strokeWidth="1" />
    </svg>
  )
  // pie
  return (
    <svg viewBox="0 0 200 200" className="w-full h-48">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#0f2137" strokeWidth="50" strokeDasharray="200 300" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" strokeWidth="50" strokeDasharray="100 400" strokeDashoffset="-200" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="50" strokeDasharray="60 440" strokeDashoffset="-300" />
      <circle cx="100" cy="100" r="55" fill="white" />
      <text x="100" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f2137">67%</text>
    </svg>
  )
}

const CHART_TYPES: Record<string, 'bar' | 'line' | 'pie'> = {
  r1: 'bar', r2: 'pie', r3: 'line', r4: 'bar', r5: 'bar', r6: 'line',
}

export function Insights() {
  const [activeReport, setActiveReport] = useState<Report>(reports[0])
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(reportFolders))
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => {
      const next = new Set(prev)
      next.has(folder) ? next.delete(folder) : next.add(folder)
      return next
    })
  }

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Left panel — report library */}
      <aside className="w-56 shrink-0 border-r bg-white flex flex-col overflow-y-auto">
        <div className="px-4 py-3 border-b">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Report Library</div>
        </div>
        <nav className="py-2">
          {reportFolders.map(folder => {
            const folderReports = reports.filter(r => r.folder === folder)
            const isOpen = openFolders.has(folder)
            return (
              <div key={folder}>
                <button
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  onClick={() => toggleFolder(folder)}
                >
                  {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-gray-400" /> : <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
                  {folder}
                </button>
                {isOpen && (
                  <div className="ml-5">
                    {folderReports.map(report => (
                      <button
                        key={report.id}
                        onClick={() => setActiveReport(report)}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                          activeReport.id === report.id
                            ? 'bg-[#0f2137] text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate text-left">{report.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>

      {/* Main report area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Report toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b bg-white shrink-0">
          <div>
            <h2 className="font-semibold text-gray-900">{activeReport.name}</h2>
            <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />Last refreshed: {activeReport.lastRefreshed}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />Shared with {activeReport.sharedWithGroups.length} groups
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setFiltersOpen(p => !p)}>
              <Filter className="h-4 w-4 mr-1.5" />Filters
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1.5" />Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1.5" />Share
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-1.5" />Export
            </Button>
          </div>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="border-b bg-gray-50 px-5 py-3 flex items-center gap-4 shrink-0">
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            {['Date Range', 'Job', 'Business Unit', 'Cost Code'].map(f => (
              <select key={f} className="text-sm border rounded-md px-2 py-1 bg-white">
                <option>{f}: All</option>
              </select>
            ))}
            <button className="text-xs text-blue-600 hover:underline">Clear all</button>
          </div>
        )}

        {/* Report viewer */}
        <div className="flex-1 overflow-auto p-5 bg-gray-100">
          <div className="bg-white rounded-lg border shadow-sm">
            {/* PowerBI-style chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b bg-gray-50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700">{activeReport.name}</span>
                <Badge variant="secondary" className="text-xs">Report Viewer</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>HCSS Insights</span>
                <span>·</span>
                <span>{activeReport.folder}</span>
              </div>
            </div>

            {/* Kpi tiles */}
            <div className="grid grid-cols-4 gap-4 p-5 border-b">
              {[
                { label: 'Total Budget', value: '$12.4M', delta: '' },
                { label: 'Actual to Date', value: '$8.7M', delta: '70.2%' },
                { label: 'Variance', value: '-$320K', delta: '-2.6%' },
                { label: 'Forecasted EAC', value: '$13.1M', delta: '' },
              ].map(kpi => (
                <div key={kpi.label} className="rounded-lg border p-4">
                  <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
                  <div className="text-xl font-bold text-[#0f2137]">{kpi.value}</div>
                  {kpi.delta && <div className="text-xs text-amber-600 mt-0.5">{kpi.delta} of budget</div>}
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-5 p-5">
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Budget vs Actual by Month</div>
                <MockChart type={CHART_TYPES[activeReport.id] ?? 'bar'} />
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-[#0f2137]" />Budget</span>
                  <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-amber-400" />Actual</span>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Trend — Last 6 Months</div>
                <MockChart type="line" />
              </div>
            </div>

            {/* Detail table */}
            <div className="px-5 pb-5">
              <div className="text-sm font-medium text-gray-700 mb-3">Detail by Job</div>
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    {['Job', 'Budget', 'Actual', 'Variance', '% Complete'].map(h => (
                      <th key={h} className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Riverside HWY', '$12,450,000', '$8,710,000', '-$42,000', '70%'],
                    ['Eastside WT Plant', '$8,200,000', '$3,150,000', '+$180,000', '38%'],
                    ['Northgate Dev', '$5,750,000', '$1,820,000', '-$95,000', '32%'],
                    ['I-10 Service Rd', '$3,100,000', '$920,000', '+$60,000', '30%'],
                  ].map(row => (
                    <tr key={row[0]} className="hover:bg-gray-50">
                      {row.map((cell, i) => (
                        <td key={i} className={`px-4 py-2.5 ${i === 3 ? (cell.startsWith('+') ? 'text-green-600' : 'text-red-600') : ''}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
