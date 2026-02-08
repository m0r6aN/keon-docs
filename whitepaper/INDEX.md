# Keon Systems Whitepaper — Canonical Index

## Current Version
**Governed Execution for Operational AI — v1.0**
Published: January 2026
Status: Current
Distribution: Public

[Read v1.0 →](./WHITEPAPER.md)

---

## Versioning Policy

This document maintains a canonical record of all published whitepaper versions.

**Version Format**: `MAJOR.MINOR`
- **MAJOR** increments indicate architectural changes or new core concepts
- **MINOR** increments indicate clarifications, addenda, or non-breaking refinements

**Immutability**: Once published, previous versions are never modified. Changes are tracked in [CHANGELOG.md](./CHANGELOG.md).

---

## Version History

### v1.0 — Governed Execution Foundation
**Published**: January 2026
**Status**: Current
**Availability**: [WHITEPAPER.md](./WHITEPAPER.md)
**PDF**: [governed_execution_whitepaper_v1.0.pdf](../whitepaper.pdf)

Defines the core thesis and architectural framework for governed execution:
- Why authorization, not intelligence, is the hard problem
- The liability shift from Read-Only to Read-Write AI
- Why existing patterns (logs, monitoring, API keys) fail
- The Keon Core → Runtime → Control architecture
- Evidence Packs and verifiable proof

**Key Claims**:
- Policy is enforced at the substrate, not in application code
- Every action produces receipts with lineage, attribution, and cost
- Humans approve, ratify, and intervene — with evidence

---

## Addenda

### v1.0 Addendum A — TrustOps & Revocation Semantics
**Published**: 2026-02-07
**Status**: Incorporated
**Reference**: [CHANGELOG.md](./CHANGELOG.md)

Clarifies:
- Decision Gateway receipt schema changes (Phase 5)
- TrustOps revocation semantics overview
- Non-breaking refinements to v1.0 claims

### v1.1 Addendum — Lifecycle Governance & Policy Automation
**Published**: 2026-02-08
**Status**: Current
**Reference**: [CHANGELOG.md](./CHANGELOG.md)

Extends the whitepaper with:
- **Lifecycle Governance** — Governed birth (PT-014), governed death (PT-016), and governed automation (PT-017)
- **Policy Automation** — Severity gradation, human gate enforcement, cooldown periods, fail-closed ambiguity
- **Constitutional Execution** — Birth, death, and automation are all governed, attributed, and provable
- **7 Sealed Proof Campaigns** — Independently verifiable evidence bundles with SHA256-hashed manifests

**Key Claims Added**:
- KS-LIFECYCLE-014: Governed Birth
- KS-LIFECYCLE-016: Governed Death
- KS-LIFECYCLE-017: Revocation Policy Automation
- KS-ROUTE-003: Agent Registry & Capability Routing
- KS-WORKFLOW-004: Workflow Orchestration Execution Spine
- KS-GATE-005: Human-in-the-Loop Gates
- KS-COLLAB-013: Multi-Titan Collaboration

---

## How to Reference

**For direct links**:
```
Canonical Whitepaper: https://github.com/m0r6aN/keon-docs/tree/main/whitepaper
Current Version: https://github.com/m0r6aN/keon-docs/blob/main/whitepaper/WHITEPAPER.pdf
Claims Registry: https://github.com/m0r6aN/keon-docs/blob/main/canon/CLAIMS_REGISTRY.yaml
Proof Map: https://github.com/m0r6aN/keon-docs/blob/main/canon/PROOF_MAP.yaml
```

**For citations**:
```
Keon Systems Technical Whitepaper v1.1
"Governed Execution for Operational AI"
February 2026
https://github.com/m0r6aN/keon-docs/blob/main/whitepaper/WHITEPAPER.pdf
```

---

## Verification

All claims in the whitepaper are subject to the governance rules defined in [canon/](../canon/).

If it's stated in the whitepaper, it must be provable. Run `npm run claims:drift` to verify claim integrity.

Full proof campaign evidence: [OMEGA Proof Campaign Status](https://github.com/m0r6aN/omega-docs/blob/main/REPORT/PROOFS/PROOF_CAMPAIGN_STATUS.md)

---

*Last Updated: 2026-02-08*
