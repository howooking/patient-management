import TanstackProvider from "@/components/common/tanstack-provider";
import Sidebar from "@/components/hospital/sidebar/sidebar";
import TopBar from "@/components/hospital/topbar/top-bar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    hos_id: string;
  };
}) {
  const { hos_id } = params;
  const supabase = await createSupabaseServerClient(true);

  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  const { data: hospitalVetMapping, error: hospitalVetMappingError } =
    await supabase
      .from("hos_vet_mapping")
      .select(
        `
          vet_approved,
          hospitals (
            business_approved
          )
        `
      )
      .match({ hos_id, vet_id: user?.id })
      .single();

  if (hospitalVetMappingError) {
    throw new Error(hospitalVetMappingError.message);
  }

  // TODO : 안내 메세지 별도 컴포넌트로
  if (!hospitalVetMapping.hospitals?.business_approved) {
    return "사업자 등록증을 junsgk@gmail.com으로 보내주세요.";
  }

  if (!hospitalVetMapping.vet_approved) {
    return "병원 승인 후 참여가 가능합니다.";
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-auto">
        <TopBar hos_id={hos_id} />

        <main className="p-2">
          <TanstackProvider>{children}</TanstackProvider>
        </main>
      </div>
    </div>
  );
}
