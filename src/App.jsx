import { useMemo, useState } from 'react'
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, Bell, Building2, CalendarDays,
  CheckCircle2, ChevronDown, ClipboardCheck, CloudUpload, FileText, FolderOpen,
  HardHat, LayoutDashboard, Menu, MoreHorizontal, ReceiptText, Search,
  Settings, ShieldCheck, TrendingUp, X,
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import './App.css'

const navItems = [
  ['Overview', LayoutDashboard], ['Schedule', CalendarDays], ['Quality', ClipboardCheck],
  ['Cost', ReceiptText], ['Delivery', TrendingUp], ['Photos', FolderOpen], ['Documents', FileText],
]

const progressData = [
  { month: 'Feb', plan: 7, actual: 6 }, { month: 'Mar', plan: 16, actual: 13 },
  { month: 'Apr', plan: 29, actual: 25 }, { month: 'May', plan: 43, actual: 37 },
  { month: 'Jun', plan: 57, actual: 49 }, { month: 'Jul', plan: 69, actual: 58 },
  { month: 'Aug', plan: 80, actual: 67 }, { month: 'Sep', plan: 91, actual: 78 },
]

const wbs = [
  ['Raw mill foundation', 76, 'healthy'], ['Crusher area', 61, 'watch'],
  ['Kiln section', 42, 'risk'], ['Preheater tower', 54, 'watch'],
]

const issues = [
  { title: 'Foundation pour sequence needs recovery plan', owner: 'Civil team', due: 'Today', level: 'risk' },
  { title: 'Steel erection inspection awaiting sign-off', owner: 'QA/QC', due: '18 Jul', level: 'watch' },
  { title: 'Kiln shell delivery ETA changed by supplier', owner: 'Procurement', due: '19 Jul', level: 'risk' },
]

const milestones = [
  ['M-02', 'Foundation complete', '30 Apr', '08 May', 'Delayed'],
  ['M-03', 'Steel erection 50%', '30 Jun', '12 Jul', 'Watch'],
  ['M-04', 'Mechanical commissioning', '30 Aug', '—', 'Planned'],
  ['M-05', 'Substantial completion', '15 Oct', '18 Nov', 'At risk'],
]

const documents = [
  ['D-241', 'Structural IFC package Rev.04', 'Drawing', '14 Jul 2025', '2.4 MB'],
  ['R-118', 'Weekly progress report 28', 'Report', '12 Jul 2025', '840 KB'],
  ['Q-089', 'Concrete cube test results', 'Quality', '11 Jul 2025', '1.1 MB'],
  ['C-047', 'Vendor delivery schedule', 'Commercial', '10 Jul 2025', '520 KB'],
]

function Status({ children, tone = 'neutral' }) {
  return <span className={`status status--${tone}`}><span aria-hidden="true" />{children}</span>
}

function PageHeading({ eyebrow, title, children }) {
  return <div className="page-heading"><div><p>{eyebrow}</p><h1>{title}</h1></div>{children}</div>
}

function Metric({ icon: Icon, label, value, detail, tone = 'indigo' }) {
  return <section className="metric"><div className={`metric__icon metric__icon--${tone}`}><Icon size={18} /></div><div><p>{label}</p><strong>{value}</strong><span className={tone === 'risk' ? 'negative' : ''}>{detail}</span></div></section>
}

function GanttSnapshot() {
  const activities = [
    ['Raw mill foundations', 3, 31, 'healthy'],
    ['Crusher concrete works', 13, 42, 'watch'],
    ['Steel erection', 27, 48, 'risk'],
    ['Mechanical installation', 46, 33, 'indigo'],
    ['Electrical & instrumentation', 66, 24, 'indigo'],
  ]

  return <section className="panel panel--full gantt-snapshot">
    <div className="panel__header"><div><h2>Gantt chart · key activities</h2><p>Live programme view · February to October 2025</p></div><button className="text-button">Open full schedule <ArrowUpRight size={15}/></button></div>
    <div className="gantt-snapshot__scale"><span>Activity</span><span>Feb</span><span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span></div>
    {activities.map(([label, start, width, tone]) => <div className="gantt-snapshot__row" key={label}><span>{label}</span><div><i className={`gantt-snapshot__bar gantt-snapshot__bar--${tone}`} style={{ marginLeft: `${start}%`, width: `${width}%` }} /></div></div>)}
  </section>
}

function Overview() {
  return <>
    <PageHeading eyebrow="PROJECT CONTROL · NKC-01" title="Project overview">
      <div className="heading-actions"><button className="button button--secondary"><CalendarDays size={16} />14–20 Jul 2025<ChevronDown size={14} /></button><button className="button button--primary"><CloudUpload size={16} />Update report</button></div>
    </PageHeading>
    <div className="metrics-grid metrics-grid--four">
      <Metric icon={TrendingUp} label="Overall progress" value="58.4%" detail="Plan 69.0% · 10.6% behind" tone="risk" />
      <Metric icon={CalendarDays} label="Forecast finish" value="18 Nov" detail="Original contract · 31 Oct" tone="risk" />
      <Metric icon={ReceiptText} label="Cost committed" value="฿ 418.6m" detail="82% of approved budget" tone="indigo" />
      <Metric icon={ShieldCheck} label="Quality closeout" value="86%" detail="4 NCRs need attention" tone="watch" />
    </div>
    <div className="dashboard-grid">
      <section className="panel panel--chart"><div className="panel__header"><div><h2>Progress against plan</h2><p>Physical completion · cumulative %</p></div><div className="legend"><span><i className="legend__plan" />Plan</span><span><i className="legend__actual" />Actual</span></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={progressData} margin={{ top: 12, right: 8, bottom: 0, left: -22 }}><defs><linearGradient id="actualFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3233a3" stopOpacity=".2"/><stop offset="100%" stopColor="#3233a3" stopOpacity="0"/></linearGradient></defs><CartesianGrid vertical={false} stroke="#e4e7ec"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 12 }}/><YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 12 }} tickFormatter={(value) => `${value}%`}/><Tooltip contentStyle={{ border: '1px solid #d9dee8', borderRadius: 10, fontSize: 12 }} formatter={(value) => `${value}%`}/><Area type="monotone" dataKey="plan" stroke="#98a2b3" strokeDasharray="5 5" fill="none" strokeWidth={2}/><Area type="monotone" dataKey="actual" stroke="#3233a3" fill="url(#actualFill)" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></section>
      <section className="panel priority"><div className="panel__header"><div><h2>Priority actions</h2><p>Three items need a decision</p></div><button className="icon-button" aria-label="Priority actions menu"><MoreHorizontal size={19}/></button></div><div className="priority__list">{issues.map((issue) => <button className="priority__item" key={issue.title}><span className={`issue-icon issue-icon--${issue.level}`}>{issue.level === 'risk' ? <AlertTriangle size={15} /> : <ArrowDownRight size={15}/>}</span><span><b>{issue.title}</b><small>{issue.owner} · due {issue.due}</small></span><ArrowUpRight size={16} /></button>)}</div><button className="text-button">View risk register <ArrowUpRight size={15}/></button></section>
      <section className="panel panel--wide"><div className="panel__header"><div><h2>Workstream progress</h2><p>Actual completion by work breakdown structure</p></div><button className="text-button">Open WBS <ArrowUpRight size={15}/></button></div><div className="workstreams">{wbs.map(([label, value, status]) => <div className="workstream" key={label}><div><span>{label}</span><b>{value}%</b></div><div className="progress-track"><i className={`progress-bar progress-bar--${status}`} style={{ width: `${value}%` }} /></div></div>)}</div></section>
      <section className="panel"><div className="panel__header"><div><h2>Milestones</h2><p>Contractual dates and forecast</p></div><button className="icon-button" aria-label="Milestones menu"><MoreHorizontal size={19}/></button></div><div className="milestone-list">{milestones.slice(0, 3).map(([id, name, plan, actual, status]) => <div className="milestone" key={id}><span className="milestone__date">{actual}</span><span><b>{name}</b><small>Plan {plan}</small></span><Status tone={status === 'Delayed' ? 'risk' : status === 'Watch' ? 'watch' : 'neutral'}>{status}</Status></div>)}</div></section>
      <GanttSnapshot />
    </div>
  </>
}

function Schedule() {
  return <><PageHeading eyebrow="PROJECT CONTROL · SCHEDULE" title="Schedule recovery"><div className="heading-actions"><button className="button button--secondary">Baseline Rev. 7<ChevronDown size={14}/></button><button className="button button--primary">Export PDF</button></div></PageHeading><div className="schedule-summary"><Metric icon={CalendarDays} label="Forecast finish" value="18 Nov" detail="18 days beyond contract" tone="risk"/><Metric icon={AlertTriangle} label="Critical activities" value="12" detail="3 require recovery plans" tone="watch"/></div><section className="panel gantt"><div className="panel__header"><div><h2>Master activity timeline</h2><p>July through November 2025</p></div><Status tone="risk">Critical path</Status></div><div className="gantt__months"><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span></div>{['Civil works', 'Steel erection', 'Equipment installation', 'Electrical & instrumentation', 'Commissioning'].map((task, index) => <div className="gantt__row" key={task}><span>{task}</span><div className="gantt__track"><i className={`gantt__bar gantt__bar--${index === 1 || index === 3 ? 'risk' : 'indigo'}`} style={{ marginLeft: `${index * 10 + 4}%`, width: `${42 - index * 3}%` }} /></div></div>)}</section></>
}

function WorkList({ title, subtitle, kind }) {
  const rows = kind === 'Quality' ? [['NCR-024', 'Honeycombing at crusher foundation', 'Open', 'risk'], ['NCR-023', 'Rebar cover at PG-08', 'Awaiting verification', 'watch'], ['NCR-019', 'Grout cube strength results', 'Closed', 'healthy']] : [['INV-084', 'Concrete subcontractor certificate', '฿ 12.4m', 'watch'], ['INV-083', 'Structural steel delivery', '฿ 8.9m', 'healthy'], ['INV-082', 'Mechanical equipment advance', '฿ 24.0m', 'risk']]
  return <><PageHeading eyebrow={`PROJECT CONTROL · ${kind.toUpperCase()}`} title={title}><button className="button button--primary">{kind === 'Quality' ? 'Create NCR' : 'Add cost item'}</button></PageHeading><div className="filter-row"><div className="search-field"><Search size={16}/><input aria-label={`Search ${kind.toLowerCase()}`} placeholder={`Search ${kind.toLowerCase()} records`} /></div><button className="button button--secondary">All status<ChevronDown size={14}/></button><button className="button button--secondary">This month<ChevronDown size={14}/></button></div><section className="panel table-panel"><div className="panel__header"><div><h2>{subtitle}</h2><p>{rows.length} records shown · updated today</p></div><button className="text-button">View all <ArrowUpRight size={15}/></button></div><div className="table-scroll"><table><thead><tr><th>Reference</th><th>Description</th><th>{kind === 'Quality' ? 'Disposition' : 'Committed value'}</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{rows.map(([ref, desc, value, tone]) => <tr key={ref}><td><b>{ref}</b></td><td>{desc}</td><td>{value}</td><td><Status tone={tone}>{tone === 'risk' ? 'Action required' : tone === 'watch' ? 'Under review' : 'On track'}</Status></td><td><button className="icon-button" aria-label={`Open ${ref}`}><ArrowUpRight size={16}/></button></td></tr>)}</tbody></table></div></section></>
}

function Delivery() {
  const data = [{ name: 'Jul', onTime: 12, delayed: 3 }, { name: 'Aug', onTime: 15, delayed: 4 }, { name: 'Sep', onTime: 11, delayed: 6 }, { name: 'Oct', onTime: 9, delayed: 5 }]
  return <><PageHeading eyebrow="PROJECT CONTROL · DELIVERY" title="Delivery readiness"><button className="button button--primary">Add delivery</button></PageHeading><div className="dashboard-grid delivery-grid"><section className="panel panel--chart"><div className="panel__header"><div><h2>Package readiness</h2><p>Planned delivery packages</p></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid vertical={false} stroke="#e4e7ec"/><XAxis dataKey="name" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip cursor={{ fill: '#f4f6fa' }}/><Bar dataKey="onTime" stackId="a" fill="#15966b" radius={[4,4,0,0]}/><Bar dataKey="delayed" stackId="a" fill="#ee6c4d" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div></section><section className="panel"><div className="panel__header"><div><h2>Supplier watchlist</h2><p>Items with delivery exposure</p></div></div><div className="priority__list">{issues.map((item) => <button className="priority__item" key={item.title}><span className="issue-icon issue-icon--watch"><Building2 size={15}/></span><span><b>{item.title.replace('needs recovery plan', 'supplier exposure')}</b><small>Last reviewed today</small></span><ArrowUpRight size={16}/></button>)}</div></section></div></>
}

function Photos() {
  const [uploaded, setUploaded] = useState(0)
  return <><PageHeading eyebrow="PROJECT CONTROL · PHOTOS" title="Site photo register"><label className="button button--primary"><CloudUpload size={16}/>Upload photos<input className="visually-hidden" type="file" accept="image/*" multiple onChange={(event) => setUploaded(event.target.files.length)} /></label></PageHeading>{uploaded > 0 && <div className="notice"><CheckCircle2 size={17}/>{uploaded} photo{uploaded > 1 ? 's' : ''} queued locally for this mockup.</div>}<div className="photo-grid">{['Crusher area', 'Raw mill foundation', 'Kiln section', 'Preheater tower', 'Electrical substation', 'Site logistics'].map((name, index) => <article className="photo-tile" key={name}><div className={`photo-tile__visual photo-tile__visual--${index % 3}`}><HardHat size={30}/><span>{index + 12} Jul</span></div><div><h2>{name}</h2><p>Latest site progress record</p></div></article>)}</div></>
}

function Documents() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => documents.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  return <><PageHeading eyebrow="PROJECT CONTROL · DOCUMENTS" title="Document control"><label className="button button--primary"><CloudUpload size={16}/>Upload document<input className="visually-hidden" type="file" onChange={() => {}} /></label></PageHeading><div className="filter-row"><div className="search-field"><Search size={16}/><input aria-label="Search documents" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or reference" /></div><button className="button button--secondary">All types<ChevronDown size={14}/></button></div><section className="panel table-panel"><div className="table-scroll"><table><thead><tr><th>Reference</th><th>Document</th><th>Type</th><th>Updated</th><th>Size</th><th aria-label="Actions" /></tr></thead><tbody>{filtered.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{index === 0 ? <b>{cell}</b> : cell}</td>)}<td><button className="icon-button" aria-label={`Open ${row[0]}`}><ArrowUpRight size={16}/></button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state"><FileText size={28}/><b>No documents match “{query}”</b><span>Try a different name, reference, or document type.</span></div>}</div></section></>
}

function App() {
  const [active, setActive] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const page = active === 'Overview' ? <Overview/> : active === 'Schedule' ? <Schedule/> : active === 'Quality' ? <WorkList kind="Quality" title="Quality control" subtitle="Non-conformance register"/> : active === 'Cost' ? <WorkList kind="Cost" title="Cost control" subtitle="Current cost commitments"/> : active === 'Delivery' ? <Delivery/> : active === 'Photos' ? <Photos/> : <Documents/>
  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}><div className="brand"><div className="brand__mark">E</div><span>EPS<span>control</span></span><button className="mobile-close icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X/></button></div><nav aria-label="Project navigation"><p>PROJECT WORKSPACE</p>{navItems.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-item nav-item--active' : 'nav-item'} onClick={() => { setActive(label); setMenuOpen(false) }}><Icon size={18}/><span>{label}</span></button>)}</nav><div className="sidebar__footer"><button className="nav-item"><Settings size={18}/><span>Settings</span></button><div className="account"><span className="avatar">PN</span><span><b>Pat N.</b><small>Project manager</small></span><ChevronDown size={15}/></div></div></aside><div className="app-content"><header className="topbar"><button className="mobile-menu icon-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu/></button><button className="project-selector"><span className="project-selector__icon"><Building2 size={17}/></span><span><b>Nong Khae Cement Works</b><small>NKC-01 · Active project</small></span><ChevronDown size={15}/></button><div className="topbar__right"><div className="global-search"><Search size={17}/><input placeholder="Search project" aria-label="Search project"/><kbd>⌘ K</kbd></div><button className="icon-button badge-button" aria-label="Notifications"><Bell size={18}/><i/></button><span className="avatar avatar--top">PN</span></div></header><main id="main-content" className="main-content">{page}</main></div></div>
}

export default App
