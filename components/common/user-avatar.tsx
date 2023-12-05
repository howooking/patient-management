import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  src: string;
  fallback: string;
};

export default function UserAvatar({ src, fallback }: Props) {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
