# Problem 5: ExpressJS CRUD API with TypeScript

## Description
Develop a backend server using **ExpressJS** and **TypeScript** that supports basic **CRUD operations** with **SQLite** database persistence.

---

## Features
- Create, Read, Update, Delete items
- Filter items by name
- SQLite for data persistence
---
## API Endpoints
- POST http://localhost:3000/api/items
- GET http://localhost:3000/api/items?name=Book
- GET http://localhost:3000/api/items/:id
- PUT http://localhost:3000/api/items/:id
- DELETE http://localhost:3000/api/items/:id
---

## How to Run

### Go to the project folder
```bash
cd src/problem5
npm install
npx ts-node server.ts