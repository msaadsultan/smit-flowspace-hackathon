import { useState } from 'react'
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Rocket, Sparkles } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const features = ['One calm place for every project', 'Flexible views for every working style', 'Designed for teams that care about momentum']

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuthStore()
  const [form, setForm] = useState({ email: 'alice@example.com', password: 'password123' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  if (isLoggedIn) return <Navigate to="/dashboard" replace />

  const submit = async (event) => {
    event.preventDefault(); setLoading(true); setError('')
    const result = await login(form.email, form.password)
    if (result.success) navigate('/dashboard'); else setError(result.error)
    setLoading(false)
  }

  return <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
    <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" /><div className="absolute -bottom-48 -left-24 h-[32rem] w-[32rem] rounded-full border border-white/10" />
      <div className="relative"><div className="flex items-center gap-3 text-xl font-bold tracking-tight"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Rocket size={21} /></span>FlowSpace</div><div className="mt-32 max-w-xl"><p className="mb-5 text-sm font-semibold uppercase tracking-[.22em] text-indigo-200">Workspace, clarified</p><h1 className="text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">Manage your projects with ease.</h1><p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">Bring your work into focus and give every good idea room to move.</p><div className="mt-10 space-y-4">{features.map((feature) => <div className="flex items-center gap-3 text-sm text-indigo-100" key={feature}><CheckCircle2 size={18} className="text-indigo-200" />{feature}</div>)}</div></div></div>
      <div className="relative flex items-center gap-2 text-sm text-indigo-200"><Sparkles size={16} />A thoughtful workspace for modern teams</div>
    </section>
    <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10"><div className="w-full max-w-md"><div className="mb-12 flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 lg:hidden"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white"><Rocket size={21} /></span>FlowSpace</div><div className="mb-10"><p className="text-sm font-semibold uppercase tracking-[.18em] text-indigo-600">Welcome back</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">Sign in to your workspace</h2><p className="mt-3 text-gray-500">Pick up where your team left off.</p></div><form className="space-y-5" onSubmit={submit}><label className="block text-sm font-semibold text-gray-700">Email address<div className="relative mt-2"><Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div></label><label className="block text-sm font-semibold text-gray-700">Password<div className="relative mt-2"><LockKeyhole size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-11 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}<button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-70">{loading ? 'Signing in...' : 'Sign in'}{!loading && <ArrowRight size={17} />}</button></form><div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-amber-800">Demo credentials</p><p className="mt-2 text-sm text-amber-700">alice@example.com <span className="mx-1 text-amber-400">·</span> password123</p></div><p className="mt-8 text-center text-sm text-gray-500">New to FlowSpace? <Link className="font-bold text-indigo-600 hover:text-indigo-700" to="/signup">Create an account</Link></p></div></section>
  </main>
}
