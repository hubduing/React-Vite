# Task Manager

Full Stack приложение для управления задачами. Позволяет создавать, просматривать, редактировать, удалять задачи и отмечать их как выполненные.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, Vite 8, CSS |
| **Backend**  | FastAPI, SQLAlchemy, SQLite, Pydantic |
| **Tools**    | Uvicorn, Vite Proxy, REST API |

---

## Features

- Создание новой задачи (название + описание)
- Просмотр списка всех задач
- Отметка задачи как выполненной (toggle)
- Редактирование задачи
- Удаление задачи
- Валидация данных на бэкенде (Pydantic)
- Интерактивная Swagger-документация (`/docs`)
- Проксирование запросов через Vite (no CORS in dev)

---

## Project Structure

```
.
├── backend/                    # FastAPI server
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # Entry point, CORS, create_all
│   │   ├── database.py         # SQLite engine + SessionLocal
│   │   ├── models.py           # SQLAlchemy Task model
│   │   ├── schemas.py          # Pydantic request/response schemas
│   │   ├── crud.py             # CRUD functions
│   │   └── routers/
│   │       ├── __init__.py
│   │       └── tasks.py        # REST endpoints
│   ├── venv/                   # Virtual environment
│   └── requirements.txt
│
├── src/                        # React frontend
│   ├── api/
│   │   └── tasksApi.js         # Fetch wrappers for CRUD
│   ├── hooks/
│   │   └── useTasks.js         # Custom hook (state + API)
│   ├── components/
│   │   ├── Header.jsx          # App header
│   │   ├── TaskForm.jsx        # Add task form
│   │   ├── TaskItem.jsx        # Single task card
│   │   └── TaskList.jsx        # Task list with empty state
│   ├── App.jsx                 # Root component
│   ├── App.css                 # Styles
│   └── main.jsx                # Entry point
│
├── vite.config.js              # Vite config + proxy
├── package.json
└── README.md
```

---

## Local Setup

### Prerequisites

- Python 3.12+
- Node.js 18+

### 1. Clone and install backend

```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2. Start backend (Terminal 1)

```powershell
cd backend
venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`.  
Swagger docs at `http://localhost:8000/docs`.

### 3. Install frontend and start (Terminal 2)

```powershell
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

> Vite proxy forwards `/api/*` requests to the backend automatically — no CORS issues.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/api/tasks`       | Get all tasks |
| `GET`    | `/api/tasks/{id}`  | Get task by ID |
| `POST`   | `/api/tasks`       | Create a new task |
| `PUT`    | `/api/tasks/{id}`  | Update a task |
| `DELETE` | `/api/tasks/{id}`  | Delete a task |

### Example request

```json
POST /api/tasks
{
  "title": "Купить продукты",
  "description": "Молоко, хлеб, яйца"
}
```

---

## What I Learned

- **FastAPI** — создание REST API, Pydantic-схемы, dependency injection, CORS middleware
- **SQLAlchemy + SQLite** — модели, сессии, миграции через `create_all`
- **React (Vite)** — кастомные хуки (`useTasks`), управление состояниями (loading / error / data)
- **fetch API** — обёртка CRUD-запросов с обработкой HTTP-ошибок
- **Vite Proxy** — настройка прокси для разработки без CORS
- **Full Stack связка** — взаимодействие React ↔ Vite Proxy ↔ FastAPI ↔ SQLite
