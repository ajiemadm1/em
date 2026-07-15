# Business Domain

---

# Purpose

Dokumen ini mendefinisikan seluruh Business Domain pada EM Enterprise Platform.

Business Domain merupakan fondasi utama sistem.

Seluruh Workflow, Entity, Service, Repository dan Database harus mengacu pada Domain yang sesuai.

Domain harus independen sehingga dapat dikembangkan tanpa mempengaruhi Domain lainnya.

---

# Domain Hierarchy

EM Enterprise Platform

│

├── Training

├── Maintenance

├── Monitoring

├── Inventory

├── Calibration

├── Dashboard

├── Notification

├── Administration

└── Shared Services

---

# Domain Responsibility

## Training

### Purpose

Mengelola seluruh proses pembelajaran dan evaluasi kompetensi Engineering.

### Features

- Learning Material
- Training Schedule
- Computer Based Test
- Certification
- Result
- Progress
- Question Bank

### Owner

Engineering Department

---

## Maintenance

### Purpose

Mengelola seluruh aktivitas preventive dan corrective maintenance.

### Features

- Work Order
- Preventive Maintenance
- Corrective Maintenance
- Schedule
- History
- Spare Part Usage
- Technician Assignment

---

## Monitoring

### Purpose

Monitoring seluruh utility dan equipment secara real-time.

### Features

- SCADA
- Utility Monitoring
- Alarm
- Trend
- Energy Monitoring
- Equipment Status

---

## Inventory

### Purpose

Mengelola material dan sparepart Engineering.

### Features

- Stock
- Material
- Receiving
- Issue
- Adjustment
- Purchase Request
- Vendor

---

## Calibration

### Purpose

Mengelola seluruh alat ukur yang memerlukan kalibrasi.

### Features

- Asset
- Calibration Schedule
- Reminder
- Certificate
- History
- Vendor

---

## Dashboard

### Purpose

Menyediakan visualisasi data untuk seluruh module.

### Features

- KPI
- Executive Dashboard
- Engineering Dashboard
- Report
- Analytics

---

## Notification

### Purpose

Mengirim informasi kepada user secara otomatis.

### Features

- Telegram
- Email
- Reminder
- Escalation
- Alert

---

## Administration

### Purpose

Mengelola konfigurasi platform.

### Features

- User
- Role
- Permission
- Master Data
- Configuration
- Audit

---

## Shared Services

Shared Services digunakan oleh seluruh Domain.

### Services

Authentication

Authorization

Audit

Logging

Configuration

Caching

Utilities

Security

Notification

---

# Domain Independence

Setiap Domain harus dapat berjalan sendiri.

Training

×

Tidak boleh bergantung pada

Maintenance.

Monitoring

×

Tidak boleh bergantung pada

Inventory.

Apabila terdapat kebutuhan bersama maka harus dipindahkan ke Shared Services.

---

# Domain Communication

Domain tidak boleh mengakses Database Domain lain secara langsung.

Contoh

Training

×

Inventory Spreadsheet

Yang diperbolehkan

Training

↓

Notification Service

↓

Telegram

---

# Domain Ownership

| Domain | Owner |
|---------|-------|
| Training | Engineering |
| Maintenance | Engineering |
| Monitoring | Engineering |
| Inventory | Engineering |
| Calibration | Engineering |
| Dashboard | Engineering |
| Notification | Shared |
| Administration | Shared |

---

# Entity Catalogue

## Training

- Training
- Course
- Question
- Choice
- ExamSession
- ExamAnswer
- ExamResult
- ExamStatus
- Certificate

---

## Maintenance

- WorkOrder
- PMSchedule
- CMRequest
- Asset
- Technician

---

## Monitoring

- Equipment
- Alarm
- Trend
- Utility
- Sensor

---

## Inventory

- Material
- Stock
- Vendor
- PurchaseRequest
- GoodsReceipt

---

## Calibration

- Instrument
- Calibration
- Certificate
- Vendor

---

## Administration

- User
- Role
- Permission
- Menu
- Configuration

---

# Domain Workflow

Setiap Domain memiliki Workflow sendiri.

Training

TRN-WF-xxx

Maintenance

MNT-WF-xxx

Monitoring

MON-WF-xxx

Inventory

INV-WF-xxx

Calibration

CAL-WF-xxx

Administration

ADM-WF-xxx

---

# Domain Repository

Setiap Domain memiliki Repository sendiri.

Training

TrainingRepository

QuestionRepository

ResultRepository

SessionRepository

Maintenance

WorkOrderRepository

AssetRepository

Monitoring

AlarmRepository

TrendRepository

Inventory

MaterialRepository

StockRepository

Calibration

CalibrationRepository

Administration

UserRepository

RoleRepository

---

# Domain Services

Setiap Domain memiliki Business Service sendiri.

Training

TrainingService

QuestionService

ExamService

ResultService

SessionService

Maintenance

MaintenanceService

WorkOrderService

Monitoring

MonitoringService

AlarmService

Inventory

InventoryService

MaterialService

Calibration

CalibrationService

Administration

UserService

PermissionService

---

# Business Rules

Seluruh Business Rule wajib berada pada Service.

Repository

×

Tidak boleh menghitung Score.

Repository

×

Tidak boleh menentukan Passing Grade.

Repository

×

Tidak boleh membuat Session.

Seluruh Business Rule hanya boleh berada pada Service.

---

# Future Expansion

Apabila terdapat Domain baru, Domain tersebut harus:

- Memiliki Entity sendiri.
- Memiliki Repository sendiri.
- Memiliki Workflow sendiri.
- Memiliki Service sendiri.
- Tidak bergantung pada Domain lain.

---

# Summary

Business Domain merupakan fondasi utama EM Enterprise Platform.

Seluruh pengembangan dimulai dari Domain.

Workflow, Entity, Service, Repository, Database dan UI harus mengikuti Domain yang sesuai.

Dengan pendekatan ini platform dapat berkembang tanpa kehilangan konsistensi arsitektur.
