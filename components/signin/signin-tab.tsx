import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import KakaoSignin from "./kakao-signin";
import GoogleSignin from "./google-signin";

export default function SigninTab({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div className="space-y-1">
        <GoogleSignin />

        <div className="text-center">or</div>

        <KakaoSignin />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">아직 회원이 아닌가요?</span>
        <Button
          className="text-sm h-auto p-0"
          variant="link"
          onClick={() => setActiveTab("signup")}
        >
          회원가입
        </Button>
      </div>
    </>
  );
}
