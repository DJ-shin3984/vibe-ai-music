---
name: domain-aware
description: 모든 요청을 Vibe AI Music 도메인 분석에 맞춰 실행. 신규 기능·용어·API·UI 제안 시 도메인 룰을 참조해 일관성을 유지한다.
---

# Domain-Aware Execution

모든 작업은 **Vibe AI Music** 도메인을 전제로 한다. `@.cursor/rules/domain.mdc`에 정의된 서비스 정체·사용자 여정·용어·기술 스택을 기준으로 판단한다.

## When to Apply

- 신규 기능 기획·구현 (워크스페이스, 프롬프트, 음악/AI 연동 등)
- 용어·라벨·문구 결정 (화면 텍스트, API 이름, 변수명)
- API·스키마·라우트 설계 (사용자·워크스페이스·프롬프트와의 정합성)
- 사용자 시나리오·플로우 논의 (로그인 → 워크스페이스, CTA 경로 등)
- UI/디자인 방향 제안 (Liquid Glass, #171717, 필기체 로고 등)

## Instructions

1. **도메인 룰 참조**: 작업 전 `@.cursor/rules/domain.mdc`를 읽고, 서비스명·가치·여정·엔티티·용어·기술 스택을 확인한다.
2. **일관성 검사**: 제안·구현이 다음과 맞는지 확인한다.
   - 사용자 여정(홈 → auth → workspace, 로그인 후 /workspace 리다이렉트)
   - 엔티티(User, Workspace, Prompt)와 명명
   - 문구("AI와 함께 만드는 당신만의 음악", "음악적 영감")
   - 기술 선택(Supabase Auth/DB, Next.js App Router, Tailwind)
3. **도메인 위반 회피**: 도메인과 어긋나는 플로우·용어·스타일은 제안하지 않는다. 불명확하면 도메인 룰을 기준으로 한 가지 방향을 선택해 진행한다.

## Checklist

- [ ] 신규 기능이 사용자 여정·엔티티와 맞는가?
- [ ] 용어·라벨이 서비스 정체와 일치하는가?
- [ ] API·라우트·스키마가 User/Workspace/Prompt 도메인과 정합인가?
- [ ] UI 방향이 Liquid Glass·#171717·필기체 로고 등과 충돌하지 않는가?
