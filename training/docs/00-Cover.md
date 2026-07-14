# EM Enterprise Platform

## Software Architecture Document (SAD)

---

## Document Information

| Item | Value |
|------|-------|
| Document | Software Architecture Document |
| Project | EM Enterprise Platform |
| Module | Enterprise Platform |
| Version | 2.0 |
| Status | Draft |
| Owner | Engineering Department |
| Author | Engineering Digital Transformation |
| Repository | GitHub |
| Language | English / Indonesian |
| Created | July 2026 |
| Last Updated | July 2026 |

---

# Purpose

Dokumen ini merupakan acuan resmi pengembangan EM Enterprise Platform.

Seluruh desain sistem, workflow, standar coding, arsitektur, serta keputusan teknis harus mengacu pada dokumen ini.

Dokumen ini menjadi referensi utama bagi seluruh pengembang yang terlibat dalam project.

---

# Scope

Blueprint ini mencakup seluruh modul dalam EM Enterprise Platform.

Saat ini:

- Training Management
- Computer Based Test (CBT)

Roadmap berikutnya:

- Maintenance Management
- Monitoring System
- Inventory Management
- Calibration Management
- Dashboard
- Telegram Integration
- AI Assistant

---

# Intended Audience

Dokumen ini ditujukan untuk:

- Software Developer
- System Analyst
- Engineering Department
- IT Administrator
- Project Manager
- Future Developer

---

# Objectives

Blueprint ini memiliki tujuan:

- Menjadi standar pengembangan software.
- Menjamin konsistensi arsitektur.
- Mengurangi technical debt.
- Mempermudah maintenance.
- Mempermudah onboarding developer baru.
- Menjadi dokumentasi jangka panjang.

---

# Architecture Goals

Platform dikembangkan dengan prinsip:

- Modular
- Secure
- Maintainable
- Scalable
- High Performance
- Easy to Extend

---

# Technology Stack

## Backend

- Google Apps Script

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

## Database

- Google Spreadsheet

## Hosting

- GitHub Pages

## Domain

- emdept.com

---

# Design Principles

Seluruh modul wajib mengikuti prinsip berikut:

- Single Responsibility Principle (SRP)
- High Cohesion
- Loose Coupling
- Don't Repeat Yourself (DRY)
- Keep It Simple (KISS)
- Fail Fast
- Security First
- Performance First
- Repository Pattern
- Service Pattern

---

# Non Functional Requirements

Platform harus memenuhi target berikut:

| Item | Target |
|------|--------|
| Availability | 99.9% |
| Response Time | < 1 Second |
| Read Operation | < 300 ms |
| Write Operation | < 500 ms |
| Submit Exam | < 2 Seconds |
| Dashboard | < 5 Seconds |

---

# Documentation Structure

Seluruh dokumentasi disimpan pada folder:

docs/

dan dibagi menjadi beberapa bagian:

01-Vision.md

02-Architecture.md

03-Domain.md

04-Database.md

05-Backend.md

06-Workflow-Standard.md

07-Training-Workflow.md

08-Security.md

09-ADR.md

10-Coding-Standard.md

11-Deployment.md

---

# Document Status

Current Status

Draft

Current Version

2.0

Next Review

Quarterly

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial Blueprint |
| 2.0 | 2026 | Enterprise Architecture Refactoring |

---

# Approval

| Role | Status |
|------|--------|
| Engineering Department | Pending |
| Project Owner | Pending |

---

# Notes

Blueprint ini merupakan dokumen hidup (Living Document).

Setiap perubahan arsitektur, workflow, atau standar pengembangan harus diperbarui pada dokumentasi ini sebelum diimplementasikan pada kode.

Dokumentasi selalu menjadi sumber kebenaran (Single Source of Truth) untuk seluruh pengembangan EM Enterprise Platform.
