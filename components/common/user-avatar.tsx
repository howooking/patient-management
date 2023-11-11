"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  src: string;
  fallback: string;
};

export default function UserAvatar({ src, fallback }: UserAvatarProps) {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
