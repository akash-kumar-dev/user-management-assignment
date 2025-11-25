# Backend API - User Management

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Edit the `.env` file with your MySQL credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
PORT=3000
```

### 3. Create Database

Create a MySQL database:

```sql
CREATE DATABASE user_management;
```

### 4. Run Prisma Migrations

Generate Prisma client and create tables:

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### 1. Fetch Users from RandomUser API
**POST** `/api/users/fetch`

Fetches 1000 users from RandomUser API and stores them in the database.

**Response:**
```json
{
  "success": true,
  "message": "Successfully fetched and stored 1000 users",
  "count": 1000
}
```

### 2. Get All Users
**GET** `/api/users`

Returns all users from the database.

**Response:**
```json
{
  "success": true,
  "count": 1000,
  "data": [...]
}
```

### 3. Update User
**PUT** `/api/users/:uuid`

Updates a user's information.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "city": "New York"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {...}
}
```
