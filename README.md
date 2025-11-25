# User Management System

A simple full-stack web application for managing users with data fetched from a public API.

### Backend Setup

```bash
cd backend
npm install

# Configure database
# Edit .env file with your PostgreSQL connection string

# Run migrations
npx prisma migrate dev

# Start server
npm start
```

Backend runs on: `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`
