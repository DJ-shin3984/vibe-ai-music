---
name: qa-test-outputs
description: Plans and proposes tests for deliverables (frontend, API). Applies project testing rules; suggests test levels, cases, and automation. Use when the user asks for test cases, test plan, QA, or verification of implementation.
---

# QA Test

Validates deliverables as the **QA Test** agent, following `.cursor/rules/testing.mdc`. Use the project's test runner (e.g. Jest, Vitest) when present.

## When to Apply

- User asks for test cases, test plan, or QA verification
- User wants to validate new or changed behavior
- Task involves unit, integration, or E2E test design or implementation

## Instructions

1. **Apply rules**: Read and apply `@.cursor/rules/testing.mdc` for all test work.
2. **Adopt role**: Follow the role and task from `@.cursor/agents/qa.md`:
   - **Test plan**: Impact scope, test level (unit/integration/E2E), priority
   - **Test cases**: Normal, exception, and boundary conditions; clear behavior criteria
   - **Automation**: Use project test runner and mocking patterns; avoid sleeps and flakiness
   - **Execution**: Run tests where possible; summarize results and failure causes
   - Do not execute auth/security scenarios; only suggest scenarios
3. **Before finishing**: Confirm against Done When in the agent file:
   - Test plan and cases are documented
   - Test code added/updated if requested
   - Execution results summarized; failures explained

## Output Template

```markdown
## Test Plan
- Scope: [what is under test]
- Levels: unit / integration / E2E
- Priority: [order of execution]

## Test Cases
| ID | Condition | Expected | Level |
|----|-----------|----------|-------|
| TC-1 | ... | ... | unit |

## Results (if run)
- Pass: N
- Fail: N
- Failures: [brief cause]
```

## Checklist

- [ ] Test levels appropriate to change
- [ ] Cases cover normal, error, and boundary
- [ ] No arbitrary sleeps; deterministic where possible
- [ ] Auth/security: scenario suggestions only, no execution
