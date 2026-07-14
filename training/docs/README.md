# EM Enterprise Platform

Version : 2.0

Status : Draft

Owner : Engineering Department

---

# Overview

EM Enterprise Platform merupakan platform digital yang dikembangkan untuk mendukung seluruh aktivitas Engineering Department.

Platform ini dirancang menggunakan pendekatan Modular Architecture sehingga setiap modul dapat dikembangkan secara independen tanpa mempengaruhi modul lainnya.

Saat ini modul yang telah dikembangkan:

- Training Management
- Computer Based Test (CBT)

Roadmap berikutnya:

- Maintenance Management
- Monitoring System
- Inventory Management
- Calibration Management
- Dashboard & Analytics

---

# Architecture

Platform menggunakan layered architecture.

Business Domain

↓

Module

↓

Workflow

↓

Controller

↓

Service

↓

Repository

↓

Spreadsheet

---

# Documentation

| Document | Description |
|-----------|-------------|
| 00-Cover | Cover & Revision History |
| 01-Vision | Vision, Scope, Objective |
| 02-Architecture | Enterprise Architecture |
| 03-Domain | Business Domain |
| 04-Database | Database Design |
| 05-Backend | Backend Architecture |
| 06-Workflow-Standard | Workflow Standard |
| 07-Training-Workflow | Training Workflow |
| 08-Security | Security Guideline |
| 09-ADR | Architecture Decision Record |
| 10-Coding-Standard | Coding Standard |
| 11-Deployment | Deployment Guide |

---

# Current Module

## Training

Status

Production

Version

1.0

---

# Technology

Backend

Google Apps Script

Frontend

HTML

CSS

JavaScript

Database

Google Spreadsheet

Hosting

GitHub Pages

Domain

emdept.com

---

# Architecture Principle

- Single Responsibility
- High Cohesion
- Loose Coupling
- Fail Fast
- Security First
- Performance First
- Repository Pattern
- Service Pattern

---

# Repository Structure

docs/

src/

assets/

config/

.github/

---

# Future Roadmap

Phase 1

Training

✔ Completed

Phase 2

Maintenance

Planning

Phase 3

Monitoring

Planning

Phase 4

Inventory

Planning

Phase 5

Calibration

Planning

Phase 6

Analytics

Planning

---

# Revision

Current Version

2.0
