# Java Event Management Project

A simple **Event Management System** built with **Spring Boot** backend and **React** frontend. Designed to manage events, participants, and tickets efficiently.

---

## Features

* Create, update, and delete events
* View upcoming events
* User-friendly interface for event management
* API documentation via OpenAPI / Swagger UI

---

## Technologies Used

* **Backend**: Java 17+, Spring Boot
* **Frontend**: React, Vite, Bun runtime
* **Database**: PostgreSQL
* **Containerization**: Docker, Docker Compose

---

## Getting Started

### Prerequisites

* Java 17 or higher
* Bun runtime (or Node.js + npm)
* Docker & Docker Compose (optional)

---

## Running the Application

### 1. Clone the repository

```bash
git clone <repository-url>
cd java-event-management-project
```

---

### 2. Backend Setup

```bash
cd api
./mvnw spring-boot:run       # Linux/Mac
mvnw.cmd spring-boot:run     # Windows
```

* API will be available at: `http://localhost:8080`
* Hot reload enabled via Spring DevTools

---

### 3. Frontend Setup

```bash
cd web
bun install
bun run dev
```

* Frontend will be available at: `http://localhost:3000`

---

### 4. Running Everything via Docker Compose

```bash
docker-compose up --build
```

* This starts the backend, frontend, and database together
* Application will be fully operational without manual database configuration

---

## Contributing

Feel free to submit issues, pull requests, or feature requests.
Please follow the **code style and commit conventions**.

---

## License

This project is licensed under the **MIT License**.