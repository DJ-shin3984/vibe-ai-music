# Next Cursor Boilerplate

Next.js(App Router) + TypeScript + Tailwind CSS 기반 보일러플레이트. **.cursor**의 rules, skills, subagents를 포함해 Cursor AI와 함께 사용할 수 있습니다.

## 스택

- **Next.js** 15 (App Router)
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 3
- **ESLint** (Next 기본 설정)

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 (실행 전 사용자 승인 권장)
npm run dev
```

빌드: `npm run build`  
린트: `npm run lint`

## .cursor 구조

| 경로 | 설명 |
|------|------|
| `.cursor/rules/` | core, workflow, ai-policies, frontend, languages, testing |
| `.cursor/agents/` | frontend-ui-ux, reviewer, qa |
| `.cursor/skills/` | frontend-ui-ux, review-outputs, qa-test-outputs |

자세한 에이전트·스킬 사용법은 **[AGENTS.md](AGENTS.md)** 참고.

## 프로젝트 확장

- API 라우트: `app/api/.../route.ts`
- 백엔드/DB 에이전트·룰이 필요하면 기존 프로젝트의 `.cursor/agents/backend.md`, `.cursor/rules/backend.mdc` 등을 복사해 추가 가능
