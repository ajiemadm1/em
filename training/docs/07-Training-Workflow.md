# Training Workflow

---

# Purpose

Dokumen ini mendefinisikan seluruh Business Workflow pada Training Module.

Workflow menjadi acuan implementasi seluruh Business Logic.

Seluruh perubahan Business Process harus dilakukan pada dokumen ini sebelum dilakukan perubahan Source Code.

---

# Workflow Index

| Workflow | Name | Status |
|----------|------|--------|
| TRN-WF-001 | Start Exam | Approved |
| TRN-WF-002 | Resume Exam | Approved |
| TRN-WF-003 | Save Answer | Approved |
| TRN-WF-004 | Submit Exam | Approved |
| TRN-WF-005 | Auto Submit | Approved |
| TRN-WF-006 | Timeout Session | Approved |
| TRN-WF-007 | Cancel Session | Approved |
| TRN-WF-008 | Calculate Result | Approved |
| TRN-WF-009 | Generate Certificate | Planned |
| TRN-WF-010 | Review Exam | Planned |

---

# TRN-WF-001

## Workflow Information

| Item | Value |
|------|-------|
| Workflow ID | TRN-WF-001 |
| Name | Start Exam |
| Module | Training |
| Version | 1.0 |
| Status | Approved |
| Priority | Critical |

---

## Purpose

Memulai sesi ujian baru.

---

## Trigger

User menekan tombol

Start Exam

---

## Actor

Training Participant

---

## Preconditions

- User sudah Login.
- User memiliki hak akses.
- Exam masih aktif.
- Belum ada Session Running.

---

## Business Flow

1.

User memilih Exam.

↓

2.

Sistem memvalidasi Login.

↓

3.

Sistem memvalidasi Permission.

↓

4.

Sistem mengambil konfigurasi Exam.

↓

5.

Sistem melakukan Random Question.

↓

6.

Sistem membuat Exam Session.

↓

7.

Sistem mengembalikan Question ke Browser.

↓

8.

Timer dimulai.

---

## System Flow

Browser

↓

ExamController

↓

ExamService

↓

QuestionService

↓

SessionService

↓

SessionRepository

↓

Spreadsheet

↓

Browser

---

## Repository Used

QuestionRepository

SessionRepository

ConfigRepository

---

## Entity Used

Exam

Question

ExamSession

User

---

## Validation

- Session tidak boleh Running.
- Exam harus aktif.
- Question tersedia.
- Jumlah soal sesuai konfigurasi.
- User memiliki akses.

---

## Business Rules

- Question diacak.
- Jawaban benar tidak dikirim ke Browser.
- Session dibuat sebelum soal ditampilkan.
- Signature dibuat saat Session dibuat.

---

## Security

- Validate Session.
- Validate Permission.
- Validate Signature.
- Validate Timestamp.

---

## Performance

Target

< 2 Second

---

## Exception

Question kosong

↓

Exam dibatalkan.

Session gagal dibuat

↓

Question tidak dikirim.

Permission gagal

↓

Access Denied.

---

## Audit

Log berikut wajib dicatat.

- User
- Exam
- Session
- Start Time
- IP
- Browser

---

## Future Enhancement

- Multiple Question Set.
- Adaptive Exam.
- Random by Difficulty.

---

# TRN-WF-002

## Workflow Information

| Item | Value |
|------|-------|
| Workflow ID | TRN-WF-002 |
| Name | Resume Exam |
| Status | Approved |

---

## Purpose

Melanjutkan Exam yang masih Running.

---

## Preconditions

- Session masih Running.
- Session belum Timeout.
- Signature valid.

---

## Business Flow

User Login

↓

Cari Running Session

↓

Validasi Signature

↓

Hitung Remaining Time

↓

Kirim Question

↓

Lanjutkan Timer

---

## Repository

SessionRepository

QuestionRepository

---

## Business Rules

- Question tidak boleh berubah.
- Remaining Time dihitung ulang.
- Jawaban sebelumnya dimuat kembali.

---

## Security

- Validate Session
- Validate Signature

---

# TRN-WF-003

## Workflow Information

| Item | Value |
|------|-------|
| Workflow ID | TRN-WF-003 |
| Name | Save Answer |
| Status | Approved |

---

## Purpose

Menyimpan jawaban user selama Exam berlangsung.

---

## Trigger

User memilih jawaban.

---

## Business Flow

Browser

↓

AnswerController

↓

AnswerService

↓

Session Validation

↓

AnswerRepository

↓

Spreadsheet

---

## Business Rules

- Autosave.
- Replace Answer.
- Tidak boleh membuat duplikasi.
- Save tanpa menghentikan Timer.

---

## Repository

AnswerRepository

SessionRepository

---

## Performance

<300 ms

---

# TRN-WF-004

## Workflow Information

| Item | Value |
|------|-------|
| Workflow ID | TRN-WF-004 |
| Name | Submit Exam |
| Status | Approved |

---

## Purpose

Mengakhiri ujian dan menghitung nilai.

---

## Trigger

Submit Button

atau

Auto Submit

---

## Business Flow

Validate Session

↓

Lock Session

↓

Hitung Score

↓

Generate Result

↓

Save Result

↓

Update Session

↓

Return Result

---

## Repository

AnswerRepository

ResultRepository

SessionRepository

---

## Business Rules

- Submit hanya sekali.
- Session di-lock.
- Score dihitung server.
- Client tidak boleh menghitung Score.

---

## Audit

Submit Time

Duration Used

Score

Status

---

# TRN-WF-005

Purpose

Auto Submit saat Timer habis.

---

# TRN-WF-006

Purpose

Timeout Session.

---

# TRN-WF-007

Purpose

Cancel Session.

---

# TRN-WF-008

Purpose

Calculate Result.

---

# TRN-WF-009

Purpose

Generate Certificate.

---

# TRN-WF-010

Purpose

Review Exam.

---

# Workflow Dependency

TRN-WF-001

↓

TRN-WF-003

↓

TRN-WF-004

↓

TRN-WF-008

↓

TRN-WF-009

---

# Summary

Training Module menggunakan Workflow Driven Development.

Seluruh perubahan Business Logic harus dilakukan melalui Workflow sebelum perubahan Source Code dilakukan.
