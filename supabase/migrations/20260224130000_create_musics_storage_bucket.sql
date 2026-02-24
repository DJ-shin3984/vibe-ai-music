-- 버킷 생성: 생성된 음악 파일 저장용 (비공개)
insert into storage.buckets (id, name, public)
values ('musics', 'musics', false)
on conflict (id) do update set name = excluded.name, public = excluded.public;

-- storage.objects RLS: 인증 사용자는 자신의 폴더(경로 첫 segment = user_id)만 접근
-- 업로드: musics 버킷, 경로 첫 폴더가 본인 user_id
create policy "Users can upload own musics"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'musics'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- 조회: musics 버킷, 본인 소유(owner) 또는 경로가 본인 user_id
create policy "Users can read own musics"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'musics'
    and (
      owner_id = auth.uid()::text
      or (storage.foldername(name))[1] = auth.uid()::text
    )
  );

-- 수정: musics 버킷, 본인 소유
create policy "Users can update own musics"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'musics' and owner_id = auth.uid()::text);

-- 삭제: musics 버킷, 본인 소유
create policy "Users can delete own musics"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'musics' and owner_id = auth.uid()::text);
