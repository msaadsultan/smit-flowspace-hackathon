import { useState } from 'react'
import { ChevronDown, FolderKanban, LayoutDashboard, LogOut, Palette, Plus, Rocket, Settings, Smartphone, Sparkles } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { useDataStore } from '../../store/useDataStore'

const iconMap = { Rocket, Palette, Smartphone, Sparkles, FolderKanban }

export default function Sidebar() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.currentUser)
  const logout = useAuthStore((state) => state.logout)
  const { workspaces, projects, currentWorkspaceId, setCurrentWorkspace } = useDataStore()
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const workspace = workspaces.find((item) => item.id === currentWorkspaceId)
  const WorkspaceIcon = iconMap[workspace?.icon] || Rocket
  const workspaceProjects = projects.filter((project) => project.workspaceId === currentWorkspaceId && !project.archived)

  const openProfile = () => navigate('/settings')

  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-slate-950 text-white lg:flex">
    <button className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-800 px-6 text-left" aria-label="Go to dashboard" onClick={() => navigate('/dashboard')}><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-950/40"><Rocket size={19} /></span><span className="text-lg font-bold tracking-tight">FlowSpace</span></button>
    <div className="relative p-4"><button className="flex w-full items-center gap-3 rounded-xl bg-slate-900 px-3 py-3 text-left transition hover:bg-slate-800" onClick={() => setWorkspaceOpen(!workspaceOpen)}><span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/20 text-indigo-300"><WorkspaceIcon size={17} /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{workspace?.name}</span><span className="block text-[10px] text-slate-500">Workspace</span></span><ChevronDown size={15} className="text-slate-500" /></button>{workspaceOpen && <div className="absolute left-4 right-4 top-[76px] z-20 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-xl">{workspaces.map((item) => { const Icon = iconMap[item.icon] || Rocket; return <button key={item.id} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-200 hover:bg-slate-800" onClick={() => { setCurrentWorkspace(item.id); setWorkspaceOpen(false) }}><Icon size={15} />{item.name}</button> })}</div>}</div>
    <nav className="flex-1 overflow-y-auto px-3 pb-4"><NavLink to="/dashboard" className={({ isActive }) => `mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}><LayoutDashboard size={17} />Overview</NavLink><div className="mb-2 mt-7 flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-600"><span>Projects</span><button className="text-slate-500 hover:text-white" aria-label="Create project"><Plus size={14} /></button></div>{workspaceProjects.map((project) => { const Icon = iconMap[project.icon] || FolderKanban; return <NavLink key={project.id} to={`/projects/${project.id}`} className={({ isActive }) => `mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}><span className="grid h-6 w-6 place-items-center rounded-md bg-white/10"><Icon size={14} /></span><span className="truncate">{project.name}</span></NavLink> })}<NavLink to="/settings" className={({ isActive }) => `mt-7 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}><Settings size={17} />Settings</NavLink></nav>
    <div className="border-t border-slate-800 p-4"><div className="mb-3 flex cursor-pointer items-center gap-3 rounded-lg p-1 transition hover:bg-slate-900" role="button" tabIndex={0} aria-label="Open profile" onClick={openProfile} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openProfile() }}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-xs font-bold text-indigo-700">{user?.avatar || 'FS'}</span><span className="min-w-0"><span className="block truncate text-xs font-semibold">{user?.name}</span><span className="block truncate text-[10px] text-slate-500">{user?.email}</span></span></div><button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 transition hover:bg-slate-900 hover:text-white" onClick={() => { logout(); navigate('/login') }}><LogOut size={14} />Log out</button></div>
  </aside>
}
