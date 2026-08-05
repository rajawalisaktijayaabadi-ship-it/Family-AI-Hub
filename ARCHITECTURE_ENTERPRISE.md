# FamilyAI Hub Indonesia Mobile Web Edition — Enterprise Architecture Guide

## Overview & System Blueprint
FamilyAI Hub Indonesia Mobile Web Edition is an **Enterprise SaaS Platform** built specifically for Indonesian families. It empowers families with AI-driven intelligence (Gemini 2.5 Flash), financial tracking, health monitoring, child education, smart emergency responses (BMKG Weather), real-time maps, and multi-tenant workspace management.

---

## 🏛 Clean Architecture & Feature-First Structure

```
src/
├── features/               # Feature-First Modular Structure
│   ├── auth/               # Firebase Authentication & Biometric PIN
│   ├── workspace/          # Multi-Tenant Workspace & Member Roles
│   ├── ai/                 # Gemini AI Engine, Memory, Context & RAG
│   ├── subscription/       # SaaS Billing, Plans & Payment Gateway (Midtrans/Xendit/QRIS)
│   ├── integration/        # External Integration Hub (Maps, BMKG Weather, FCM, Automation)
│   ├── security/           # Enterprise Security, UU PDP Privacy & DevOps Monitoring
│   └── settings/           # App Settings & Preferences
├── services/               # Core Infrastructure Services & Adapters
│   ├── security/           # SecurityService (Encryption, Sanitization, Prompt Defender)
│   ├── devops/             # DevOpsService (Health Metrics, Backups, Testing Matrix)
│   ├── integration/        # MapAdapter, WeatherAdapter, NotificationAdapter, AIAutomationEngine
│   └── payment/            # PaymentGatewayAdapter (Midtrans, Xendit, QRIS)
├── stores/                 # State Management (Zustand Stores)
├── types/                  # Shared TypeScript Interfaces & Zod Validation Schemas
└── firestore.rules         # 8 Pillars Hardened Firestore Security Rules
```

---

## 🔐 Enterprise Security & UU PDP Compliance

### 1. Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022)
* **Pasal 5 & 6 (Right of Access & Correction):** Dynamic user consent controls for AI context sharing, location tracking, and marketing.
* **Pasal 8 (Right to be Forgotten):** One-click account data purge workflow with audit logging.
* **Pasal 11 (Data Portability):** Export complete personal & family workspace data in structured JSON format.
* **Field-Level Encryption:** Sensitive identifiers (NIK KTP, Phone Numbers) masked and encrypted with AES-256 tokens.

### 2. Security Hardening & AI Protection
* **Prompt Injection Defender:** Real-time sanitization of user inputs against prompt hijacking patterns (`ignore previous instructions`, `reveal api key`).
* **Content Security Policy (CSP):** Strict CSP headers preventing XSS and unverified inline scripts.
* **Rate Limiting:** 100 requests / min / IP guard against DDoS and automated abuse.
* **Audit Logging:** Immutable append-only Firestore audit logs tracking every security event.

---

## 🛡 Firestore Security Rules (The 8 Pillars)
The project's `firestore.rules` implements enterprise-grade isolation:
1. **Master Gate Pattern:** Default deny (`allow read, write: if false;`) on all unmatched collections.
2. **Schema Isolation:** Strict separation of `/users`, `/workspaces`, `/memory_documents`, and `/subscriptions`.
3. **RBAC & Auth Verification:** Mandatory checks (`isWorkspaceMember`, `isWorkspaceOwner`, `isSuperAdmin`).
4. **Immutable Audit Logs:** Audit logs can be written by authenticated users but cannot be modified or deleted.

---

## ⚡ DevOps, CI/CD & Production Readiness
* **System Health Monitor:** Real-time tracking of CPU usage, memory footprint, API latency, and Firestore quota usage.
* **Automated Backup & Disaster Recovery:** Daily automated snapshots in GCP Storage Bucket with manual snapshot execution.
* **Feature Flags & Remote Config:** Dynamic toggles for canary releases and maintenance mode.
* **Test Suite & Quality Gate:** High coverage targets (Unit ≥ 90%, Integration ≥ 85%, Component ≥ 90%, E2E ≥ 80%) verified through automated test runners.
