# Security Architecture

---

# Purpose

Dokumen ini mendefinisikan standar keamanan EM Enterprise Platform.

Seluruh modul wajib mengikuti aturan keamanan yang telah ditetapkan.

Security bukan merupakan fitur.

Security merupakan bagian dari Architecture.

---

# Security Philosophy

Platform menggunakan prinsip berikut.

Never Trust Client.

Seluruh data yang berasal dari Browser dianggap tidak valid sampai dilakukan validasi pada Backend.

---

# Security Layers

Presentation

↓

Authentication

↓

Authorization

↓

Validation

↓

Business Rule

↓

Repository

↓

Storage

---

# Authentication

Authentication bertanggung jawab memastikan identitas User.

Saat ini menggunakan:

Google Account

atau

Internal Login

Authentication menghasilkan:

User Session

---

# Authorization

Authorization menentukan hak akses.

Contoh.

Administrator

Supervisor

Operator

Participant

Guest

Seluruh Permission berada pada:

PermissionService

---

# Session Security

Seluruh Session wajib memiliki:

Session ID

Signature

Created Time

Expired Time

Status

User ID

IP Address (Optional)

Browser Fingerprint (Future)

---

# Session Rules

Session hanya boleh aktif satu kali.

Session harus memiliki Signature.

Session harus memiliki Expired Time.

Session dapat dibatalkan.

Session tidak boleh digunakan kembali setelah Completed.

---

# Signature

Session Signature dibuat menggunakan.

SHA-256

Input.

Session ID

+

User

+

Case

+

Start Time

+

SESSION_SECRET

Signature tidak boleh dikirimkan ke User untuk dimodifikasi.

---

# Permission Validation

Setiap Request harus melakukan:

Validate Login

↓

Validate Session

↓

Validate Permission

↓

Validate Workflow

↓

Business Logic

---

# Client Validation

Client hanya melakukan validasi User Experience.

Contoh.

Field Required

Email Format

Maximum Length

Client Validation bukan Security.

---

# Server Validation

Server wajib melakukan.

Null Validation

Range Validation

Permission Validation

Workflow Validation

Status Validation

Duplicate Validation

Business Validation

Server merupakan sumber validasi utama.

---

# Input Validation

Semua Input wajib:

Trim

Escape

Validate Type

Validate Length

Validate Required

---

# Output Validation

Output tidak boleh mengirimkan.

Answer Key

Internal ID

Secret

Password

Hash

Signature

---

# Sensitive Data

Data berikut tidak boleh dikirim ke Browser.

Correct Answer

Score Formula

Hash

Secret

Permission Matrix

Internal Configuration

---

# Password

Password tidak pernah disimpan dalam Plain Text.

Gunakan.

SHA-256

+

Salt

atau Authentication Provider.

---

# Secret Management

Semua Secret berada pada:

Config

atau

Script Properties

Tidak diperbolehkan Hardcode pada Source Code.

Contoh.

SESSION_SECRET

Telegram Token

Webhook Secret

API Key

---

# Repository Security

Repository hanya boleh dipanggil oleh Service.

Controller

×

Repository

Repository

×

UI

Spreadsheet

×

Browser

---

# API Security

Semua API wajib mengembalikan.

success

code

message

data

Tidak diperbolehkan mengembalikan Stack Trace.

---

# Error Message

Gunakan.

Access Denied

Session Expired

Validation Failed

Internal Error

Jangan mengirim.

SQL Error

Sheet Error

Stack Trace

Repository Error

---

# Audit Trail

Seluruh aktivitas berikut harus dicatat.

Login

Logout

Start Exam

Resume Exam

Submit Exam

Timeout

Cancel

Generate Certificate

Configuration Change

User Management

---

# Security Event

Event berikut dianggap Security Event.

Repeated Login Failure

Invalid Signature

Expired Session

Permission Denied

Tampered Request

Invalid Token

---

# Future Security

Roadmap.

JWT

Refresh Token

2FA

Browser Fingerprint

IP Validation

Device Binding

Encryption

---

# Security Checklist

☐ Session Validation

☐ Permission Validation

☐ Signature Validation

☐ Server Validation

☐ Audit Enabled

☐ Secret Hidden

☐ HTTPS

☐ Repository Protected

---

# Summary

Security merupakan bagian dari Architecture.

Seluruh Business Workflow wajib menerapkan Security sejak tahap desain.
