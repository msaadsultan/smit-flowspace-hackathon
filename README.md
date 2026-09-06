# SMIT FlowSpace Hackathon Project

FlowSpace is a frontend project management workspace built with React. helps It teams organize workspaces, projects, and tasks in one focused interface.

The app includes a dashboard for workspace activity, project-level task management, authentication screens, profile settings, and local browser persistence for the demo data.

## Features

- Login and signup flows with protected application routes
- Workspace switcher with multiple demo workspaces
- Dashboard with task totals, in-progress work, completion progress, and active projects
- Project detail pages with Kanban, list, and calendar view controls
- Drag-and-drop task movement between To Do, In Progress, and Done columns
- Create and edit tasks with descriptions, priorities, due dates, labels, and assignees
- Search and filter controls for project tasks
- Profile menu with settings navigation and logout
- Editable profile name in Settings
- Export of local workspace data as JSON
- Persisted authentication and workspace data using Zustand middleware
- `Ctrl+K` or `Cmd+K` shortcut to focus the global search field
- Responsive layout with Tailwind CSS and Lucide icons

## Demo Login

Use these credentials to access the demo:

```text
Email:    ahmad@google.com
Password: pass1234
```
OR you can create new account

The demo profile is displayed as your name inside the application.

## Tech Stack

- React
- Vite
- React Router
- Zustand
- Tailwind CSS
- Lucide React
- `@hello-pangea/dnd` for drag-and-drop interactions
- ESLint

## Getting Started

### Requirements

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run lint checks

```bash
npm run lint
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/login` | Sign in to the workspace |
| `/signup` | Create a local demo account |
| `/dashboard` | View workspace summary and projects |
| `/projects/:projectId` | Manage tasks for a project |
| `/settings` | Update profile and manage local data |

Application routes are protected and redirect unauthenticated users to `/login`.

## Project Structure

```text
src/
	components/
		kanban/       Kanban board and task columns
		layout/       Header and sidebar navigation
		tasks/        Task creation and editing modal
	lib/            Demo data
	pages/          Login, signup, dashboard, project, and settings pages
	store/          Zustand authentication and workspace stores
	App.jsx         Route definitions and protected route handling
	index.css       Tailwind base styles and shared component styles
```

## Data Model

FlowSpace currently runs without a backend. Demo users, workspaces, projects, and tasks are defined in `src/lib/mockData.js`. Zustand persists the current authentication and workspace state in the browser's local storage.

The data export action downloads workspace data as `flowspace-data.json`. Import selection is present as a frontend demo flow, but imported file validation and backend synchronization are not implemented yet.

## Development Notes

- Changes to profile names are persisted locally.
- Resetting workspace data restores the original demo workspaces, projects, and tasks.

- The app is designed as a focused UI prototype and does not currently include a remote API, database, or multi-user synchronization.
