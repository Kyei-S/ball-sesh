# Ball Sesh Platform

A football session management platform with separate admin and user (frontend) portals. Built with Node.js, React, Docker, and a MongoDB backend.  
Automated CI/CD pipeline using Jenkins and GitHub webhooks.

## Features

- **Book football sessions** and manage attendance
- **Admin dashboard** for session creation and management
- **Modern UI** (React + Tailwind CSS)
- **MongoDB** for session and booking storage
- **Dockerized** for consistent local/dev/prod environments
- **Jenkins** for automated testing, building, and deployment on every GitHub push

## Project Structure

ball-sesh/
 admin/ # Admin dashboard (React)
 backend/ # Node.js backend API (Express + MongoDB)
 frontend/ # User-facing frontend (React)
 infrastructure/ # Docker Compose, Jenkinsfile, infra scripts
