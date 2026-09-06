import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockUsers } from '../lib/mockData'

const wait = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 250))

export const useAuthStore = create(persist((set, get) => ({
  currentUser: null,
  isLoggedIn: false,
  users: mockUsers,
  login: async (email, password) => {
    const user = get().users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.password === password)
    if (!user) return wait({ success: false, error: 'Incorrect email or password. Try the demo credentials below.' })
    set({ currentUser: user, isLoggedIn: true })
    return wait({ success: true })
  },
  signup: async (name, email, password) => {
    if (get().users.some((user) => user.email.toLowerCase() === email.toLowerCase())) return wait({ success: false, error: 'An account with this email already exists.' })
    const user = { id: `u-${Date.now()}`, name, email, password, role: 'Owner', avatar: name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
    set((state) => ({ users: [...state.users, user], currentUser: user, isLoggedIn: true }))
    return wait({ success: true })
  },
  updateProfile: (updates) => set((state) => ({ currentUser: state.currentUser ? { ...state.currentUser, ...updates } : state.currentUser })),
  logout: () => set({ currentUser: null, isLoggedIn: false }),
}), {
  name: 'flowspace-auth',
  version: 1,
  migrate: (persistedState) => {
    if (!persistedState) return persistedState
    const renameUser = (user) => user?.email === 'alice@example.com' ? { ...user, name: 'Ahmad Morgan', avatar: 'AM' } : user
    return {
      ...persistedState,
      currentUser: renameUser(persistedState.currentUser),
      users: persistedState.users?.map(renameUser),
    }
  },
}))
