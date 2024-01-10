import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import GoogleSignin from "./google-signin";
import KakaoSignin from "./kakao-signin";

export default function SignupTab({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div className="space-y-1">
        <GoogleSignin signup />

        <div className="text-center">or</div>

        <KakaoSignin signup />
      </div>

      <div className="text-sm break-keep">
        <span className="font-semibold">구글로 회원가입</span> 또는{" "}
        <span className="font-semibold">카카오로 회원가입</span>을 진행할 경우
        Vetterhands의{" "}
        <Link href="#" className="text-primary">
          이용약관
        </Link>{" "}
        및{" "}
        <Link href="#" className="text-primary">
          개인정보정책
        </Link>
        에 동의하게됩니다.
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">이미 회원이신가요?</span>
        <Button
          className="text-sm h-auto p-0"
          variant="link"
          onClick={() => setActiveTab("signin")}
        >
          로그인
        </Button>
      </div>
    </>
  );
}
