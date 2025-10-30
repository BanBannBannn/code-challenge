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
```

## How to Call API
### 1. Using cURL (Linux / macOS / Git Bash)

#### Create an item

- curl -X POST http://localhost:3000/api/items \
-H "Content-Type: application/json" \
-d '{"name": "Book", "description": "A good read"}'

#### List items

- curl http://localhost:3000/api/items

#### Filter items by name

- curl http://localhost:3000/api/items?name=Book

#### Get item details

- curl http://localhost:3000/api/items/1

#### Update an item

- curl -X PUT http://localhost:3000/api/items/1 \
-H "Content-Type: application/json" \
-d '{"name": "Updated Book", "description": "Updated description"}'

#### Delete an item

- curl -X DELETE http://localhost:3000/api/items/1

### 2. Using PowerShell (Windows)

#### Create an item

- Invoke-RestMethod -Uri "http://localhost:3000/api/items" `
-Method POST `
-Headers @{"Content-Type"="application/json"} `
-Body '{"name":"Book","description":"A good read"}'

#### List items

- Invoke-RestMethod -Uri "http://localhost:3000/api/items" -Method GET

#### Get item details

- Invoke-RestMethod -Uri "http://localhost:3000/api/items/1" -Method GET

#### Update an item

- Invoke-RestMethod -Uri "http://localhost:3000/api/items/1" `
-Method PUT `
-Headers @{"Content-Type"="application/json"} `
-Body '{"name":"Updated Book","description":"Updated description"}'

#### Delete an item
- Invoke-RestMethod -Uri "http://localhost:3000/api/items/1" -Method DELETE

**Notes**

Make sure your server is running before calling API.

Use the correct ID for item operations (GET / PUT / DELETE).

If you are on Windows PowerShell, don’t use cURL -H, use -Headers @{} syntax instead.

For filtering, pass name as query parameter, /api/items?name=Book.
