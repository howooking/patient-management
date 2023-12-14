"use client";

import Lottie from "react-lottie-player";
import noResult from "@/public/lotties/no-result.json";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import addDogIcon from "@/public/icons/add-dog.svg";
import { Dispatch, SetStateAction } from "react";

export default function NoResult({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Lottie
        loop
        animationData={noResult}
        play
        className="h-[320px] w-[320px]"
      />
      <h3 className="text-xl mt-4">검색 결과가 없습니다!</h3>
      <Button
        className="flex gap-2 items-center"
        onClick={() => setActiveTab("add")}
      >
        <Image
          src={addDogIcon}
          alt="dog with plus sign icon"
          unoptimized
          width={20}
        />
        환자 추가하기
      </Button>
    </div>
  );
}
