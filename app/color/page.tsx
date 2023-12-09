export default async function page() {
  return (
    <div className="container">
      {/* {vet && <pre>{JSON.stringify(vet, null, 2)}</pre>} */}
      <p className="text-5xl">5xl(67.36px) 크기</p>
      <p className="text-4xl">4xl(50.56px) 크기</p>
      <p className="text-3xl">3xl(37.92px) 크기</p>
      <p className="text-2xl">2xl(28.48px) 크기</p>
      <p className="text-xl">xl(21.28px) 크기</p>
      <p className="text-base">base(16px) 크기</p>
      <p className="text-sm">sm(14px) 크기</p>
      <p className="text-xs">xs(12px) 크기</p>
      <div className="flex text-amber-400 gap-6 flex-wrap">
        <div className="border w-28 h-28 bg-background ">background</div>
        <div className="border w-28 h-28 bg-foreground">foreground</div>
        <div className="border w-28 h-28 bg-primary">primary</div>
        <div className="border w-28 h-28 bg-primary-foreground ">
          primary foreground
        </div>
        <div className="border  w-28 h-28 bg-secondary">secondary</div>
        <div className="border w-28 h-28 bg-muted secondary-foreground ">
          secondary foreground
        </div>
        <div className="border w-28 h-28 bg-muted  ">muted</div>
        <div className="border w-28 h-28 bg-foreground">muted-foreground</div>
        <div className="border w-28 h-28 bg-accent ">accent</div>
        <div className="border w-28 h-28 bg-accent-foreground ">
          accent foreground
        </div>
        <div className="border w-28 h-28 bg-destructive">destructive</div>
        <div className="border w-28 h-28 bg-foreground">
          destructive foreground
        </div>
        <div className="border w-28 h-28 bg-border">border</div>
      </div>
    </div>
  );
}
