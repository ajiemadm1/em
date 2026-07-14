# Coding Standard

---

# Purpose

Dokumen ini mendefinisikan standar penulisan Source Code pada EM Enterprise Platform.

Seluruh Developer wajib mengikuti standar ini.

Standar ini dibuat untuk menjaga:

- Konsistensi
- Readability
- Maintainability
- Scalability

---

# Coding Philosophy

Source Code harus:

Mudah Dibaca

↓

Mudah Dipahami

↓

Mudah Dipelihara

↓

Mudah Dikembangkan

Coding bukan ditulis untuk komputer.

Coding ditulis untuk Developer berikutnya.

---

# General Principle

Gunakan:

- KISS
- DRY
- SRP
- High Cohesion
- Loose Coupling
- Fail Fast

---

# File Naming

Controller

ExamController.gs

Service

ExamService.gs

Repository

ExamRepository.gs

Entity

ExamSession.gs

Utility

DateUtil.gs

Security

SecurityService.gs

---

# Function Naming

Gunakan camelCase.

Contoh.

createExamSession()

submitExam()

calculateScore()

saveAnswer()

Jangan.

CreateExam()

doExam()

run1()

---

# Variable Naming

Gunakan nama yang jelas.

Benar

remainingTime

examSession

questionList

Salah

a

temp

x

obj1

---

# Constant Naming

Gunakan UPPER_SNAKE_CASE.

DEFAULT_PASSING_SCORE

SESSION_TIMEOUT

MAX_RETRY

---

# Boolean Naming

Gunakan prefix.

is

has

can

should

Contoh.

isExpired

hasPermission

canSubmit

shouldArchive

---

# Function Rule

Satu Function

↓

Satu Tanggung Jawab.

Panjang maksimal.

50~80 baris.

Jika lebih

↓

Pisahkan.

---

# Function Parameter

Maksimal

5 parameter.

Jika lebih

↓

Gunakan Object.

---

# Return Standard

Semua Service.

return {

success,

code,

message,

data

}

Tidak boleh Return campur.

---

# Comment Standard

Gunakan.

Purpose

Parameter

Return

Contoh.

/**

Create Exam Session

@param user

@param caseId

@return Session

*/

---

# Repository Rule

Repository.

Tidak boleh.

Business Rule

Score

Permission

Workflow

Repository hanya.

Read

Write

Delete

Update

---

# Service Rule

Service.

Harus berisi.

Validation

Business Rule

Workflow

Calculation

Permission

---

# Controller Rule

Controller.

Tidak boleh.

Spreadsheet

Business Rule

Repository

Controller hanya.

Request

↓

Service

↓

Response

---

# HTML Rule

Tidak boleh.

Business Rule

Spreadsheet

Hash

Signature

---

# CSS Rule

Gunakan.

Component Style

Bukan.

Inline Style.

---

# JavaScript Rule

Frontend.

Tidak boleh.

Menghitung Score.

Menentukan Permission.

Menghasilkan Signature.

---

# Error Handling

Gunakan.

throw new Error()

↓

Catch

↓

Response

Jangan.

alert()

Logger.log()

di Production.

---

# Logging

Gunakan.

LogService

Tidak.

Logger.log()

langsung.

---

# Magic Number

Jangan.

60000

Gunakan.

MILLISECONDS_PER_MINUTE

---

# Hardcode

Tidak boleh.

Token

Secret

URL

Sheet Name

Gunakan.

Config

---

# Duplicate Code

Jika Logic sama.

↓

Buat Utility.

---

# Code Review Checklist

☐ Function kecil

☐ Nama jelas

☐ Tidak ada Hardcode

☐ Tidak ada Duplicate

☐ Return Standard

☐ Comment tersedia

☐ Error Handling

☐ Validation

---

# Summary

Source Code harus mudah dipahami.

Optimasi readability lebih penting daripada menulis kode yang terlalu kompleks.
