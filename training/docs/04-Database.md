# Database Architecture

---

# Purpose

Dokumen ini mendefinisikan arsitektur penyimpanan data pada EM Enterprise Platform.

Seluruh penyimpanan data harus mengikuti Business Domain yang telah ditetapkan.

Database bukan merupakan pusat sistem.

Business Domain tetap menjadi pusat arsitektur.

---

# Database Philosophy

Platform menggunakan pendekatan berikut.

Business Domain

↓

Entity

↓

Repository

↓

Spreadsheet

Spreadsheet hanyalah media penyimpanan.

Seluruh Business Rule berada pada Service Layer.

---

# Current Storage

Saat ini platform menggunakan Google Spreadsheet.

Alasan pemilihan:

- Integrasi langsung dengan Google Apps Script
- Mudah dikelola
- Tidak memerlukan server database
- Biaya operasional rendah
- Mendukung pengembangan cepat

---

# Future Storage

Repository Layer dirancang agar dapat dipindahkan ke:

- MySQL
- PostgreSQL
- SQL Server
- Firestore
- BigQuery

tanpa mengubah Business Layer.

---

# Storage Principle

Setiap Spreadsheet hanya memiliki satu tanggung jawab.

Satu Sheet hanya menyimpan satu jenis Entity.

Contoh:

TB_EXAM_SESSION

✔ Menyimpan Session

TB_EXAM_RESULT

✔ Menyimpan Result

TB_USER

✔ Menyimpan User

Tidak diperbolehkan:

TB_MASTER

×

Menyimpan banyak jenis data.

---

# Database Naming Standard

Semua Sheet menggunakan format berikut.

TB_<ENTITY_NAME>

Contoh:

TB_EXAM_SESSION

TB_EXAM_RESULT

TB_EXAM_STATUS

TB_QUESTION

TB_USER

TB_ROLE

TB_PERMISSION

TB_AUDIT_LOG

---

# Entity Relationship

Training Domain

Question

↓

Exam Session

↓

Answer

↓

Result

↓

Certificate

Maintenance Domain

Asset

↓

Work Order

↓

History

Inventory Domain

Material

↓

Stock

↓

Transaction

Calibration Domain

Instrument

↓

Calibration

↓

Certificate

---

# Primary Key Standard

Seluruh Entity wajib memiliki Primary Key.

Format:

UUID

Contoh:

SESSION_ID

QUESTION_ID

RESULT_ID

USER_ID

ROLE_ID

WORK_ORDER_ID

MATERIAL_ID

---

# Foreign Key Standard

Foreign Key selalu menggunakan nama Entity.

Contoh:

USER_ID

SESSION_ID

QUESTION_ID

RESULT_ID

COURSE_ID

Tidak menggunakan:

ID1

ID2

MASTER_ID

---

# Timestamp Standard

Seluruh Entity minimal memiliki field berikut.

CreatedAt

CreatedBy

UpdatedAt

UpdatedBy

Status

---

# Audit Standard

Entity penting wajib memiliki:

CreatedAt

CreatedBy

UpdatedAt

UpdatedBy

DeletedAt (Optional)

DeletedBy (Optional)

---

# Soft Delete

Data penting tidak dihapus secara fisik.

Gunakan:

Status

atau

IsDeleted

Contoh:

Active

Inactive

Archived

Deleted

---

# Repository Rule

Spreadsheet hanya boleh diakses melalui Repository.

Service

↓

Repository

↓

Spreadsheet

Tidak diperbolehkan:

Service

↓

Spreadsheet

---

# Read Strategy

Seluruh operasi baca menggunakan Repository.

Repository bertanggung jawab:

- Query
- Filter
- Mapping
- Cache

Repository tidak menghitung Business Logic.

---

# Write Strategy

Seluruh operasi tulis menggunakan Repository.

Repository bertanggung jawab:

Insert

Update

Delete

Batch Write

---

# Cache Strategy

Repository dapat menggunakan Cache.

Prioritas:

Memory

↓

CacheService

↓

Spreadsheet

Cache hanya digunakan untuk data yang relatif stabil.

Contoh:

Configuration

Role

Permission

Course

Question Bank

---

# Transaction Strategy

Google Spreadsheet tidak mendukung Transaction.

Platform menggunakan Logical Transaction.

Urutan:

Validate

↓

Prepare

↓

Write

↓

Verify

↓

Commit

Apabila gagal:

Compensation Action

↓

Rollback Manual

---

# Data Integrity

Seluruh Repository wajib melakukan:

Null Validation

Duplicate Validation

Foreign Key Validation

Status Validation

---

# Spreadsheet Limitation

Spreadsheet tidak digunakan sebagai Relational Database.

Join kompleks harus dihindari.

Normalisasi dilakukan secukupnya.

Data yang sering dibaca bersama dapat didenormalisasi apabila meningkatkan performa.

---

# Performance Guideline

Target performa.

Read

<300 ms

Write

<500 ms

Batch Update

<2 detik

Submit Exam

<2 detik

Dashboard

<5 detik

---

# Scaling Strategy

Jika jumlah data bertambah:

Gunakan Partition Sheet.

Contoh:

TB_EXAM_RESULT_2026

TB_EXAM_RESULT_2027

TB_EXAM_RESULT_2028

History lama dapat dipindahkan tanpa mengubah Repository.

---

# Backup Strategy

Backup dilakukan secara berkala.

Minimal:

Daily

Weekly

Monthly

Backup bersifat Read Only.

---

# Security

Spreadsheet tidak boleh diakses langsung oleh Frontend.

Seluruh akses melalui:

Repository

↓

Service

↓

Controller

↓

API

---

# Summary

Database pada EM Enterprise Platform merupakan lapisan penyimpanan data.

Database tidak mengandung Business Logic.

Seluruh validasi, perhitungan, workflow dan aturan bisnis harus berada pada Service Layer.

Repository menjadi satu-satunya komponen yang diperbolehkan berinteraksi dengan Spreadsheet.
