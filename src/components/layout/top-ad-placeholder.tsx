import Image from 'next/image';

export function TopAdPlaceholder() {
  return (
    <div className="bg-card/50 py-4 flex justify-center items-center text-center border-b border-border">
       <a href="#" target="_blank" rel="noopener sponsored" className="flex flex-col items-center gap-1">
         <span className="text-muted-foreground text-xs">Advertisement</span>
         <Image
          src="https://placehold.co/728x90.png"
          alt="Top advertisement placeholder"
          width={728}
          height={90}
          className="rounded-md"
          data-ai-hint="advertisement banner"
        />
      </a>
    </div>
  );
}
