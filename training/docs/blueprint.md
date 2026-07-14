# EM Enterprise Platform (EMEP)

Version : 1.0.0

Status : Draft

Author : Engineering Department

Platform : Google Apps Script + GitHub Pages

---

# 1. Vision

## 1.1 Background

Engineering Department membutuhkan sebuah platform digital yang mampu mengintegrasikan proses pembelajaran, asesmen, maintenance, monitoring, dokumentasi, dan pengelolaan data engineering ke dalam satu sistem yang mudah digunakan, cepat, aman, dan mudah dikembangkan.

Platform ini dibangun menggunakan Google Apps Script sebagai backend dan GitHub Pages sebagai frontend sehingga memiliki biaya operasional yang rendah, mudah dipelihara, serta mampu berjalan pada seluruh perangkat tanpa instalasi tambahan.

---

## 1.2 Vision

Membangun satu platform digital terpadu yang menjadi pusat seluruh aktivitas Engineering Department, mulai dari proses pembelajaran, sertifikasi internal, maintenance, monitoring, dokumentasi hingga analisis data.

---

## 1.3 Mission

- Menyediakan platform pembelajaran digital yang modern.
- Mempermudah proses evaluasi kompetensi karyawan.
- Mengurangi pekerjaan manual melalui digitalisasi.
- Mengintegrasikan seluruh aplikasi Engineering Department ke dalam satu platform.
- Membangun sistem yang scalable dan mudah dikembangkan untuk kebutuhan jangka panjang.

---

# 2. Project Scope

Platform ini dirancang sebagai sistem modular.

Modul pertama yang dikembangkan adalah Training Management System.

Selanjutnya platform akan dikembangkan menjadi beberapa modul tambahan seperti Maintenance Management, Monitoring System, Asset Management, Dashboard, Document Management, Knowledge Base dan AI Assistant.

---

# 3. Current Module

Module Name

Training Management System

Domain

https://emdept.com/training

Current Status

Development

Version

2.0

---

# 4. Future Modules

- Maintenance Management
- Monitoring System
- Asset Management
- Preventive Maintenance
- Calibration Management
- Utility Monitoring
- Dashboard & KPI
- Engineering Knowledge Base
- AI Engineering Assistant
- Digital Form
- Inventory Management

---

# 5. Design Philosophy

Platform ini dikembangkan dengan prinsip berikut.

## Performance First

Seluruh proses dirancang untuk meminimalkan pembacaan Spreadsheet dan memaksimalkan penggunaan cache.

## Scalability

Arsitektur harus mampu menangani pertumbuhan jumlah pengguna, modul, dan data tanpa perubahan besar pada struktur sistem.

## Maintainability

Kode harus mudah dipahami, dipisahkan berdasarkan tanggung jawab, dan terdokumentasi dengan baik.

## Security

Seluruh proses validasi dilakukan di backend dan setiap request harus dapat diverifikasi.

## Reusability

Komponen frontend maupun backend harus dapat digunakan kembali oleh seluruh modul.

## Simplicity

Solusi yang sederhana namun stabil lebih diprioritaskan dibanding solusi yang kompleks.

---

# 6. Long Term Target

Platform ini diharapkan mampu mendukung:

- >1000 User
- >100 Modul
- >100.000 Data Record
- >20.000 Question Bank
- Multi Department
- Multi Factory
- Multi Language

# 2. System Architecture

## 2.1 Architecture Overview

EM Enterprise Platform menggunakan arsitektur berlapis (Layered Architecture) dengan prinsip Single Responsibility dan Separation of Concerns.

Setiap layer hanya memiliki satu tanggung jawab dan tidak boleh mengakses layer yang tidak semestinya.

```
Browser
    │
    ▼
GitHub Pages
(HTML, CSS, JavaScript)
    │
    ▼
Apps Script Web API (Router)
    │
    ▼
Business Service Layer
    │
    ├── AuthService
    ├── SessionService
    ├── ExamService
    ├── QuestionService
    ├── AnswerService
    ├── StatusService
    ├── ResultService
    ├── ReportService
    ├── NotificationService
    └── SecurityService
    │
    ▼
DataService
    │
    ▼
Google Spreadsheet
```

---

## 2.2 Architecture Principle

Seluruh platform mengikuti prinsip berikut.

### Layer Separation

Setiap layer hanya boleh berkomunikasi dengan layer di bawahnya.

Browser
↓

Router
↓

Service
↓

DataService
↓

Spreadsheet

Tidak boleh ada layer yang melompati layer lainnya.

---

### Single Responsibility Principle

Setiap Service hanya memiliki satu tanggung jawab.

Contoh:

SessionService hanya mengelola session.

QuestionService hanya mengelola bank soal.

AnswerService hanya mengelola jawaban.

ResultService hanya menghitung hasil.

---

### Stateless Service

Seluruh Service tidak menyimpan state.

Semua informasi berasal dari request dan database.

Dengan demikian sistem lebih mudah dipelihara dan dikembangkan.

---

### Centralized Data Access

Seluruh akses Spreadsheet hanya boleh dilakukan melalui DataService.

Service lain tidak diperbolehkan menggunakan SpreadsheetApp secara langsung.

---

### Modular Design

Setiap modul (Training, Maintenance, Monitoring, dll.) berdiri sendiri namun menggunakan komponen bersama (shared component).

---

## 2.3 Request Flow

Contoh alur ketika peserta memulai ujian.

Browser

↓

POST startExam

↓

Router

↓

ExamService.startExam()

↓

StatusService.validate()

↓

SessionService.create()

↓

QuestionService.generate()

↓

DataService.save()

↓

Response

↓

Browser

---

## 2.4 Module Independence

Setiap modul pada EM Enterprise Platform harus dapat berjalan secara independen.

Sebagai contoh:

Training tidak bergantung pada Maintenance.

Maintenance tidak bergantung pada Monitoring.

Monitoring tidak bergantung pada Inventory.

Namun seluruh modul menggunakan komponen bersama seperti:

- Login
- Session
- Notification
- File Upload
- Telegram
- Logging
- Cache

---

## 2.5 Shared Component

Komponen bersama akan ditempatkan pada folder shared sehingga dapat digunakan oleh seluruh modul.

Contoh:

shared/

css/

js/

icons/

components/

utils/

---

## 2.6 Backend Service

Training Module menggunakan Service berikut.

AuthService

Mengelola autentikasi pengguna.

SessionService

Mengelola session ujian.

QuestionService

Menghasilkan soal dan randomisasi.

AnswerService

Menyimpan jawaban peserta.

StatusService

Mengelola status peserta.

ResultService

Menghitung nilai.

ReportService

Menghasilkan laporan.

NotificationService

Mengirim Telegram, Email, dan notifikasi lainnya.

SecurityService

Validasi request dan keamanan.

DataService

Satu-satunya layer yang boleh mengakses Spreadsheet.

---

## 2.7 Frontend Component

Frontend dibangun menggunakan Vanilla JavaScript.

Komponen dibuat reusable.

Contoh:

Sidebar

Topbar

Modal

Spinner

Loading

Toast

Confirm Dialog

Message Box

Card

Table

Form

Semua modul wajib menggunakan komponen yang sama agar tampilan platform tetap konsisten.

---

## 2.8 Scalability Target

Arsitektur ini dirancang agar mampu mendukung minimal:

1.000 User

50 Modul

20.000 Soal

500.000 Jawaban

1.000.000 Record

tanpa perlu melakukan redesign arsitektur.


# 3. Database Design

## 3.1 Database Philosophy

Walaupun platform menggunakan Google Spreadsheet sebagai media penyimpanan data, seluruh desain database mengikuti konsep Relational Database.

Setiap Sheet diperlakukan sebagai sebuah Entity.

Seluruh hubungan antar Entity dirancang agar mudah dipindahkan ke database relasional seperti MySQL, PostgreSQL ataupun SQL Server tanpa perubahan struktur aplikasi.

Dengan pendekatan ini, Google Spreadsheet hanya berfungsi sebagai storage engine, sedangkan desain datanya mengikuti standar Enterprise Database Design.

---

## 3.2 Database Principle

Platform menggunakan prinsip berikut.

### Single Responsibility Entity

Satu Entity hanya menyimpan satu jenis informasi.

Contoh:

Exam_Session hanya menyimpan Session.

Exam_Answer hanya menyimpan Jawaban.

Exam_Result hanya menyimpan Nilai.

Tidak diperbolehkan mencampur beberapa jenis data dalam satu Entity.

---

### Normalization

Database mengikuti prinsip normalisasi.

Tidak diperbolehkan menyimpan data yang sama pada beberapa Entity kecuali memang dibutuhkan untuk optimasi.

---

### Primary Key

Setiap Entity wajib memiliki Primary Key.

Primary Key harus unik.

Primary Key tidak boleh berubah.

---

### Foreign Key

Hubungan antar Entity menggunakan Foreign Key.

Contoh:

SessionId

CaseId

QuestionId

UserId

---

### JSON Storage

JSON hanya digunakan apabila memang diperlukan.

Tidak diperbolehkan menggunakan JSON untuk menggantikan struktur tabel.

---

### Auditability

Seluruh perubahan penting harus dapat ditelusuri.

Platform harus mampu mengetahui:

Siapa

Kapan

Apa yang berubah

---

## 3.3 Entity Relationship

Training Module terdiri dari Entity berikut.

User

↓

Exam_Status

↓

Exam_Session

↓

Exam_Answer

↓

Exam_Result

↓

Exam_Log

Sedangkan

Quest_V1

Det_Case_V1

berfungsi sebagai Master Data.

---

## 3.4 Master Entity

Master Entity merupakan data yang relatif jarang berubah.

Master Entity terdiri dari:

Case

Question

User

Role

Module

Parameter

Master Entity hanya dapat diubah oleh Administrator.

---

## 3.5 Transaction Entity

Transaction Entity merupakan data yang terus bertambah.

Contoh:

Exam_Session

Exam_Answer

Exam_Result

Exam_Log

Transaction Entity tidak boleh digunakan sebagai Master Data.

---

## 3.6 Lookup Entity

Lookup Entity digunakan untuk mempercepat pencarian.

Contoh:

Exam_Status

Progress

Notification

Lookup Entity boleh berisi data hasil perhitungan selama bertujuan meningkatkan performa.

---

## 3.7 Data Ownership

Setiap Entity memiliki Owner.

Contoh:

Exam_Session

Owner

SessionService

Exam_Answer

Owner

AnswerService

Exam_Result

Owner

ResultService

Tidak diperbolehkan Service lain mengubah Entity yang bukan miliknya.

---

# Entity : TB_CASE

## Purpose

TB_CASE menyimpan seluruh konfigurasi Training yang dapat diikuti oleh peserta.

Satu Training dapat memiliki banyak Question.

Satu Training dapat diikuti oleh banyak peserta.

TB_CASE merupakan Master Entity.

---

## Owner

ExamService

---

## Entity Type

Master

---

## Primary Key

CaseId

---

## Relationship

TB_CASE

↓

TB_QUESTION

↓

TB_EXAM_SESSION

↓

TB_EXAM_RESULT

---

## Columns

|Field|Type|Required|Description|
|------|------|-----------|----------------|
|CaseId|String|Yes|Unique ID Training|
|Title|String|Yes|Judul Training|
|Description|Text|No|Deskripsi|
|Category|String|Yes|Kategori|
|Duration|Integer|Yes|Menit|
|PassingScore|Integer|Yes|Nilai minimum|
|QuestionCount|Integer|Yes|Jumlah soal yang diambil|
|QuestionPool|Integer|Yes|Jumlah soal tersedia|
|RandomQuestion|Boolean|Yes|Random soal|
|RandomOption|Boolean|Yes|Random pilihan|
|AllowResume|Boolean|Yes|Resume exam|
|AllowRetest|Boolean|Yes|Retest|
|MaxAttempt|Integer|Yes|Jumlah maksimal ujian|
|ShowScore|Boolean|Yes|Tampilkan nilai|
|ShowDiscussion|Boolean|Yes|Tampilkan pembahasan|
|Certificate|Boolean|Yes|Generate sertifikat|
|Status|Enum|Yes|Active/Inactive|
|CreatedBy|String|Yes|Pembuat|
|CreatedDate|Datetime|Yes|Tanggal dibuat|
|UpdatedBy|String|No|Terakhir update|
|UpdatedDate|Datetime|No|Tanggal update|

---

## Business Rules

CaseId harus unik.

Status harus Active agar dapat diikuti peserta.

Duration harus lebih besar dari nol.

PassingScore bernilai 0–100.

QuestionCount tidak boleh lebih besar daripada QuestionPool.

MaxAttempt minimal 1.


---

# Entity : TB_QUESTION

## Purpose

TB_QUESTION menyimpan seluruh bank soal yang digunakan dalam sistem Training Management.

Setiap soal hanya dimiliki oleh satu Training (TB_CASE), namun satu Training dapat memiliki banyak soal.

Entity ini merupakan sumber utama pembentukan paket ujian.

---

## Owner

QuestionService

---

## Entity Type

Master

---

## Primary Key

QuestionId

---

## Foreign Key

CaseId

---

## Relationship

TB_CASE (1)

↓

TB_QUESTION (N)

↓

TB_EXAM_ANSWER

---

## Columns

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| QuestionId | String | Yes | Primary Key |
| CaseId | String | Yes | FK ke TB_CASE |
| QuestionNo | Integer | Yes | Nomor soal |
| Category | String | No | Kategori soal |
| Level | Enum | No | Basic / Intermediate / Advanced |
| QuestionType | Enum | Yes | Single Choice / Multiple Choice / True False / Essay |
| Question | Text | Yes | Isi soal |
| OptionA | Text | No | Pilihan A |
| OptionB | Text | No | Pilihan B |
| OptionC | Text | No | Pilihan C |
| OptionD | Text | No | Pilihan D |
| OptionE | Text | No | Pilihan E |
| CorrectAnswer | String | Yes | Jawaban benar |
| Explanation | Text | No | Pembahasan |
| Image | String | No | Link gambar |
| Video | String | No | Link video |
| Score | Decimal | Yes | Bobot nilai |
| Randomizable | Boolean | Yes | Boleh diacak |
| Status | Enum | Yes | Active / Inactive |
| CreatedBy | String | Yes | Pembuat |
| CreatedDate | Datetime | Yes | Tanggal dibuat |
| UpdatedBy | String | No | Terakhir update |
| UpdatedDate | Datetime | No | Terakhir update |

---

## Business Rules

QuestionId harus unik.

Question wajib memiliki CorrectAnswer.

Score minimal lebih besar dari nol.

QuestionType menentukan validasi Option.

Jika QuestionType = Essay maka OptionA sampai OptionE boleh kosong.

Jika Status = Inactive maka soal tidak boleh dipakai saat generate exam.

Jika Randomizable = False maka posisi soal harus dipertahankan sesuai QuestionNo.

---

## Validation Rules

CaseId harus tersedia pada TB_CASE.

CorrectAnswer harus sesuai pilihan yang tersedia.

Image harus berupa URL yang valid.

Video harus berupa URL yang valid.

Score harus bernilai positif.

---

## Index Recommendation

Primary Index

QuestionId

Secondary Index

CaseId

CaseId + Status

CaseId + Level

CaseId + Category

---

## Used By

QuestionService

ExamService

ResultService

ReportService


---

# Entity : TB_EXAM_STATUS

## Purpose

TB_EXAM_STATUS menyimpan status terbaru peserta terhadap setiap Training.

Entity ini digunakan sebagai lookup cepat sehingga sistem tidak perlu menghitung ulang seluruh histori ujian setiap kali peserta membuka halaman Training.

TB_EXAM_STATUS merupakan ringkasan (summary table) dari seluruh aktivitas ujian peserta.

---

## Owner

StatusService

---

## Entity Type

Lookup

---

## Primary Key

StatusId

---

## Foreign Key

UserId

CaseId

---

## Relationship

TB_USER (1)

↓

TB_EXAM_STATUS (N)

↑

TB_CASE (1)

---

## Columns

| Field | Type | Required | Description |
|---------|---------|---------|---------|
| StatusId | String | Yes | Primary Key |
| UserId | String | Yes | User |
| CaseId | String | Yes | Training |
| AttemptCount | Integer | Yes | Total attempt |
| BestScore | Decimal | Yes | Nilai tertinggi |
| LastScore | Decimal | Yes | Nilai terakhir |
| Passed | Boolean | Yes | Status lulus |
| FirstPassDate | Datetime | No | Pertama kali lulus |
| LastExamDate | Datetime | No | Ujian terakhir |
| RunningSessionId | String | No | Session aktif |
| CanStart | Boolean | Yes | Boleh mulai ujian |
| Progress | Decimal | Yes | Progress training |
| CertificateGenerated | Boolean | Yes | Sertifikat sudah dibuat |
| CreatedDate | Datetime | Yes | Dibuat |
| UpdatedDate | Datetime | Yes | Terakhir update |

---

## Business Rules

Satu User hanya boleh memiliki satu record per Case.

Kombinasi UserId + CaseId harus unik.

BestScore tidak boleh lebih kecil dari LastScore jika LastScore adalah nilai tertinggi.

RunningSessionId hanya boleh berisi session yang masih aktif.

Passed otomatis berubah menjadi True apabila nilai memenuhi PassingScore.

CertificateGenerated hanya dapat bernilai True apabila Passed = True.

---

## Validation Rules

UserId wajib tersedia.

CaseId wajib tersedia.

AttemptCount tidak boleh negatif.

BestScore berada pada rentang 0–100.

LastScore berada pada rentang 0–100.

Progress berada pada rentang 0–100.

---

## Index Recommendation

Primary Index

StatusId

Secondary Index

UserId

CaseId

UserId + CaseId

Passed

RunningSessionId

---

## Used By

ExamService

SessionService

StatusService

ResultService

ReportService

Frontend Dashboard

---

## Future Enhancement

Learning Path

Training Recommendation

Skill Matrix

Competency Mapping

Department Dashboard

Manager Dashboard


---

# Entity : TB_EXAM_SESSION

## Purpose

TB_EXAM_SESSION menyimpan seluruh informasi mengenai satu sesi ujian yang sedang berlangsung maupun yang telah selesai.

Setiap peserta yang memulai ujian akan menghasilkan satu Session.

Entity ini menjadi pusat validasi keamanan, timer, resume exam, timeout, dan proses submit ujian.

TB_EXAM_SESSION merupakan Transaction Entity.

---

## Owner

SessionService

---

## Entity Type

Transaction

---

## Primary Key

SessionId

---

## Foreign Key

UserId

CaseId

---

## Relationship

TB_USER (1)

↓

TB_EXAM_SESSION (N)

↓

TB_EXAM_ANSWER (N)

↓

TB_EXAM_RESULT (1)

---

## Columns

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| SessionId | String | Yes | UUID Session |
| UserId | String | Yes | Peserta |
| CaseId | String | Yes | Training |
| StartTime | Datetime | Yes | Waktu mulai |
| EndTime | Datetime | Yes | Waktu selesai (batas waktu ujian) |
| Duration | Integer | Yes | Durasi ujian (menit) |
| Status | Enum | Yes | Running / Completed / Cancelled / Timeout / Expired |
| AnswerKey | JSON | Yes | Kunci jawaban hasil generate |
| Questions | JSON | Yes | Paket soal yang diterima peserta |
| Signature | String | Yes | Digital Signature Session |
| Answers | JSON | No | Cache jawaban terakhir (optional) |
| SubmitTime | Datetime | No | Waktu submit |
| Score | Decimal | No | Nilai akhir |
| DurationUsed | Integer | No | Lama pengerjaan (detik) |
| Remark | Text | No | Catatan |

---

## Session Life Cycle

Created

↓

Running

↓

Completed

↓

Archived

atau

Created

↓

Running

↓

Timeout

↓

Archived

atau

Created

↓

Running

↓

Cancelled

↓

Archived

---

## Business Rules

SessionId harus unik.

Satu Session hanya boleh dimiliki satu User.

Status awal selalu Running.

EndTime dihitung berdasarkan StartTime + Duration.

Session tidak boleh diubah setelah Completed.

Score hanya boleh diisi setelah proses submit selesai.

Signature harus valid sebelum Session digunakan.

DurationUsed dihitung otomatis.

Answers hanya digunakan sebagai cache dan bukan sumber data utama.

---

## Validation Rules

UserId wajib tersedia.

CaseId wajib tersedia.

Duration lebih besar dari nol.

EndTime lebih besar dari StartTime.

Signature harus lolos validasi SecurityService.

Status harus sesuai ENUM.

---

## Index Recommendation

Primary Index

SessionId

Secondary Index

UserId

CaseId

Status

UserId + Status

CaseId + Status

StartTime

EndTime

---

## Used By

ExamService

SessionService

AnswerService

ResultService

StatusService

SecurityService

ReportService

---

## Security

Setiap Session memiliki Digital Signature.

Signature digunakan untuk memastikan Session tidak dimodifikasi secara langsung dari Spreadsheet.

Setiap request penting wajib melakukan validasi Signature sebelum diproses.

---

## Performance Notes

TB_EXAM_SESSION hanya menyimpan metadata ujian.

Jawaban peserta yang sebenarnya disimpan pada TB_EXAM_ANSWER.

Dengan pemisahan ini ukuran Session tetap kecil walaupun jumlah soal sangat banyak.

---

## Future Enhancement

Session Recovery

Multi Device Detection

Device Fingerprint

IP Logging

Browser Logging

Heartbeat Monitoring

Auto Save Interval

Offline Synchronization

---

# Entity : TB_EXAM_ANSWER

## Purpose

TB_EXAM_ANSWER menyimpan seluruh jawaban peserta selama proses ujian berlangsung.

Setiap jawaban disimpan secara independen sehingga perubahan pada satu soal tidak mempengaruhi soal lainnya.

Entity ini merupakan sumber utama seluruh jawaban peserta.

---

## Owner

AnswerService

---

## Entity Type

Transaction

---

## Primary Key

AnswerId

---

## Foreign Key

SessionId

QuestionId

UserId

CaseId

---

## Relationship

TB_EXAM_SESSION (1)

↓

TB_EXAM_ANSWER (N)

↓

TB_EXAM_RESULT

---

## Columns

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| AnswerId | String | Yes | UUID |
| SessionId | String | Yes | FK Session |
| UserId | String | Yes | Peserta |
| CaseId | String | Yes | Training |
| QuestionId | String | Yes | Soal |
| SelectedAnswer | String | No | Jawaban peserta |
| IsMarked | Boolean | Yes | Bookmark / Review Later |
| IsChanged | Boolean | Yes | Pernah diubah |
| ChangedCount | Integer | Yes | Jumlah perubahan jawaban |
| AnswerTime | Datetime | No | Pertama dijawab |
| LastUpdate | Datetime | Yes | Terakhir diubah |
| TimeSpent | Integer | No | Lama di soal (detik) |
| Device | String | No | Browser/Device |
| Status | Enum | Yes | Answered / Blank |

---

## Business Rules

Satu Session hanya boleh memiliki satu jawaban untuk satu Question.

Kombinasi SessionId + QuestionId harus unik.

Jawaban boleh diubah selama Session masih Running.

Setelah Session Completed seluruh jawaban menjadi Read Only.

ChangedCount bertambah setiap kali peserta mengganti jawaban.

TimeSpent dihitung otomatis.

Bookmark tidak mempengaruhi penilaian.

---

## Validation Rules

Session harus masih Running.

Question harus berasal dari Session tersebut.

SelectedAnswer harus sesuai format QuestionType.

User tidak boleh menjawab Session milik user lain.

---

## Index Recommendation

Primary Index

AnswerId

Secondary Index

SessionId

QuestionId

UserId

CaseId

SessionId + QuestionId

SessionId + Status

---

## Used By

AnswerService

ExamService

ResultService

ReportService

Review Mode

Discussion Mode

---

## Retention Policy

Permanent

Jawaban peserta tidak boleh dihapus karena merupakan bagian dari histori pembelajaran dan dapat digunakan untuk analisis kompetensi di masa depan.

---

## Future Enhancement

Essay Score

AI Essay Evaluation

Confidence Level

Audio Answer

Image Answer

Drawing Answer

---

# Entity : TB_EXAM_RESULT

## Purpose

TB_EXAM_RESULT menyimpan hasil akhir dari setiap Session ujian.

Entity ini merupakan sumber utama untuk Dashboard, Report, Leaderboard, Certificate, Competency Matrix, serta seluruh proses analisa hasil pembelajaran.

TB_EXAM_RESULT hanya dibuat satu kali setelah proses Submit selesai.

Entity ini tidak boleh diubah kembali kecuali oleh Administrator.

---

## Owner

ResultService

---

## Entity Type

Transaction

---

## Primary Key

ResultId

---

## Foreign Key

SessionId

UserId

CaseId

---

## Relationship

TB_EXAM_SESSION (1)

↓

TB_EXAM_RESULT (1)

↓

TB_EXAM_STATUS

---

## Columns

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| ResultId | String | Yes | UUID |
| SessionId | String | Yes | FK Session |
| UserId | String | Yes | Peserta |
| CaseId | String | Yes | Training |
| SubmitTime | Datetime | Yes | Waktu submit |
| TotalQuestion | Integer | Yes | Jumlah soal |
| Answered | Integer | Yes | Soal dijawab |
| Unanswered | Integer | Yes | Soal kosong |
| Correct | Integer | Yes | Jawaban benar |
| Wrong | Integer | Yes | Jawaban salah |
| Score | Decimal | Yes | Nilai akhir |
| Percentage | Decimal | Yes | Persentase |
| PassingScore | Decimal | Yes | Nilai minimal lulus |
| Passed | Boolean | Yes | Status lulus |
| Rank | Integer | No | Ranking |
| Grade | String | No | Grade |
| DurationUsed | Integer | Yes | Lama pengerjaan |
| AverageTimePerQuestion | Decimal | No | Detik per soal |
| GeneratedDate | Datetime | Yes | Waktu generate |

---

## Business Rules

Satu Session hanya boleh menghasilkan satu Result.

Result dibuat setelah seluruh proses penilaian selesai.

Result bersifat Read Only.

Score dihitung berdasarkan AnswerKey pada Session.

Passed ditentukan menggunakan PassingScore pada TB_CASE.

AverageTimePerQuestion dihitung otomatis.

---

## Validation Rules

Session harus Completed.

Jumlah Correct + Wrong + Unanswered harus sama dengan TotalQuestion.

Score berada pada rentang 0–100.

Percentage berada pada rentang 0–100.

DurationUsed tidak boleh negatif.

---

## Index Recommendation

Primary Index

ResultId

Secondary Index

SessionId

UserId

CaseId

Passed

Score

SubmitTime

---

## Used By

ResultService

StatusService

Dashboard

Certificate

Report

Leaderboard

Competency Matrix

---

## Retention Policy

Permanent

Result merupakan histori kompetensi peserta dan tidak boleh dihapus.

---

## Future Enhancement

Department Ranking

Factory Ranking

Learning Analytics

Competency Gap Analysis

AI Recommendation

Training Effectiveness Analysis


---

# Entity : TB_EXAM_LOG

## Purpose

TB_EXAM_LOG menyimpan seluruh aktivitas penting yang terjadi selama proses ujian.

Entity ini digunakan untuk keperluan audit, troubleshooting, investigasi keamanan, serta analisa perilaku pengguna.

TB_EXAM_LOG bukan merupakan sumber utama data ujian dan tidak digunakan untuk proses perhitungan nilai.

---

## Owner

LogService

---

## Entity Type

Transaction

---

## Primary Key

LogId

---

## Foreign Key

SessionId

UserId

CaseId

---

## Relationship

TB_EXAM_SESSION (1)

↓

TB_EXAM_LOG (N)

---

## Columns

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| LogId | String | Yes | UUID |
| SessionId | String | Yes | FK Session |
| UserId | String | Yes | Peserta |
| CaseId | String | Yes | Training |
| Event | String | Yes | Jenis aktivitas |
| EventDetail | Text | No | Informasi tambahan |
| IPAddress | String | No | IP Client |
| Browser | String | No | Browser |
| Device | String | No | Device |
| Page | String | No | Halaman |
| EventTime | Datetime | Yes | Waktu kejadian |
| Severity | Enum | Yes | Info / Warning / Error |
| Source | String | No | Frontend / Backend |

---

## Business Rules

Log bersifat Append Only.

Log tidak boleh diubah.

Log tidak boleh dihapus secara manual.

Seluruh Event menggunakan UTC Timestamp.

---

## Validation Rules

SessionId wajib tersedia.

UserId wajib tersedia.

Event wajib diisi.

Severity harus sesuai ENUM.

---

## Event Type Recommendation

LOGIN

LOGOUT

START_EXAM

RESUME_EXAM

SAVE_ANSWER

CHANGE_ANSWER

MARK_REVIEW

SUBMIT_EXAM

AUTO_SUBMIT

TIMEOUT

SESSION_EXPIRED

SIGNATURE_INVALID

CHEAT_DETECTED

SYSTEM_ERROR

API_ERROR

---

## Index Recommendation

Primary Index

LogId

Secondary Index

SessionId

UserId

CaseId

Event

EventTime

Severity

---

## Used By

SecurityService

ReportService

Audit

Administrator

Troubleshooting

---

## Retention Policy

2 Years

Log yang berumur lebih dari dua tahun dapat dipindahkan ke arsip.

---

## Future Enhancement

Security Dashboard

User Timeline

Activity Replay

Fraud Detection

Audit Trail

---

# Entity : TB_SYSTEM_LOG

## Purpose

TB_SYSTEM_LOG menyimpan seluruh aktivitas sistem yang tidak berkaitan langsung dengan proses ujian.

Entity ini digunakan oleh seluruh modul dalam EM Enterprise Platform.

Contoh:

Training

Maintenance

Monitoring

Inventory

Calibration

Dashboard

---

## Owner

SystemService

---

## Example Event

LOGIN

LOGOUT

API_ERROR

IMPORT_DATA

EXPORT_DATA

FILE_UPLOAD

FILE_DELETE

USER_CREATED

USER_UPDATED

ROLE_CHANGED

PERMISSION_CHANGED

SYSTEM_EXCEPTION

CACHE_CLEARED

---

## Retention Policy

5 Years


# 4. Backend Architecture

## 4.1 Overview

Backend EM Enterprise Platform dibangun menggunakan Google Apps Script (GAS) dengan pendekatan Service-Oriented Architecture (SOA).

Seluruh Business Logic dipisahkan ke dalam Service yang memiliki tanggung jawab spesifik.

Setiap Service hanya boleh menangani satu domain bisnis (Single Responsibility Principle).

Arsitektur backend dirancang agar mudah dipelihara, mudah diuji, dan mudah dikembangkan.

---

## 4.2 Backend Layer

Browser

↓

Router (doGet / doPost)

↓

Controller

↓

Business Service

↓

DataService

↓

Google Spreadsheet

---

## 4.3 Layer Responsibility

### Router

Bertugas menerima request dari Frontend.

Router tidak diperbolehkan memiliki Business Logic.

Tugas Router:

- menerima request
- validasi action
- memanggil Controller
- mengembalikan response

---

### Controller

Controller bertugas mengatur alur proses.

Controller tidak boleh melakukan akses Spreadsheet.

Controller tidak boleh menghitung Score.

Controller tidak boleh membuat Session.

Controller hanya mengatur urutan pemanggilan Service.

---

### Business Service

Business Service merupakan inti sistem.

Seluruh aturan bisnis ditulis pada layer ini.

Business Service boleh memanggil Service lain.

Business Service tidak boleh mengakses Spreadsheet secara langsung.

---

### DataService

DataService merupakan satu-satunya layer yang boleh menggunakan SpreadsheetApp.

Seluruh proses Create, Read, Update, Delete dilakukan melalui DataService.

---

### Utility

Utility berisi helper umum yang dapat digunakan seluruh sistem.

Contoh:

UUID

Hash

Date

Random

Response

Validation

Formatter

---

## 4.4 Dependency Rule

Dependency hanya boleh mengarah ke bawah.

Browser

↓

Router

↓

Controller

↓

Service

↓

DataService

↓

Spreadsheet

Tidak diperbolehkan:

Service memanggil Router.

DataService memanggil Service.

Utility memanggil Service.

---

## 4.5 Service Communication

Service diperbolehkan memanggil Service lain.

Contoh:

ExamService

↓

QuestionService

↓

SessionService

↓

StatusService

↓

ResultService

Namun setiap Service tetap memiliki tanggung jawab masing-masing.

---

## 4.6 Error Handling

Seluruh Service wajib mengembalikan object yang konsisten.

Format response:

{
    success: Boolean,
    message: String,
    data: Object
}

Tidak diperbolehkan mengembalikan tipe data lain.

---

## 4.7 Logging

Error tidak boleh langsung ditampilkan kepada pengguna.

Error dicatat pada:

TB_SYSTEM_LOG

atau

TB_EXAM_LOG

kemudian Frontend hanya menerima pesan yang sesuai.

---

## 4.8 Cache Strategy

Data Master

menggunakan CacheService.

Data Transaction

tidak menggunakan cache.

Master Data meliputi:

TB_CASE

TB_QUESTION

Parameter

Role

Sedangkan Session, Answer, Result selalu membaca data terbaru.

---

## 4.9 Transaction Principle

Satu Request hanya boleh menghasilkan satu Transaction.

Contoh:

Start Exam

↓

Create Session

↓

Update Status

↓

Return Question

Jika salah satu gagal maka seluruh proses dibatalkan.

---

## 4.10 Coding Principle

Backend mengikuti prinsip berikut:

Single Responsibility

Open Closed Principle

Dependency Inversion

Loose Coupling

High Cohesion

Reusable

Readable

Maintainable

# 4.2 Service Specification

Seluruh Business Logic pada EM Enterprise Platform dipisahkan ke dalam Service yang memiliki tanggung jawab spesifik.

Setiap Service wajib mengikuti prinsip Single Responsibility.

Satu Service tidak diperbolehkan mengambil tanggung jawab Service lain.

---

## Service Dependency

ExamController

↓

ExamService

↓

SessionService

↓

QuestionService

↓

AnswerService

↓

ResultService

↓

StatusService

↓

NotificationService

↓

DataService

---

## Service Rules

Setiap Service:

✓ Boleh memanggil Service lain

✓ Tidak boleh mengakses Spreadsheet secara langsung

✓ Tidak boleh mengakses HTML

✓ Tidak boleh menghasilkan output HTML

✓ Tidak boleh melakukan redirect

✓ Harus mengembalikan Response Object

---

## Naming Convention

Semua Service menggunakan format:

NamaService.gs

Contoh

AuthService.gs

ExamService.gs

SessionService.gs

QuestionService.gs

ResultService.gs

DataService.gs

---

## Public Function

Function yang boleh dipanggil dari Service lain menggunakan format:

startExam()

submitExam()

saveAnswer()

generateQuestion()

calculateScore()

---

## Private Function

Function internal menggunakan prefix underscore.

Contoh

_createSession()

_validateAnswer()

_shuffleQuestion()

_generateSignature()

Function private tidak boleh dipanggil dari luar Service.

---

## Service Communication

Service hanya boleh berkomunikasi melalui Function.

Tidak diperbolehkan membaca Variable Global milik Service lain.

---

## Configuration

Seluruh konfigurasi harus berasal dari Config.gs.

Tidak diperbolehkan membuat nilai tetap (Hardcode) di dalam Service.

Contoh yang benar

DEFAULT_PASSING_SCORE

SESSION_TIMEOUT_MINUTES

CACHE_DURATION

SHEET_EXAM_SESSION

Contoh yang salah

80

15

300

"Exam_Status"

---

## Error Handling

Setiap Service wajib menggunakan format Response yang sama.

{
    success,
    message,
    data
}

Tidak diperbolehkan melempar String secara langsung.

---

## Logging

Service tidak boleh menggunakan Logger.log() pada Production.

Seluruh Error dicatat ke:

TB_SYSTEM_LOG

atau

TB_EXAM_LOG

---

## Cache

Master Data

menggunakan CacheService.

Transaction

tidak menggunakan Cache.

---

## Validation

Setiap Request wajib divalidasi sebelum diproses.

Validation dilakukan sedekat mungkin dengan Business Logic.

---

## Unit Responsibility

Satu Function hanya memiliki satu tujuan.

Contoh

✓ calculateScore()

✓ generateQuestion()

✓ updateStatus()

✗ startExamAndGenerateQuestionAndSaveStatus()

Function yang terlalu panjang harus dipecah menjadi beberapa Function kecil.

---

## Function Length

Target maksimal

100 baris

Apabila melebihi

150 baris

harus dipertimbangkan untuk dipecah.

---

## Nesting

Disarankan maksimal

3 level

Gunakan Early Return untuk mengurangi Nested IF.

---

## Comment

Comment digunakan untuk menjelaskan alasan (Why), bukan menjelaskan sintaks (What).

Contoh yang baik

// Update status setelah seluruh proses submit berhasil.

Contoh yang kurang baik

// Menambahkan angka 1 ke variabel.


# 4.3 Service Responsibility Matrix

Bagian ini menjelaskan tanggung jawab setiap Service.

Seluruh Business Logic harus mengikuti pembagian tanggung jawab berikut.

---

## AuthService

### Purpose

Mengelola autentikasi pengguna.

### Responsibilities

- Login
- Logout
- Session Login
- Token
- Permission
- Authorization

### Must NOT

Tidak boleh mengelola ujian.

Tidak boleh membaca Question.

Tidak boleh menghitung nilai.

---

## ExamService

### Purpose

Mengelola proses ujian.

### Responsibilities

- Start Exam
- Resume Exam
- Submit Exam
- Cancel Exam

### Must NOT

Tidak boleh membaca Spreadsheet.

Tidak boleh menyimpan Answer.

Tidak boleh menghitung Score.

---

## SessionService

### Purpose

Mengelola Session ujian.

### Responsibilities

- Create Session
- Get Session
- Validate Session
- Expire Session
- Cancel Session
- Verify Signature

### Must NOT

Tidak boleh menghitung nilai.

Tidak boleh membaca Question.

---

## QuestionService

### Purpose

Mengelola Question Bank.

### Responsibilities

- Load Question
- Random Question
- Random Option
- Validate Question
- Generate Exam Question

### Must NOT

Tidak boleh membuat Session.

Tidak boleh menghitung Score.

---

## AnswerService

### Purpose

Mengelola jawaban peserta.

### Responsibilities

- Save Answer
- Update Answer
- Get Answer
- Validate Answer

### Must NOT

Tidak boleh menghitung nilai.

Tidak boleh membuat Session.

---

## ResultService

### Purpose

Menghasilkan hasil ujian.

### Responsibilities

- Calculate Score
- Generate Result
- Update Result
- Generate Grade
- Generate Ranking

### Must NOT

Tidak boleh membuat Session.

Tidak boleh menyimpan Question.

---

## StatusService

### Purpose

Mengelola status peserta.

### Responsibilities

- Can Start Exam
- Update Attempt
- Update Passed
- Update Progress

### Must NOT

Tidak boleh menghitung Score.

---

## NotificationService

### Purpose

Mengirim notifikasi.

### Responsibilities

- Telegram
- Email
- Push Notification
- Reminder

---

## SecurityService

### Purpose

Mengelola keamanan sistem.

### Responsibilities

- Signature
- Hash
- Validate Request
- Validate Token
- Verify Session

---

## CacheService

### Purpose

Mengelola Cache.

### Responsibilities

- Save Cache
- Read Cache
- Delete Cache
- Refresh Cache

---

## DataService

### Purpose

Satu-satunya Service yang boleh mengakses Spreadsheet.

### Responsibilities

Create

Read

Update

Delete

Lookup

Batch Update

Batch Read

### Must NOT

Tidak boleh menghitung nilai.

Tidak boleh membuat Session.

Tidak boleh mengacak Question.

---

## Utils

### Purpose

Helper umum.

### Responsibilities

UUID

Date

Random

Formatter

Response

Validator

Converter


# 4.4 Request Lifecycle

Bagian ini menjelaskan alur perjalanan setiap Request mulai dari Browser hingga Response kembali diterima pengguna.

Semua Request harus mengikuti alur ini.

---

## Standard Flow

Browser

↓

Router

↓

Controller

↓

Business Service

↓

DataService

↓

Google Spreadsheet

↓

DataService

↓

Business Service

↓

Controller

↓

Response

↓

Browser

---

## Principle

Request hanya boleh memiliki satu pintu masuk.

Semua Request harus melalui Router.

Tidak diperbolehkan Frontend memanggil Business Service secara langsung.

---

## Response Principle

Setiap Response harus menggunakan format yang sama.

{
    success: Boolean,
    message: String,
    data: Object
}

---

## Validation Sequence

Request

↓

Validate Parameter

↓

Validate Authentication

↓

Validate Permission

↓

Validate Business Rule

↓

Execute Business Logic

↓

Save Transaction

↓

Return Response

---

## Error Sequence

Request

↓

Validation Error

↓

Return Response

atau

Request

↓

Business Error

↓

Rollback

↓

Write Log

↓

Return Response

---

## Cache Sequence

Request

↓

Cache

↓

Found

↓

Return

atau

Request

↓

Cache Miss

↓

Spreadsheet

↓

Save Cache

↓

Return

---

## Logging Sequence

Request

↓

Business Logic

↓

Exception

↓

TB_SYSTEM_LOG

↓

Return Error Response

---

## Transaction Rule

Satu Request hanya boleh menghasilkan satu Transaction utama.

Contoh

Start Exam

↓

Create Session

↓

Update Status

↓

Return Question

---

## Async Task

Task yang tidak mempengaruhi Response sebaiknya dijalankan setelah Response selesai.

Contoh

Telegram Notification

Email

Generate Certificate

Analytics

Audit

---

## Timeout Strategy

Request memiliki batas waktu.

Jika melebihi batas maka Request dibatalkan.

---

## Retry Strategy

Retry hanya diperbolehkan untuk proses Read.

Proses Create tidak boleh Retry tanpa validasi.

---

## Idempotency

Submit Exam

Create Session

Generate Result

harus bersifat Idempotent.

Request yang sama tidak boleh menghasilkan data ganda.

---

## Security Check

Setiap Request penting harus memvalidasi:

Authentication

Authorization

Session

Signature

Expired Time

---

## Audit Trail

Seluruh Request penting dicatat pada:

TB_SYSTEM_LOG

atau

TB_EXAM_LOG

---

## Performance Target

Master Data

< 300 ms

Transaction

< 1 second

Report

< 5 second

## Workflow Naming Standard

Seluruh Workflow menggunakan format berikut.

MODULE-WF-XXX

Contoh

TRN-WF-001

Training Start Exam

TRN-WF-002

Training Resume Exam

TRN-WF-003

Training Save Answer

MNT-WF-001

Maintenance Create Work Order

INV-WF-001

Inventory Issue Material

MON-WF-001

Monitoring Alarm

---

Workflow Number

001-099

Core Workflow

100-199

Administration

200-299

Background Process

300-399

Integration

400-499

Future

# 4.5 Workflow Catalogue

Workflow merupakan standar proses bisnis yang digunakan oleh EM Enterprise Platform.

Setiap Workflow harus memiliki urutan proses yang jelas.

Workflow menjadi acuan utama dalam implementasi kode.

---

# WF-001 Start Exam

## Purpose

Memulai sesi ujian baru.

---

## Trigger

User menekan tombol:

Start Exam

---

## Actor

User

---

## Preconditions

- User sudah Login
- User memiliki hak akses
- Training aktif
- Belum ada Session Running
- Masih memiliki kesempatan ujian

---

## Workflow

Step 1

Validate Login

↓

Step 2

Validate Permission

↓

Step 3

Validate Training

↓

Step 4

Check Running Session

↓

Step 5

Generate Question

↓

Step 6

Generate Answer Key

↓

Step 7

Create Session

↓

Step 8

Update Exam Status

↓

Step 9

Return Question

---

## Output

SessionId

Question List

Start Time

End Time

Duration

---

## Error

Session Running

Training Closed

Question Empty

Permission Denied

Database Error

---

## Related Service

ExamService

SessionService

QuestionService

StatusService

---

## Related Entity

TB_CASE

TB_QUESTION

TB_EXAM_SESSION

TB_EXAM_STATUS

---

# WF-002 Resume Exam

## Purpose

Melanjutkan ujian yang masih berjalan.

---

## Trigger

User membuka kembali halaman ujian.

---

## Preconditions

Session masih Running.

Belum Timeout.

Signature valid.

---

## Workflow

Validate Session

↓

Validate Signature

↓

Load Question

↓

Load Answer

↓

Calculate Remaining Time

↓

Return Session

---

## Output

Question

Answer

Remaining Time

SessionId

---

## Related Service

SessionService

AnswerService

---

## Related Entity

TB_EXAM_SESSION

TB_EXAM_ANSWER


# WF-003 Save Answer

## Purpose

Menyimpan jawaban peserta secara aman, cepat, dan konsisten tanpa mengganggu jalannya ujian.

Workflow ini harus mendukung Auto Save maupun Manual Save.

---

## Trigger

- User memilih jawaban
- User mengganti jawaban
- Auto Save Timer
- Pindah ke soal berikutnya

---

## Actor

User

---

## Preconditions

- User sudah Login
- Session masih Running
- Session belum Expired
- Signature valid

---

## Business Flow

Step 1

Validate Session

↓

Step 2

Validate Signature

↓

Step 3

Validate Question

↓

Step 4

Validate Answer

↓

Step 5

Update Answer

↓

Step 6

Update Last Activity

↓

Step 7

Write Activity Log

↓

Step 8

Return Success

---

## Service Flow

Browser

↓

ExamController

↓

AnswerService

↓

SessionService

↓

SecurityService

↓

DataService

↓

Response

---

## Database Impact

TB_EXAM_ANSWER

Update

↓

TB_EXAM_SESSION

Update Last Activity

↓

TB_EXAM_LOG

Insert

---

## Output

{
    success : true,
    message : "Answer saved",
    data : {
        questionId,
        answer,
        saveTime
    }
}

---

## Error

Session Expired

Question Invalid

Signature Invalid

Permission Denied

Database Error

---

## Performance Target

< 300 ms

---

## Retry Policy

Allowed

Save Answer merupakan proses yang boleh diulang.

Apabila request yang sama diterima dua kali, sistem hanya memperbarui jawaban terakhir.

---

## Idempotency

Ya

Save Answer tidak boleh menghasilkan record baru apabila jawaban untuk Question yang sama sudah ada.

---

## Logging

SAVE_ANSWER

CHANGE_ANSWER

AUTO_SAVE

---

## Future Enhancement

Offline Save

Batch Save

Real Time Sync

Conflict Resolution

# WF-004 Submit Exam

## Purpose

Mengakhiri sesi ujian, menghitung nilai, menghasilkan hasil ujian, memperbarui status peserta, dan mengunci seluruh jawaban.

Workflow ini merupakan transaksi paling kritikal pada modul Training.

---

## Trigger

- User menekan tombol Submit
- Waktu ujian habis (Auto Submit)
- Administrator melakukan Force Submit

---

## Actor

User

System

Administrator

---

## Preconditions

- Session masih Running
- Signature valid
- Session belum pernah Completed
- Session belum Expired

---

## Business Flow

Step 1

Validate Session

↓

Step 2

Validate Signature

↓

Step 3

Lock Session

↓

Step 4

Save Last Answer

↓

Step 5

Load Answer Key

↓

Step 6

Load User Answer

↓

Step 7

Calculate Score

↓

Step 8

Generate Result

↓

Step 9

Update Exam Status

↓

Step 10

Complete Session

↓

Step 11

Write Audit Log

↓

Step 12

Return Result

---

## Service Flow

Browser

↓

ExamController

↓

ExamService

↓

SessionService

↓

AnswerService

↓

ResultService

↓

StatusService

↓

NotificationService

↓

DataService

↓

Response

---

## Database Impact

TB_EXAM_SESSION

Update

↓

TB_EXAM_RESULT

Insert

↓

TB_EXAM_STATUS

Update

↓

TB_EXAM_LOG

Insert

---

## Output

{
    success : true,
    message : "Exam submitted successfully",
    data : {
        sessionId,
        score,
        passed,
        resultId
    }
}

---

## Error

Session Expired

Session Already Completed

Signature Invalid

Database Error

Calculation Error

---

## Retry Policy

Not Allowed

Submit hanya boleh diproses satu kali.

---

## Idempotency

Mandatory

Jika request Submit dikirim dua kali, sistem wajib mengembalikan Result yang sama tanpa membuat data baru.

---

## Performance Target

< 2 Second

---

## Logging

SUBMIT_EXAM

AUTO_SUBMIT

FORCE_SUBMIT

RESULT_GENERATED

---

## Security

Session Lock

Signature Validation

Permission Validation

Duplicate Submit Detection

---

## Retention Policy

Permanent

Result dan histori submit tidak boleh dihapus.

---

## Future Enhancement

Digital Certificate

Email Notification

Telegram Notification

Manager Approval

Competency Matrix Update

Learning Recommendation


# WF-005 Auto Submit

## Purpose

Mengakhiri sesi ujian secara otomatis ketika waktu ujian telah habis.

Workflow ini menggunakan proses Submit Exam yang sama dengan WF-004, tetapi dipicu oleh sistem.

Auto Submit tidak memiliki proses perhitungan nilai sendiri.

Seluruh proses penilaian menggunakan Workflow Submit Exam.

---

## Trigger

- Countdown Timer mencapai 00:00
- Session melewati EndTime
- Browser kehilangan koneksi terlalu lama (Future)

---

## Actor

System

---

## Preconditions

- Session masih Running
- EndTime telah terlewati
- Session belum Completed
- Session belum Auto Submitted

---

## Business Flow

Step 1

Check Remaining Time

↓

Step 2

Validate Session

↓

Step 3

Mark Auto Submit

↓

Step 4

Call WF-004 Submit Exam

↓

Step 5

Return Result

---

## Service Flow

TimerService

↓

SessionService

↓

ExamService.submitExam()

↓

ResultService

↓

StatusService

↓

Response

---

## Database Impact

TB_EXAM_SESSION

Update

↓

TB_EXAM_RESULT

Insert

↓

TB_EXAM_STATUS

Update

↓

TB_EXAM_LOG

Insert

---

## Output

Sama dengan WF-004 Submit Exam.

---

## Error

Session Already Completed

Session Already Submitted

Database Error

---

## Retry Policy

Not Allowed

---

## Idempotency

Mandatory

Auto Submit hanya boleh terjadi satu kali.

---

## Performance Target

< 2 Second

---

## Logging

AUTO_SUBMIT

TIMEOUT

RESULT_GENERATED

---

## Security

Validate Session

Validate EndTime

Duplicate Detection

---

## Recovery

Jika Auto Submit gagal pada tahap tertentu, sistem harus memastikan Session tidak dapat diproses ulang secara ganda.

---

## Future Enhancement

Background Worker

Queue Processing

Distributed Scheduler

Offline Recovery



   
   

