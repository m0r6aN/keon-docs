# Keon Documentation Repository

This repository contains the **public, governed documentation** for **Keon Systems**.

Keon is a governance substrate for AI and automated systems that enforces policy at runtime and produces verifiable evidence for every governed decision.

If you are new here, start with:
→ [START_HERE.md](./START_HERE.md)

---

## Purpose of This Repository

This repository exists to serve as the **authoritative public record** of:

- What Keon claims to do
- How those claims are verified
- Where proof artifacts can be independently inspected

This is not marketing documentation.
This is not implementation source code.
This is not a tutorial blog.

Everything here is **governed, versioned, and auditable**.

---

## What Keon Is (At a Glance)

Keon governs AI and LLM-driven systems by enforcing explicit policy and human authority around execution.

> **Execution proposes. Governance decides. Receipts prove.**

Keon does not attempt to explain model internals.
It governs **decision boundaries** around AI execution and produces tamper-evident proof of how decisions were allowed, denied, or modified.

---

## What Lives Here

This repository contains:

- **Canonical design documents** (whitepaper)
- **Public governance claims**
- **Verification instructions**
- **Proof mappings** linking claims to evidence
- **Drift reconciliation records**

Nothing is silently edited.
Nothing is rewritten without traceability.

---

## Repository Structure

```
keon-docs/
├── START_HERE.md # Entry point for new readers
├── README.md # Repository purpose & governance
├── whitepaper/ # Versioned design documents
│ ├── INDEX.md # Current version (v1.0)
│ └── v1.0/ # Immutable snapshot (Jan 2026)
├── canon/ # Governance source of truth
│ ├── CLAIMS_REGISTRY.yaml # All public claims Keon makes
│ ├── PROOF_MAP.yaml # How each claim is verified
│ └── FEATURES_BY_PHASE.yaml # Implementation timeline
└── content/ # Reconciliation ledger (drift tracking)
```

---

## Governance Model for Documentation

All content in this repository follows these rules:

- **Claims are registered** before being published
- **Claims are versioned**, never edited in place
- **Proof is required** for all guarantees
- **Drift is recorded**, not silently corrected

If a claim cannot be proven, it is not claimed.

---

## Evidence & Verification

Keon produces **Evidence Packs** — sealed, tamper-evident bundles that prove:

- Which policy governed a decision
- Whether human approval was required
- What decision was made
- What execution occurred
- Why the outcome was permitted

Sealed Evidence Packs are stored in the **[Keon Evidence Vault][vault]**:
- Append-only
- Write-once
- Read-only
- Publicly accessible for verification

Anyone can independently verify evidence without trusting Keon’s operators.

---

## What This Repository Is Not

To avoid confusion:

- ❌ This is not the Keon runtime implementation
- ❌ This is not the SDK source code
- ❌ This is not a marketing site
- ❌ This is not mutable documentation

Implementation details live elsewhere.
This repository governs **what is claimed and how it is proven**.

---

## How to Get Started

- **New to Keon?**  
  → Read [START_HERE.md](./START_HERE.md)

- **Want to audit claims?**  
  → Review `canon/CLAIMS_REGISTRY.yaml` and `canon/PROOF_MAP.yaml`

- **Want to see real proof?**  
  → Visit the [Evidence Pack Tour](https://keon-systems.vercel.app/evidence-pack-tour)

- **Want to build with Keon?**  
  → Choose an SDK from START_HERE.md

---

## Governance & Versioning

- **Immutable by default** — changes require governed workflows
- **Versioned releases** — new claims supersede old ones
- **Auditable history** — reconciliation ledger tracks drift

**Current documentation version**: v1.0 (January 2026)

---

## License

This repository is licensed under the terms in [LICENSE.md](./LICENSE.md).

---

**Law before power. Proof before trust.**

