# Problem 6: Architecture – Real-time Scoreboard Module

## Overview

This module manages the **scoreboard system** for a website where users’ scores increase after performing certain actions.

Goals:
- Show **top 10 users** in real time.
- Allow **score updates** via API when users perform valid actions.
- **Prevent unauthorized or malicious score updates**.

---

## Functional Requirements

| # | Feature | Description |
|---|----------|-------------|
| 1 | **Score Update API** | Called when a user completes an action that increases their score. |
| 2 | **Leaderboard API** | Returns the top 10 users sorted by score. |
| 3 | **Real-time Updates** | Live broadcast of updated leaderboard to all connected clients. |
| 4 | **Authorization** | Only authenticated users can update their own scores. |
| 5 | **Persistence** | Store and maintain scores in the database. |

---

## High-Level Architecture

sequenceDiagram
participant U as User
participant FE as Frontend
participant BE as Backend
participant DB as Database
participant CC as Connected Clients

    U->>FE: Completes an action
    FE->>BE: POST /api/scores/update (JWT)
    BE->>BE: Validate token & action
    BE->>DB: Update user score
    DB-->>BE: OK (new score)
    BE->>CC: Emit "scoreboard:update"
    CC-->>FE: Frontend updates leaderboard

---

## Technology Stack
| Layer          | Technology                 |
| -------------- |----------------------------|
| Backend        | Node.js / NestJS / Express |
| Real-time      | Socket.IO / WebSocket      |
| Database       | PostgreSQL                 |
| Authentication | JWT (JSON Web Token)       |
| Caching        | Redis (optional)           |

---

## Improvements
- Use Redis cache to store top 10 users for faster reads.

- Add rate limiting to avoid spam updates.

- Backend-only score logic to prevent manipulation.

- Secure WebSocket connections using JWT authentication.

---

## Summary
| Goal                 | Achieved           |
| -------------------- | ------------------ |
| Secure score updates | JWT authentication |
| Real-time updates    | via WebSockets     |
| Prevent cheating     | backend validation |
| Top 10 leaderboard   | via DB query or cache |
