# Workflow Standard

---

# Purpose

Dokumen ini mendefinisikan standar penulisan Workflow pada EM Enterprise Platform.

Seluruh Business Process wajib didokumentasikan sebagai Workflow sebelum implementasi dimulai.

Workflow menjadi acuan utama bagi:

- Business Analyst
- System Analyst
- Software Developer
- QA
- Future Developer

Tidak diperbolehkan membuat fitur baru tanpa Workflow.

---

# Workflow Philosophy

Platform menggunakan pendekatan berikut.

Business Requirement

↓

Use Case

↓

Workflow

↓

Service

↓

Repository

↓

Implementation

Workflow merupakan jembatan antara Business Requirement dan Source Code.

---

# Workflow Naming Standard

Setiap Workflow menggunakan format berikut.

MODULE-WF-XXX

Contoh

TRN-WF-001

Training Start Exam

TRN-WF-002

Training Resume Exam

TRN-WF-003

Training Save Answer

TRN-WF-004

Training Submit Exam

MNT-WF-001

Maintenance Create Work Order

MON-WF-001

Monitoring Alarm Notification

INV-WF-001

Inventory Issue Material

CAL-WF-001

Calibration Reminder

ADM-WF-001

Create User

---

# Module Prefix

| Prefix | Module |
|---------|--------|
| TRN | Training |
| MNT | Maintenance |
| MON | Monitoring |
| INV | Inventory |
| CAL | Calibration |
| ADM | Administration |
| SYS | System |
| SHR | Shared Services |

---

# Workflow Number

001–099

Core Workflow

100–199

Administration

200–299

Background Process

300–399

Integration

400–499

Reserved

---

# Workflow Status

Workflow memiliki status berikut.

Draft

Approved

Deprecated

Archived

---

# Workflow Version

Setiap perubahan Workflow harus menaikkan Version.

Contoh

1.0

Initial Release

1.1

Minor Update

2.0

Major Change

---

# Workflow Template

Setiap Workflow wajib mengikuti struktur berikut.

---

Workflow ID

TRN-WF-001

---

Workflow Name

Start Exam

---

Status

Approved

---

Version

1.0

---

Priority

Critical

---

Module

Training

---

Owner

Engineering Department

---

Purpose

Menjelaskan tujuan Workflow.

---

Trigger

Kapan Workflow dijalankan.

---

Actor

Siapa yang menjalankan Workflow.

---

Precondition

Syarat sebelum Workflow dapat dijalankan.

---

Post Condition

Kondisi setelah Workflow selesai.

---

Business Flow

Langkah bisnis.

---

System Flow

Langkah sistem.

---

Validation

Validasi yang dilakukan.

---

Business Rules

Aturan bisnis.

---

Repository Impact

Repository yang digunakan.

---

Entity Impact

Entity yang digunakan.

---

Security

Validasi keamanan.

---

Performance Target

Target Response Time.

---

Exception Handling

Apa yang dilakukan apabila terjadi Error.

---

Audit

Apa saja yang dicatat.

---

Future Enhancement

Ide pengembangan berikutnya.

---

# Workflow Lifecycle

Draft

↓

Review

↓

Approved

↓

Implemented

↓

Released

↓

Deprecated

↓

Archived

---

# Workflow Dependency

Workflow dapat memanggil Workflow lain.

Contoh

TRN-WF-001

↓

TRN-WF-003

↓

TRN-WF-004

Namun Workflow tidak boleh membentuk Circular Dependency.

---

# Workflow Granularity

Satu Workflow hanya memiliki satu tujuan.

Benar

TRN-WF-001

Start Exam

Salah

TRN-WF-001

Start Exam

+

Submit Exam

---

# Workflow Classification

## Core Workflow

Workflow utama sistem.

Contoh

Login

Start Exam

Submit Exam

Create Work Order

---

## Administration Workflow

Workflow konfigurasi.

Contoh

Create User

Assign Role

Change Configuration

---

## Background Workflow

Workflow otomatis.

Contoh

Auto Timeout

Auto Reminder

Auto Archive

Auto Backup

---

## Integration Workflow

Workflow komunikasi antar sistem.

Telegram

Email

REST API

Webhook

---

# Workflow Design Rules

Workflow tidak boleh mengetahui implementasi.

Workflow hanya menjelaskan proses bisnis.

Spreadsheet tidak boleh muncul pada Workflow.

Nama Function tidak boleh muncul.

Nama File tidak boleh muncul.

Workflow harus tetap valid walaupun implementasi berubah.

---

# Workflow Relationship

Use Case

↓

Workflow

↓

Service

↓

Repository

↓

Spreadsheet

Workflow tidak boleh langsung menunjuk Spreadsheet.

---

# Workflow Review Checklist

Sebelum Workflow disetujui.

Checklist berikut harus terpenuhi.

☐ Tujuan jelas

☐ Trigger jelas

☐ Actor jelas

☐ Validation jelas

☐ Business Rule jelas

☐ Repository jelas

☐ Security jelas

☐ Exception jelas

☐ Audit jelas

☐ Future Enhancement tersedia

---

# Summary

Workflow merupakan fondasi implementasi.

Seluruh pengembangan harus dimulai dari Workflow.

Source Code harus mengikuti Workflow.

Bukan sebaliknya.
