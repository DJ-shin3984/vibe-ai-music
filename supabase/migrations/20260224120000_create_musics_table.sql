-- public.musics: 생성된 음악 한 건당 한 행. user_id → public.users
create table public.musics (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text,
  file_path_or_url text not null,
  duration_seconds integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (id)
);

comment on table public.musics is 'AI로 생성된 음악. 사용자별로 자신의 행만 접근 가능.';
comment on column public.musics.file_path_or_url is '저장 경로 또는 재생용 URL';
comment on column public.musics.duration_seconds is '재생 길이(초). 선택.';

create index musics_user_id_idx on public.musics(user_id);
create index musics_created_at_idx on public.musics(created_at desc);

alter table public.musics enable row level security;

-- 로그인 사용자는 자신의 음악만 조회
create policy "Users can read own musics"
  on public.musics for select
  to authenticated
  using (auth.uid() = user_id);

-- 로그인 사용자는 자신의 음악만 삽입
create policy "Users can insert own musics"
  on public.musics for insert
  to authenticated
  with check (auth.uid() = user_id);

-- 로그인 사용자는 자신의 음악만 수정
create policy "Users can update own musics"
  on public.musics for update
  to authenticated
  using (auth.uid() = user_id);

-- 로그인 사용자는 자신의 음악만 삭제
create policy "Users can delete own musics"
  on public.musics for delete
  to authenticated
  using (auth.uid() = user_id);
