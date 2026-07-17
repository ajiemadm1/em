# Architecture Decision Record

---

# Purpose

Seluruh keputusan Architecture dicatat pada dokumen ini.

ADR menjelaskan.

- keputusan
- alasan
- alternatif
- konsekuensi

Dokumen ini menjadi histori seluruh keputusan teknis.

---

# ADR-001

## Title

Use Google Spreadsheet as Primary Storage

Status

Accepted

Date

2026-07

---

Decision

Menggunakan Google Spreadsheet.

---

Reason

- Integrasi GAS
- Tidak perlu Server
- Cepat dikembangkan
- Murah

---

Alternative

MySQL

Firestore

BigQuery

---

Consequence

Repository harus dipisahkan.

---

# ADR-002

Title

Repository Pattern

Decision

Menggunakan Repository Layer.

Reason

Business Layer tidak bergantung Storage.

---

# ADR-003

Title

Workflow Driven Development

Decision

Seluruh fitur dimulai dari Workflow.

---

# ADR-004

Title

Session Signature

Decision

Menggunakan SHA-256 Signature.

---

# ADR-005

Title

Question Randomization

Decision

Random dilakukan Server.

Client tidak mengetahui Answer Key.

---

# ADR-006

Title

Service Layer

Decision

Seluruh Business Rule berada pada Service.

Repository tidak memiliki Business Rule.

---

# ADR-007

Title

Modular Architecture

Decision

Setiap Module independen.

---

# ADR Template

Title

Date

Status

Context

Decision

Alternative

Consequence

Review

---

# Summary

ADR merupakan histori seluruh keputusan Architecture.

Keputusan tidak boleh diubah tanpa membuat ADR baru.
