import Image from 'next/image';

export function AdPlaceholder({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="w-full h-[600px] flex items-center justify-center">
        <a href="#" target="_blank" rel="noopener sponsored">
            <Image
            src="https://placehold.co/160x600.png"
            alt={`Advertisement placeholder ${side}`}
            width={160}
            height={600}
            data-ai-hint="advertisement banner"
            />
        </a>
    </div>
  );
}
