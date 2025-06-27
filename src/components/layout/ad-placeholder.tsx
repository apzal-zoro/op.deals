import Image from 'next/image';

export function AdPlaceholder({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="w-full h-[600px] bg-card/50 rounded-lg flex flex-col items-center justify-center text-center p-2 border border-dashed border-border">
      <p className="text-muted-foreground text-sm mb-4">Advertisement</p>
      <a href="#" target="_blank" rel="noopener sponsored">
        <Image
          src="https://placehold.co/160x600.png"
          alt={`Advertisement placeholder ${side}`}
          width={160}
          height={600}
          className="rounded-md"
          data-ai-hint="advertisement banner"
        />
      </a>
    </div>
  );
}
