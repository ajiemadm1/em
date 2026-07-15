# Enterprise Architecture

---

# Purpose

Dokumen ini menjelaskan arsitektur utama EM Enterprise Platform.

Seluruh modul yang dikembangkan wajib mengikuti arsitektur yang didefinisikan pada dokumen ini.

Arsitektur ini dirancang agar platform dapat berkembang tanpa perlu melakukan perubahan besar pada struktur sistem.

---

# Architecture Philosophy

EM Enterprise Platform dibangun berdasarkan prinsip berikut.

Business First

↓

Architecture

↓

Workflow

↓

Implementation

Business Requirement tidak boleh bergantung pada teknologi.

Google Apps Script hanyalah implementasi.

Apabila suatu hari platform dipindahkan ke NodeJS, Java, .NET atau Python, Business Layer tetap tidak berubah.

---

# Enterprise Architecture

Platform dibagi menjadi beberapa Business Domain.

EM Enterprise Platform

│

├── Training

├── Maintenance

├── Monitoring

├── Inventory

├── Calibration

├── Dashboard

├── Notification

└── Administration

Setiap Domain memiliki Workflow, Service dan Database sendiri.

---

# Layered Architecture

Seluruh modul mengikuti Layered Architecture berikut.

Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Repository Layer

↓

Data Layer

---

# Layer Description

## Presentation Layer

Menampilkan informasi kepada user.

Berisi:

- HTML
- CSS
- JavaScript
- UI Component

Layer ini tidak boleh membaca Spreadsheet secara langsung.

---

## Application Layer

Mengatur alur aplikasi.

Berisi:

- Router
- Controller

Tugas utama:

- menerima request
- validasi awal
- memanggil service
- mengembalikan response

Layer ini tidak boleh mengandung business rule.

---

## Domain Layer

Berisi seluruh business logic.

Contoh:

Training Service

Question Service

Session Service

Result Service

Answer Service

Status Service

Layer ini merupakan inti sistem.

---

## Repository Layer

Berfungsi sebagai penghubung antara Domain dengan penyimpanan data.

Repository bertugas:

- membaca data
- menyimpan data
- update data
- delete data

Repository tidak boleh mengandung business rule.

---

## Data Layer

Tempat penyimpanan data.

Saat ini menggunakan:

Google Spreadsheet

Namun dapat diganti menjadi:

- MySQL
- PostgreSQL
- Firestore
- BigQuery

tanpa mengubah Domain Layer.

---

# Dependency Rule

Dependency hanya boleh mengarah ke bawah.

Presentation

↓

Application

↓

Domain

↓

Repository

↓

Data

Layer bawah tidak boleh mengetahui Layer atas.

---

# Allowed Dependency

Presentation

→ Controller

Controller

→ Service

Service

→ Repository

Repository

→ Spreadsheet

---

# Forbidden Dependency

HTML

✗ Spreadsheet

Controller

✗ Spreadsheet

Service

✗ HTML

Spreadsheet

✗ Controller

Repository

✗ UI

---

# Architecture Principle

Platform menggunakan prinsip berikut.

## Single Responsibility Principle

Setiap Service hanya memiliki satu tanggung jawab.

---

## High Cohesion

Function yang berkaitan harus berada pada Service yang sama.

---

## Loose Coupling

Service tidak boleh bergantung secara langsung pada implementasi Service lain.

---

## Fail Fast

Kesalahan harus dideteksi sedini mungkin.

---

## Security First

Seluruh request harus divalidasi sebelum diproses.

---

## Performance First

Minimalkan akses Spreadsheet.

Prioritaskan cache.

---

## Reusable Component

Seluruh komponen harus dapat digunakan ulang.

---

## DRY

Don't Repeat Yourself.

Tidak boleh ada business logic yang diduplikasi.

---

# Request Flow

User

↓

Browser

↓

Router

↓

Controller

↓

Service

↓

Repository

↓

Spreadsheet

↓

Repository

↓

Service

↓

Controller

↓

Browser

---

# Domain Driven Workflow

Setiap fitur dikembangkan melalui urutan berikut.

Business Requirement

↓

Workflow

↓

Entity

↓

Service

↓

Repository

↓

Implementation

Coding tidak boleh dimulai sebelum Workflow selesai.

---

# Module Independence

Setiap module harus dapat dikembangkan tanpa mempengaruhi module lain.

Contoh:

Training

tidak boleh bergantung pada

Maintenance.

Monitoring

tidak boleh bergantung pada

Inventory.

---

# Shared Component

Komponen berikut dapat digunakan bersama.

Authentication

Authorization

Logging

Notification

Configuration

Utilities

Cache

Security

---

# Shared Services

Platform menyediakan beberapa Service global.

AuthService

ConfigurationService

LogService

CacheService

SecurityService

NotificationService

AuditService

UtilityService

Seluruh module dapat menggunakan Service tersebut.

---

# Repository Strategy

Setiap Entity memiliki Repository sendiri.

Contoh:

SessionRepository

QuestionRepository

AnswerRepository

ResultRepository

StatusRepository

Repository hanya bertanggung jawab terhadap data.

Repository tidak boleh menghitung Score.

Repository tidak boleh melakukan validasi Business Rule.

---

# Design Goals

Architecture dirancang agar memenuhi target berikut.

Scalable

Maintainable

Secure

Modular

Reusable

Easy to Test

Easy to Extend

---

# Future Migration

Apabila suatu saat platform berpindah dari Google Apps Script ke teknologi lain, perubahan hanya dilakukan pada Repository dan Data Layer.

Business Layer tetap dipertahankan.

Dengan demikian investasi pada Business Logic tetap terjaga.

---

# Summary

EM Enterprise Platform dibangun menggunakan Layered Architecture dan Domain-Oriented Design.

Seluruh pengembangan wajib mengikuti struktur:

Business Domain

↓

Workflow

↓

Entity

↓

Service

↓

Repository

↓

Implementation

Arsitektur ini menjadi fondasi seluruh modul yang akan dikembangkan pada platform.
