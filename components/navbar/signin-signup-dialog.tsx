import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SigninSignupTab from "./signin-signup-tab";

export default function SigninSignupDialog({ signin }: { signin?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={signin ? "outline" : "default"}>
          {signin ? "로그인" : "무료로 시작하세요"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[320px] p-4 rounded-md">
        <SigninSignupTab signin={signin} />
      </DialogContent>
    </Dialog>
  );
}
