# GitHub Dashboard

A modern GitHub Dashboard built with **Next.js** and **NestJS** that allows users to search for any GitHub profile and view their public information, repositories, programming languages, statistics, and recent activity.

## Features

* Search for any GitHub user
* View profile information
* Repository list with key details
* Language usage chart
* GitHub statistics
* Recent public activity
* Responsive UI
* Loading and error states

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Query
* Axios

### Backend

* NestJS
* TypeScript
* Axios
* GitHub REST API

---

## Project Structure

```text
github-dashboard/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── ...
│
└── backend/
    ├── src/
    ├── github/
    └── ...
```

---

## Prerequisites

Install the following before running the project:

* Node.js 20+ (Node.js 22 recommended)
* npm

---

# Backend Setup

Navigate into the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start:dev
```

The backend will run on:

```text
http://localhost:3000
```

Swagger documentation:

```text
http://localhost:3000/api
```

---

# Frontend Setup

Navigate into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3001
```

(or whichever port Next.js assigns)

---

## API Endpoint

The frontend consumes the following endpoint:

```http
GET /github/users/:username/dashboard
```

Example:

```http
GET /github/users/techrook/dashboard
```

---

## Running the Application

Start the backend:

```bash
cd backend
npm run start:dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the browser and search for any GitHub username.

---


