# Threads App – Backend

This repository contains the backend for a **Threads-like application**, built primarily as a **learning-focused project**.

## Purpose
The main motive of this backend is to **learn and practice**:
- **GraphQL** for flexible and efficient API design
- **Docker containerization** for consistent local development and environment management
- **PostgreSQL** as a relational database in a containerized setup
<p align="left">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2UsQASK5dednCoxFbWTBqpy6PjEjnsMRRQ&s" alt="GraphQL" height="50"/>
  <img src="https://www.docker.com/app/uploads/2023/08/logo-guide-logos-1.svg" alt="Docker" height="50"/>
  <img src="https://images.icon-icons.com/2415/PNG/512/postgresql_plain_wordmark_logo_icon_146390.png" alt="PostgreSQL" height="50"/>
</p>
This project is **not production-ready**. The focus is on understanding core backend concepts rather than building a fully scaled system.

## Tech Stack
- Node.js + Express
- Apollo Server (GraphQL)
- PostgreSQL
- Docker & Docker Compose
  

## Key Learnings
- Designing GraphQL schemas and resolvers
- Running backend services using Docker containers
- Implementing PostgreSQL as a persistent database using Docker volumes
- Managing database configuration through environment variables
- Understanding container lifecycle and data persistence

## PostgreSQL Implementation
PostgreSQL is used as the primary database for this backend.

- Runs as a separate Docker service
- Uses a **named volume** to persist data across container restarts
- Database credentials are injected via environment variables
- Designed for local development and learning database integration with GraphQL

This setup helps in understanding how real-world backends manage databases in isolated, reproducible environments.
