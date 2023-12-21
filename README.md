# TODO

### Common

- [ ] 로그인 유지 에러발생시 로그아웃하고 재로그인 메세지 안내
  - [ ] 미들웨어
- [ ] 에러 핸들링 세분화
- [ ] RLS 세분화
- 단위가 다른 경우 (도씨 섭씨)

### Hospital

- [ ] 병원 로고 이미지 기능

### Pet

- [ ] 환자 상태 state관련 기능들
- [ ] 환자 삭제시 confirm popoveer

###

```js
const supabase = await createSupabaseServerClient(true);

const {
  data: { user },
  error: userError,
} = await supabase.auth.getUser();

if (userError) {
  throw new Error(userError.message);
}

if (!user) {
  redirect("/");
}

const { data: vet, error: vetError } = await supabase
  .from("vets")
  .select(`license_approved`)
  .match({ vet_id: user.id })
  .single();

if (vetError) {
  if (vetError.code !== "PGRST116") throw new Error(vetError.message);
}

if (!vet) {
  redirect("/signup");
}

if (!vet.license_approved) {
  redirect("/wait");
}
```
