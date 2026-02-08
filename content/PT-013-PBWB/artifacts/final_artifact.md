# Workflow Policy Pack — Multi-Titan Collaboration

> **Copy this into your repo. Everything you need to understand governance is here.**

**Campaign:** PT-013 | **Claim:** KS-COLLAB-013 | **Status:** PROVEN AND SEALED  
**Date:** 2026-02-07 | **Tag:** `omega-proof-campaign-pt013`

---

## What This Workflow Does

Four AI agents (Titans) collaborate on a shared work product under Federation Core governance. Each step is policy-evaluated, receipted, and RHID-addressed. A human gate controls whether the final bundle is sealed.

```
Claude → Normalize    (step 1, automated policy)
Gemini → Plan         (step 2, automated policy)
GPT    → Build        (step 3, automated policy)
Grok   → Validate     (step 4, automated policy)
Human  → Approve/Deny (step 5, human gate)
FC     → Seal         (step 6, FC policy)
```

## Where Gates Occur

**Step 5 — Human Approval Gate**

The workflow pauses after all Titans have executed. A human approver reviews the outputs and either:
- **Approves** → workflow continues to seal
- **Denies** → workflow halts permanently, denial receipted

No silent bypass. No timeout-to-allow. Silence = paused forever.

## What Policy Tiers Apply

| Steps | Tier | Evaluator | On Failure |
|-------|------|-----------|------------|
| 1–4 | Automated | FC policy engine | Deny + halt |
| 5 | Human | Human approver | Deny + halt |
| 6 | FC | Federation Core | No seal |

**Fail-closed everywhere.** If authorization is missing, ambiguous, or unverifiable, execution does not occur.

## What Outputs Are Expected

| File | Purpose |
|------|---------|
| `blueprint.yaml` | Workflow definition with steps, ordering, governance |
| `policies.yaml` | Policy rules evaluated at each step |
| `roles.yaml` | Actor definitions with capabilities and boundaries |
| `collaboration_ledger.jsonl` | Action-level who-did-what with RHID pointers |
| `artifacts/work_order.json` | Incoming work order (input) |
| `artifacts/plan.json` | Execution plan (step 2 output) |
| `artifacts/policy_pack.md` | Human-readable policy explanation |
| `evidence/manifest.json` | RHID → SHA256 → storage URI mapping |
| `evidence/receipts/` | Thin receipts per action |
| `evidence/audit_log.jsonl` | FC event slice |

## How to Verify Receipts

### 1. Receipt Chain Integrity
Every action has a `prev_action_hash` linking to the prior action. The chain starts with `null` (first action) and is unbroken through seal.

```bash
cat collaboration_ledger.jsonl | jq -r '[.seq, .prev_action_hash] | @tsv'
```

### 2. RHID Resolution
Every artifact and receipt is addressed by RHID. The manifest maps every RHID to a SHA256 hash and storage URI.

```bash
cat evidence/manifest.json | jq '.rhid_count'
# Expected: 25 (for happy path)
```

### 3. Actor Attribution
Every action records who performed it (actor_id, actor_type, capabilities).

```bash
cat collaboration_ledger.jsonl | jq -r '.actor_id' | sort -u
# Expected: approver_1, claude_titan, federation_core, gemini_titan, gpt_titan, grok_titan
```

### 4. Gate Verification
Gate actions come in pairs: `gate_request` (FC) + `gate_resolve` (human).

```bash
cat collaboration_ledger.jsonl | jq -r 'select(.action_type | startswith("gate"))'
```

### 5. Full Campaign Verification
```bash
git checkout omega-proof-campaign-pt013  # in omega-docs repo
# Review REPORT/PROOFS/PT-013/ evidence bundle
```

## Proven Properties

| Property | Proof |
|----------|-------|
| ≥3 Titan actors collaborated | 4 Titans: Claude, Gemini, GPT, Grok |
| Gate paused workflow | gate_request at step 5 |
| Human approved gate | gate_resolve with decision=allow |
| 100% RHID resolution | 25/25 RHIDs mapped in manifest |
| Receipt chain unbroken | prev_action_hash verified |
| Fail-closed on denial | Test B: deny → FAILED |
| Fail-closed on failure | Test C: timeout → FAILED |

## Three Tests, Three Verdicts

| Test | Scenario | Result |
|------|----------|--------|
| A | Happy path: 4 Titans → gate approve → seal | ✅ COMPLETED |
| B | Gate deny: 2 Titans → gate deny → halt | ✅ FAILED (correct) |
| C | Titan failure: timeout → halt | ✅ FAILED (correct) |

---

## One Line of Truth

> **Keon decides. Governed systems execute. Receipts prove.**

---

*Full evidence: [omega-docs/PT-013-PBWB](https://github.com/m0r6aN/omega-docs/tree/main/PT-013-PBWB)*  
*Proof campaign: [PROOF_CAMPAIGN_STATUS.md](https://github.com/m0r6aN/omega-docs/blob/main/REPORT/PROOFS/PROOF_CAMPAIGN_STATUS.md)*

