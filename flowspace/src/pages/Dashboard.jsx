import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Clock3, FolderKanban, ListTodo, Plus, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import TaskModal from '../components/tasks/TaskModal'
import { useAuthStore } from '../store/useAuthStore'
import { useDataStore } from '../store/useDataStore'

const projectColors = { indigo: 'bg-indigo-100 text-indigo-700', emerald: 'bg-emerald-100 text-emerald-700', orange: 'bg-orange-100 text-orange-700' }
const progressWidth = (complete, total) => { const ratio = total ? complete / total : 0; if (ratio >= 1) return 'w-full'; if (ratio >= .75) return 'w-3/4'; if (ratio >= .5) return 'w-1/2'; if (ratio > 0) return 'w-1/4'; return 'w-0' }

export default function Dashboard() {
  const user = useAuthStore((state) => state.currentUser)
  const { projects, tasks, currentWorkspaceId } = useDataStore()
  const [modalOpen, setModalOpen] = useState(false)
  const workspaceProjects = projects.filter((project) => project.workspaceId === currentWorkspaceId && !project.archived)
  const workspaceTasks = tasks.filter((task) => workspaceProjects.some((project) => project.id === task.projectId))
  const completed = workspaceTasks.filter((task) => task.status === 'done').length
  const progress = workspaceTasks.filter((task) => task.status === 'in-progress').length

  return <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <Header />
    <main className="min-h-screen px-4 pb-12 pt-24 sm:px-8 lg:ml-64">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Tuesday, September 6</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Good morning, {user?.name?.split(' ')[0] || 'there'}.</h1><p className="mt-3 text-gray-500">Here’s what deserves your attention today.</p></div>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700" onClick={() => setModalOpen(true)}><Plus size={17} />New task</button>
        </div>
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><ListTodo size={20} /></span><TrendingUp size={16} className="text-emerald-500" /></div><p className="mt-6 text-sm font-medium text-gray-500">Total tasks</p><p className="mt-1 text-3xl font-bold text-gray-900">{workspaceTasks.length}</p><p className="mt-1 text-xs text-gray-400">Across your workspace</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600"><Clock3 size={20} /></span><span className="text-xs font-semibold text-amber-600">Active</span></div><p className="mt-6 text-sm font-medium text-gray-500">In progress</p><p className="mt-1 text-3xl font-bold text-gray-900">{progress}</p><p className="mt-1 text-xs text-gray-400">Keep the momentum going</p></div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={20} /></span><span className="text-xs font-semibold text-emerald-600">{workspaceTasks.length ? Math.round((completed / workspaceTasks.length) * 100) : 0}%</span></div><p className="mt-6 text-sm font-medium text-gray-500">Completed</p><p className="mt-1 text-3xl font-bold text-gray-900">{completed}</p><p className="mt-1 text-xs text-gray-400">Tasks shipped</p></div>
        </section>
        <section className="mt-10"><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Your workspace</p><h2 className="mt-1 text-xl font-bold text-gray-900">Projects</h2></div><span className="text-sm text-gray-400">{workspaceProjects.length} active</span></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workspaceProjects.map((project) => { const projectTasks = workspaceTasks.filter((task) => task.projectId === project.id); const done = projectTasks.filter((task) => task.status === 'done').length; return <Link to={`/projects/${project.id}`} key={project.id} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"><div className="flex items-start justify-between"><span className={`grid h-11 w-11 place-items-center rounded-xl ${projectColors[project.color] || projectColors.indigo}`}><FolderKanban size={20} /></span><ArrowUpRight size={18} className="text-gray-300 transition group-hover:text-indigo-600" /></div><h3 className="mt-6 font-bold text-gray-900">{project.name}</h3><p className="mt-2 min-h-10 text-sm leading-5 text-gray-500">{project.description}</p><div className="mt-5 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100"><div className={`h-full rounded-full bg-indigo-500 ${progressWidth(done, projectTasks.length)}`} /></div><span className="text-xs font-semibold text-gray-400">{done}/{projectTasks.length}</span></div></Link> })}
        </div></section>
      </div>
    </main>
    <TaskModal key={modalOpen ? 'open' : 'closed'} open={modalOpen} projectId={workspaceProjects[0]?.id} onClose={() => setModalOpen(false)} />
  </div>
}
