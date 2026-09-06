import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockProjects, mockTasks, mockWorkspaces } from '../lib/mockData'

const id = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export const useDataStore = create(persist((set) => ({
  workspaces: mockWorkspaces,
  projects: mockProjects,
  tasks: mockTasks,
  currentWorkspaceId: 'ws1',
  setCurrentWorkspace: (id) => set({ currentWorkspaceId: id }),
  createProject: (workspaceId, name, description = '') => set((state) => ({ projects: [...state.projects, { id: id('p'), workspaceId, name, description, icon: 'FolderKanban', color: 'indigo', archived: false }] })),
  updateProject: (projectId, updates) => set((state) => ({ projects: state.projects.map((project) => project.id === projectId ? { ...project, ...updates } : project) })),
  deleteProject: (projectId) => set((state) => ({ projects: state.projects.filter((project) => project.id !== projectId), tasks: state.tasks.filter((task) => task.projectId !== projectId) })),
  createTask: (projectId, title, description = '', updates = {}) => set((state) => ({ tasks: [...state.tasks, { id: id('t'), projectId, title, description, status: 'todo', priority: 'medium', dueDate: '', assigneeId: '', labels: [], ...updates }] })),
  updateTask: (taskId, updates) => set((state) => ({ tasks: state.tasks.map((task) => task.id === taskId ? { ...task, ...updates } : task) })),
  deleteTask: (taskId) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
  moveTask: (taskId, status) => set((state) => ({ tasks: state.tasks.map((task) => task.id === taskId ? { ...task, status } : task) })),
  toggleComplete: (taskId) => set((state) => ({ tasks: state.tasks.map((task) => task.id === taskId ? { ...task, status: task.status === 'done' ? 'todo' : 'done' } : task) })),
  resetData: () => set({ workspaces: mockWorkspaces, projects: mockProjects, tasks: mockTasks, currentWorkspaceId: 'ws1' }),
}), { name: 'flowspace-data' }))
