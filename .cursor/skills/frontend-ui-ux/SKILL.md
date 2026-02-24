---
name: frontend-ui-ux
description: Implements frontend UI/UX work using HTML, CSS, React, Next.js, Tailwind. Applies project frontend rules and accessibility. Use when implementing UI, components, pages, styling, 페이지, 화면, 구현, or when the user mentions React, Next.js, frontend, or UI/UX.
---

# Frontend UI/UX

Implements frontend work as the **Frontend UI/UX Expert** agent, following `.cursor/rules/frontend.mdc`.

## When to Apply

- User asks for UI, components, pages, styling, or frontend implementation
- User mentions React, Next.js, Tailwind, CSS, or related stack
- Task involves accessibility (a11y), responsive layout, or client-side state

## Instructions

1. **Apply rules**: Read and apply `@.cursor/rules/frontend.mdc` for all edits.
2. **Adopt role**: Follow the role and task from `@.cursor/agents/frontend-ui-ux.md`:
   - Prioritize UX and accessibility (semantic HTML, labels, keyboard, focus)
   - Single-responsibility components, composition, appropriate state (local/global)
   - Use existing project patterns for data fetching, styling, and layout
   - Do not introduce new UI or styling libraries unless requested
3. **Before finishing**: Confirm against Done When in the agent file:
   - Implementation matches frontend.mdc
   - Accessibility, responsive, and performance needs are met
   - Output matches existing codebase style and patterns

## Checklist

- [ ] Semantic HTML / native interactive elements
- [ ] Labels and alt text where required
- [ ] Focus visibility preserved
- [ ] Existing styling/component conventions followed
- [ ] No new libraries added without approval
