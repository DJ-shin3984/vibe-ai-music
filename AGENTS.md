# Subagents & Skills

이 프로젝트에서 사용하는 서브에이전트와 스킬 정의. Next.js + .cursor 보일러플레이트용 구성입니다.

## Subagents (`.cursor/agents/`)

### 1. Frontend UI/UX Expert

- **파일**: [.cursor/agents/frontend-ui-ux.md](.cursor/agents/frontend-ui-ux.md)
- **역할**: UI/UX·프론트엔드. HTML, CSS, React, Next.js, Tailwind. 접근성·반응형·컴포넌트 설계.
- **참조 룰**: `@.cursor/rules/frontend.mdc`

### 2. Review & Analysis

- **파일**: [.cursor/agents/reviewer.md](.cursor/agents/reviewer.md)
- **역할**: 구현 결과물의 규칙 준수·일관성·품질 검토, 개선 제안.
- **참조 룰**: `@.cursor/rules/core.mdc`, `@.cursor/rules/frontend.mdc`

### 3. QA Test

- **파일**: [.cursor/agents/qa.md](.cursor/agents/qa.md)
- **역할**: 테스트 계획·케이스·자동화 제안 및 검증.
- **참조 룰**: `@.cursor/rules/testing.mdc`

---

## Skills (`.cursor/skills/`)

| 스킬 | 경로 | 트리거 예 |
|------|------|-----------|
| Frontend UI/UX | `.cursor/skills/frontend-ui-ux/SKILL.md` | UI 구현, React/Next.js, 컴포넌트, 스타일, 페이지 |
| Review Outputs | `.cursor/skills/review-outputs/SKILL.md` | 코드 리뷰, 개선 제안, 품질 분석 |
| QA Test | `.cursor/skills/qa-test-outputs/SKILL.md` | 테스트 케이스, 테스트 계획, QA 검증 |

---

## Rules (`.cursor/rules/`)

- **항상 적용**: `core.mdc`, `workflow.mdc`, `ai-policies.mdc`
- **컨텍스트별**: `frontend.mdc`, `languages.mdc`, `testing.mdc`

---

## 사용 방법

- **에이전트**: 특정 역할로 작업할 때 `@.cursor/agents/<이름>.md` 참조 후 해당 룰 적용.
- **스킬**: 프롬프트에 작업 유형(예: "React 컴포넌트 만들어줘", "코드 리뷰해줘")을 포함하면 해당 스킬이 자동 적용될 수 있음.
- **파이프라인 예**: Frontend 에이전트로 구현 → Reviewer로 리뷰·보완 → QA 에이전트로 테스트 검증.
