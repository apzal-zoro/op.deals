import Image from 'next/image';

export function TopAdPlaceholder() {
  return (
    <div className="py-4 flex justify-center items-center">
       <a href="#" target="_blank" rel="noopener sponsored">
         <Image
          src="https://placehold.co/728x90.png"
          alt="Top advertisement placeholder"
          width={728}
          height={90}
          data-ai-hint="advertisement banner"
        />
      </a>
    </div>
  );
}
