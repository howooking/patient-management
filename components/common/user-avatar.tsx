import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  src: string;
  fallback: string;
  large?: boolean;
};

export default function UserAvatar({ src, fallback, large }: Props) {
  return (
    <Avatar className={cn("w-8 h-8", large && "w-12 h-12")}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
