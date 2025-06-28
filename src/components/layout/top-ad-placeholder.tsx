import Image from 'next/image';

export function TopAdPlaceholder() {
  return (
    <div className="flex justify-center items-center">
       <a href="#" target="_blank" rel="noopener sponsored">
         <Image
          src="https://placehold.co/1200x200.png"
          alt="Top advertisement placeholder"
          width={1200}
          height={200}
          className="w-full h-auto"
          data-ai-hint="advertisement banner"
        />
      </a>
    </div>
  );
}
