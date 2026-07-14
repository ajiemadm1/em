# Deployment Standard

---

# Purpose

Dokumen ini menjelaskan proses Deployment EM Enterprise Platform.

---

# Environment

Development

↓

Testing

↓

Production

---

# Branch Strategy

main

Production

develop

Development

feature/*

New Feature

hotfix/*

Emergency Fix

release/*

Release Preparation

---

# Release Flow

Feature

↓

Review

↓

Testing

↓

Merge Develop

↓

Release

↓

Main

---

# Versioning

Major.Minor.Patch

Contoh.

2.0.0

2.1.0

2.1.1

---

# Deployment Checklist

☐ Workflow Updated

☐ ADR Updated

☐ Blueprint Updated

☐ Test Passed

☐ Backup Completed

☐ Version Updated

☐ Release Note Created

---

# Backup Strategy

Daily

Weekly

Monthly

Backup wajib dilakukan sebelum Deployment.

---

# Rollback Strategy

Jika Deployment gagal.

↓

Restore Previous Version

↓

Restore Spreadsheet

↓

Reopen Service

---

# Release Note

Setiap Release wajib memiliki.

Version

Date

Change

Bug Fix

Improvement

Breaking Change

---

# Production Rule

Tidak boleh edit langsung.

Semua perubahan melalui:

Develop

↓

Testing

↓

Production

---

# Summary

Deployment harus dapat diulang.

Deployment tidak boleh bergantung pada individu.
