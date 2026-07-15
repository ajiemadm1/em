# Backend Architecture

---

# Purpose

Dokumen ini mendefinisikan standar implementasi Backend EM Enterprise Platform.

Seluruh Business Logic, Workflow, Repository, Controller dan Utilities harus mengikuti arsitektur yang didefinisikan pada dokumen ini.

Dokumen ini menjadi acuan utama seluruh developer.

---

# Backend Philosophy

Backend dibangun berdasarkan prinsip berikut.

Business Requirement

↓

Workflow

↓

Service

↓

Repository

↓

Spreadsheet

Backend tidak dibangun berdasarkan Spreadsheet.

Spreadsheet hanyalah media penyimpanan.

---

# Backend Layer

Platform menggunakan lima layer utama.

Presentation Layer

↓

Controller Layer

↓

Service Layer

↓

Repository Layer

↓

Storage Layer

---

# Layer Responsibility

## Presentation Layer

Bertanggung jawab terhadap:

- HTML
- CSS
- JavaScript
- User Interface
- Event

Tidak boleh:

✗ membaca Spreadsheet

✗ menghitung Score

✗ membuat Session

---

## Controller Layer

Bertanggung jawab menerima request.

Controller hanya boleh:

- menerima request
- validasi request
- memanggil Service
- mengembalikan response

Controller tidak boleh mengandung Business Rule.

Contoh:

TrainingController

ExamController

SessionController

AdminController

---

## Service Layer

Service merupakan inti platform.

Seluruh Business Rule berada pada Layer ini.

Contoh:

TrainingService

QuestionService

SessionService

AnswerService

ResultService

StatusService

SecurityService

ConfigurationService

NotificationService

---

## Repository Layer

Repository bertanggung jawab terhadap data.

Repository hanya melakukan:

- Query
- Insert
- Update
- Delete
- Mapping
- Cache

Repository tidak boleh menghitung Business Logic.

---

## Storage Layer

Storage saat ini:

Google Spreadsheet

Storage dapat berubah tanpa mempengaruhi Service.

---

# Backend Folder Structure

backend/

controllers/

services/

repositories/

entities/

utils/

config/

security/

cache/

workflow/

---

# Controller Standard

Setiap Controller memiliki format berikut.

Request

↓

Validation

↓

Call Service

↓

Return Response

Tidak boleh:

Business Rule

Spreadsheet

Cache

---

# Service Standard

Service bertanggung jawab terhadap.

Workflow

Validation

Business Rule

Calculation

Permission

Transaction

Logging

Service tidak boleh mengetahui Spreadsheet.

---

# Repository Standard

Repository bertanggung jawab terhadap.

Read

Insert

Update

Delete

Mapping

Cache

Repository tidak boleh:

Menghitung Score

Membuat Session

Mengirim Telegram

---

# Entity Standard

Setiap Entity merepresentasikan Business Object.

Contoh:

ExamSession

Question

Answer

Result

Certificate

Asset

Material

Vendor

Entity bukan Spreadsheet.

Entity merupakan representasi Business Domain.

---

# Workflow Standard

Controller tidak memanggil Repository.

Controller

↓

Service

↓

Repository

↓

Spreadsheet

Seluruh Workflow harus mengikuti pola tersebut.

---

# Service Dependency

Service hanya boleh memanggil:

Repository

Shared Service

Utility

Tidak boleh memanggil Controller.

---

# Repository Dependency

Repository hanya boleh memanggil:

Spreadsheet

Cache

Mapper

Tidak boleh memanggil Service.

---

# Shared Services

Shared Services digunakan oleh seluruh Domain.

AuthenticationService

AuthorizationService

ConfigurationService

NotificationService

AuditService

LogService

CacheService

UtilityService

SecurityService

---

# Utility Layer

Utility hanya berisi Helper.

Contoh:

DateUtil

StringUtil

ValidationUtil

CryptoUtil

HashUtil

Formatter

Utility tidak boleh memiliki Business Rule.

---

# Cache Layer

Cache digunakan untuk data yang sering dibaca.

Contoh:

Configuration

Question Bank

Role

Permission

Course

Cache tidak digunakan untuk Session.

---

# Security Layer

Seluruh Request harus melewati:

Authentication

↓

Authorization

↓

Validation

↓

Business Logic

↓

Repository

↓

Storage

---

# Error Handling

Seluruh Error menggunakan format yang sama.

Success

Message

Code

Data

Timestamp

RequestId

Contoh:

{
    "success": false,
    "code": "SESSION_EXPIRED",
    "message": "Exam session has expired.",
    "timestamp": "2026-07-14T10:15:30Z",
    "requestId": "REQ-20260714-000123"
}

---

# Logging Strategy

Setiap aktivitas penting wajib dicatat.

Login

Logout

Start Exam

Save Answer

Submit Exam

Timeout

Cancel Session

Generate Certificate

---

# Audit Strategy

Data berikut wajib dapat diaudit.

Session

Result

Question

Configuration

Permission

User

Audit minimal menyimpan.

Who

When

What

Old Value

New Value

---

# Transaction Flow

Validate

↓

Permission Check

↓

Business Validation

↓

Repository

↓

Verification

↓

Response

---

# Backend Naming Standard

Controller

ExamController

Service

ExamService

Repository

ExamRepository

Entity

ExamSession

Utility

DateUtil

Configuration

AppConfig

---

# Response Standard

Semua Service mengembalikan format berikut.

{
    success,
    code,
    message,
    data
}

Tidak diperbolehkan mengembalikan tipe data yang berbeda-beda.

---

# Future Migration

Jika backend dipindahkan ke:

NodeJS

Java

.NET

Python

Layer berikut tetap dipertahankan.

Controller

↓

Service

↓

Repository

↓

Storage

Hanya implementasi yang berubah.

---

# Summary

Backend EM Enterprise Platform dibangun menggunakan Layered Architecture.

Seluruh Business Rule berada pada Service.

Repository menjadi satu-satunya komponen yang diperbolehkan mengakses Spreadsheet.

Controller hanya mengatur alur request.

Dengan struktur ini platform dapat berkembang tanpa kehilangan konsistensi arsitektur.
