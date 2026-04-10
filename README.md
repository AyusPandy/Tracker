# Activity Tracker

A web application built to track user activity without relying on third-party analytics systems.

## Architecture Overview

React frontend and an Express server acting as the event sink and endpoint.

### 1. Frontend Tracking Mechanism

The frontend features a React application built with Vite and Tailwind CSS.

- **Asynchronous Tracking (`Tracker.tsx`)**: The tracker component captures user behavior such as active time, entry sources, navigation flows, and specific page views.
  - Page views are sent upon route mutation (`useLocation`).
  - Time is measured using the `beforeunload` event. We rely on the `navigator.sendBeacon` API to guarantee that telemetry data is successfully dispatched even when the browser tab is forcefully closed.
  - **WebSocket Integration**: A `Socket.io` connection acts as a stream, maintaining an accurate `activeUsers` count across all instances.

### 2. Backend Event Aggregation & Persistence

The backend operates on a pure Node.js + Express setup

#### Aggregation Model
- The `data` memory object natively tracks counts within object dictionaries (`pageViews`, `navigationFlow`, `entrySources`), ensuring memory usage scales with $O(U)$ uniquely visited paths rather than $O(N)$ total user events.
- Reading metrics via `/api/analytics` occurs in constant or near-constant time, effectively UI read latency from event scale.

#### Disk Write Operations
- Persistence is handled via an file write to an internal `db.json` file utilizing the standard non-blocking `fs.writeFile()`. This ensures the main Node event loop is never blocked, high concurrent throughput the `/api/track` write endpoint.

## Setup & Execution Instructions

### Backend Start
1. Move to the directory: `cd backend`
2. Install dependencies: `npm install`
3. Spin up the server: `npm run dev`

### Frontend Start
1. Move to the directory: `cd frontend`
2. Install dependencies: `npm install`
3. Spin up the Vite process: `npm run dev`

## Technical Highlights & Trade-offs

- **Local File storage over robust RDBMS**: Utilizes JSON object locally ("use localhost/localstorage").
