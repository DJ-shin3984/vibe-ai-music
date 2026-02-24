# Supabase 마이그레이션 실행 방법

Google 로그인 후 **auth.users**에는 저장되지만 **public.users**에는 안 들어가는 경우,  
아래 SQL을 **현재 사용 중인 Supabase 프로젝트**에서 한 번 실행해야 합니다.

## 1. 테이블 + 트리거 적용 (처음 한 번만)

**Supabase Dashboard** → 프로젝트 선택 → **SQL Editor** → New query

아래 파일 내용 전체를 복사해 붙여넣고 **Run** 실행:

- `20260224000000_create_users_table_and_sync_trigger.sql`

실행 후에는 **새로 가입하는 사용자**부터 `public.users`에 자동으로 한 행씩 들어갑니다.

## 2. 이미 로그인한 유저가 있어서 public.users에 없을 때 (보정)

`auth.users`에는 있는데 `public.users`에는 없는 기존 유저를 채우려면,  
**1번을 먼저 실행한 뒤** SQL Editor에서 아래만 실행하세요.

```sql
-- auth.users에는 있지만 public.users에 없는 유저만 삽입
insert into public.users (id, email, full_name, avatar_url)
select
  id,
  email,
  coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'name'),
  raw_user_meta_data ->> 'avatar_url'
from auth.users
where id not in (select id from public.users);
```

한 번만 실행하면 되고, 이미 있는 행은 무시됩니다.
