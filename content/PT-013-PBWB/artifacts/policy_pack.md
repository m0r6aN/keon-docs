# PT-013 Policy Pack — Human-Readable Policy Explanation

**Campaign:** PT-013 Multi-Titan Collaboration  
**Claim:** KS-COLLAB-013  
**Status:** PROVEN AND SEALED  

---

## What This Policy Pack Governs

This policy pack governs **multi-Titan collaboration workflows** — workflows where multiple AI agents (Titans) collaborate on a shared work product under Federation Core (FC) governance, with explicit human approval gates.

## Policy Tiers

### Tier 1: Automated (Steps 1–4)
**Who decides:** Federation Core (policy engine)  
**What it checks:**
- Is the actor registered in the agent registry?
- Does the actor declare the capabilities required by this step?
- Do all input RHIDs resolve in the manifest?
- Has the previous step completed successfully?

**If any check fails:** Execution is **denied**. Workflow **halts**. No silent bypass.

### Tier 2: Human (Step 5)
**Who decides:** A human approver  
**What it checks:**
- Has the gate been requested by FC?
- The human reviews all prior outputs and either approves or denies.

**If denied:** Workflow **halts permanently**. No retry. No override. Receipt captures the denial reason, timestamp, and approver identity.

**If no response:** Workflow remains **paused indefinitely**. Fail-closed means silence = no action.

### Tier 3: FC Seal (Step 6)
**Who decides:** Federation Core  
**What it checks:**
- Have all prior steps completed with valid receipts?
- Is the receipt chain unbroken (prev_action_hash integrity)?
- Does the manifest resolve 100% of RHIDs?

**If any check fails:** Bundle is **not sealed**. Evidence is preserved but marked incomplete.

## Fail-Closed Semantics

Every tier operates under **fail-closed** semantics:

| Condition | Result |
|-----------|--------|
| Policy evaluation succeeds | **ALLOW** — step executes |
| Policy evaluation fails | **DENY** — workflow halts |
| Policy evaluation is ambiguous | **DENY** — workflow halts |
| Policy evaluation times out | **DENY** — workflow halts |
| Context is incomplete | **DENY** — workflow halts |

There is no default-allow path. Authorization must be explicit.

## Receipt Properties

Every action in the workflow produces a receipt with:
- **Action ID** — unique identifier for this action
- **Actor ID** — who performed the action
- **Receipt RHID** — content-addressable receipt reference
- **Input/Output RHIDs** — what went in, what came out
- **Policy Decision** — which policy evaluated, what tier, what decision
- **Prev Action Hash** — links to previous action for chain integrity
- **Timestamps** — when started, when ended

## How to Verify

```bash
# 1. Check receipt chain integrity
cat collaboration_ledger.jsonl | jq -r '.prev_action_hash' | head -20

# 2. Verify RHID resolution
cat evidence/manifest.json | jq '.rhid_count'

# 3. Verify all actors are attributed
cat collaboration_ledger.jsonl | jq -r '.actor_id' | sort -u

# 4. Verify gate actions exist
cat collaboration_ledger.jsonl | jq -r '.action_type' | grep gate
```

## One-Line Summary

> **Every action is attributed, every artifact is addressed, every decision is receipted, and every failure halts execution.**

---

*This policy pack is part of the PT-013 Proof-Backed Workflow Policy Pack.*  
*Full evidence: [omega-docs/PT-013-PBWB](https://github.com/m0r6aN/omega-docs/tree/main/PT-013-PBWB)*

