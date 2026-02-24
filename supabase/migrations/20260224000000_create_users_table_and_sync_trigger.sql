-- public.users: auth.users와 1:1 연동, 앱에서 사용할 사용자 프로필
create table public.users (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (id)
);

comment on table public.users is '앱 사용자 프로필. auth.users와 트리거로 동기화됨.';

alter table public.users enable row level security;

-- 로그인한 사용자는 자신의 행만 조회/수정 가능
create policy "Users can read own row"
  on public.users for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own row"
  on public.users for update
  to authenticated
  using (auth.uid() = id);

-- auth.users INSERT 시 public.users에 자동 삽입
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
