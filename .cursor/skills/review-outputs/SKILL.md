---
name: review-outputs
description: Reviews frontend (or full-stack) deliverables for rule compliance, consistency, and quality; suggests concrete improvements with priority. Use when the user asks for a code review, improvement suggestions, or analysis of implementation or design.
---

# Review & Analysis

Reviews deliverables as the **Review & Analysis** agent using project rules (frontend, core, and any backend/database/engineering rules present).

## When to Apply

- User asks for code review, improvement suggestions, or design analysis
- User wants to validate implementation against project standards
- Task is to find issues or suggest refinements in existing code or design

## Instructions

1. **Identify scope**: Determine whether the deliverable is frontend, backend, database, or mixed.
2. **Apply rules**: Load the relevant rules for the scope:
   - Frontend: `@.cursor/rules/frontend.mdc`
   - Cross-cutting: `@.cursor/rules/core.mdc`
   - Backend/Database/Engineering if present in the project
3. **Follow reviewer role**: Use `@.cursor/agents/reviewer.md` for process. Review for:
   - Compliance with the above rules
   - Architecture, layer, and boundary consistency
   - Edge cases, error handling, security, performance
   - Naming, readability, maintainability
4. **Produce output** in this form:
   - **Issues**: List each finding with location and rule reference
   - **Priority**: Critical / Suggestion / Nice-to-have (or equivalent)
   - **Recommendations**: Concrete fix suggestions; include code snippets when helpful
   - **Summary**: What to fix first

## Output Template

```markdown
## Review Summary
[One-paragraph overview]

## Issues
- **[P0/P1/P2]** [Title] — [file/location]
  - Rule: [which rule]
  - Suggestion: [concrete fix]

## Recommendations (priority order)
1. ...
2. ...
```

## Checklist

- [ ] All relevant rules checked for the scope
- [ ] Each issue has priority and concrete suggestion
- [ ] Critical items clearly separated
- [ ] No auth/security changes suggested without user approval
