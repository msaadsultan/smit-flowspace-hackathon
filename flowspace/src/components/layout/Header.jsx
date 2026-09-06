import { Bell, ChevronDown, Command, LogOut, Search, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

export default function Header() {
  const user = useAuthStore((state) => state.currentUser)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const focusSearch = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return <header className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl lg:left-64 lg:px-8">
    <div className="relative w-full max-w-md"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input ref={searchRef} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-16 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50" placeholder="Search projects, tasks, people..." /><span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] text-slate-400"><Command size={11} />K</span></div>
    <div className="relative ml-6 flex items-center gap-2 sm:gap-4"><div className="relative"><button className="relative rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }}><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" /></button>{notificationsOpen && <div className="absolute right-0 top-12 z-30 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"><p className="text-sm font-semibold text-slate-900">Notifications</p><p className="mt-2 text-sm text-slate-500">You’re all caught up.</p></div>}</div><div className="relative"><button className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50" aria-label="Open profile menu" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }}><span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-sm">{user?.avatar || 'FS'}</span><span className="hidden text-sm font-semibold text-slate-700 sm:block">{user?.name?.split(' ')[0]}</span><ChevronDown size={14} className="text-slate-400" /></button>{profileOpen && <div className="absolute right-0 top-12 z-30 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"><div className="border-b border-slate-100 px-3 py-2"><p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p><p className="truncate text-xs text-slate-500">{user?.email}</p></div><button className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50" onClick={() => { navigate('/settings'); setProfileOpen(false) }}><Settings size={15} />Settings</button><button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50" onClick={handleLogout}><LogOut size={15} />Log out</button></div>}</div></div>
  </header>
}
