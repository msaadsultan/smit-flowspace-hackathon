export const mockUsers = [
  { id: 'u1', name: 'Ahmad Morgan', email: 'alice@example.com', password: 'password123', role: 'Owner', avatar: 'AM' },
  { id: 'u2', name: 'Bob Chen', email: 'bob@example.com', password: 'password123', role: 'Member', avatar: 'BC' },
  { id: 'u3', name: 'Carol Rivera', email: 'carol@example.com', password: 'password123', role: 'Member', avatar: 'CR' },
]

export const mockWorkspaces = [
  { id: 'ws1', name: 'Product Team', icon: 'Rocket', members: ['u1', 'u2', 'u3'] },
  { id: 'ws2', name: 'Design Team', icon: 'Palette', members: ['u1', 'u3'] },
]

export const mockProjects = [
  { id: 'p1', workspaceId: 'ws1', name: 'Website Redesign', description: 'A clearer, faster home for the next chapter of FlowSpace.', icon: 'Palette', color: 'indigo', archived: false },
  { id: 'p2', workspaceId: 'ws1', name: 'Mobile App', description: 'Bring focus mode and quick capture to mobile.', icon: 'Smartphone', color: 'emerald', archived: false },
  { id: 'p3', workspaceId: 'ws2', name: 'Brand Identity', description: 'A flexible visual system for a growing product.', icon: 'Sparkles', color: 'orange', archived: false },
]

export const mockTasks = [
  { id: 't1', projectId: 'p1', title: 'Audit the current navigation', description: 'Map the most common paths and identify dead ends.', status: 'done', priority: 'high', dueDate: '2026-09-04', assigneeId: 'u1', labels: ['research'] },
  { id: 't2', projectId: 'p1', title: 'Create the new sitemap', description: 'Turn the audit into a simpler information architecture.', status: 'in-progress', priority: 'urgent', dueDate: '2026-09-09', assigneeId: 'u2', labels: ['strategy', 'web'] },
  { id: 't3', projectId: 'p1', title: 'Prototype project overview', description: 'Explore a calmer project dashboard with useful density.', status: 'todo', priority: 'medium', dueDate: '2026-09-14', assigneeId: 'u3', labels: ['design'] },
  { id: 't4', projectId: 'p1', title: 'Write launch notes', description: 'Capture the why behind the redesign for the internal launch.', status: 'todo', priority: 'low', dueDate: '2026-09-18', assigneeId: 'u1', labels: ['writing'] },
  { id: 't5', projectId: 'p2', title: 'Test offline quick capture', description: 'Make sure a task can be captured with a spotty connection.', status: 'in-progress', priority: 'high', dueDate: '2026-09-11', assigneeId: 'u2', labels: ['mobile', 'qa'] },
  { id: 't6', projectId: 'p2', title: 'Review onboarding states', description: 'Check the first-run experience from a new user perspective.', status: 'todo', priority: 'medium', dueDate: '2026-09-16', assigneeId: 'u3', labels: ['product'] },
  { id: 't7', projectId: 'p3', title: 'Review color accessibility', description: 'Check contrast across the full identity palette.', status: 'todo', priority: 'medium', dueDate: '2026-09-20', assigneeId: 'u3', labels: ['brand'] },
]
