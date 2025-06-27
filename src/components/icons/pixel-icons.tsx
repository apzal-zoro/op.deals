import type { SVGProps } from "react";

export function CoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M4 0H5V1H6V2H7V3H9V2H10V1H11V0H12V1H13V2H14V3H15V4H16V12H15V13H14V14H13V15H12V16H4V15H3V14H2V13H1V12H0V4H1V3H2V2H3V1H4V0Z" fill="#FFD700"/>
      <path d="M5 1H4V2H3V3H2V4H1V12H2V13H3V14H4V15H12V14H13V13H14V12H15V4H14V3H13V2H12V1H11V2H10V3H9V4H7V3H6V2H5V1Z" fill="#F2A900"/>
      <path d="M7 4H6V5H5V6H4V10H5V11H6V12H7V13H9V12H10V11H11V10H12V6H11V5H10V4H9V5H8V6H7V4Z" fill="#FFFFFF"/>
      <path d="M7,6V7H8V9H9V6H7Z" fill="#C0C0C0" />
    </svg>
  );
}

export function GemIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M4 1H12L15 5H1L4 1Z" fill="#7DF9FF"/>
      <path d="M1 5L8 15L15 5H1Z" fill="#00E5EE"/>
      <path d="M1 5L8 15L4 5H1Z" fill="#00B8D4" opacity="0.5"/>
      <path d="M15 5L8 15L12 5H15Z" fill="#00B8D4" opacity="0.5"/>
      <path d="M4 1L8 15L1 5" stroke="#2F4F4F" strokeWidth="0.5" />
      <path d="M12 1L8 15L15 5" stroke="#2F4F4F" strokeWidth="0.5" />
    </svg>
  );
}

export function SwordIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
            <path d="M13 0H14V1H15V2H16V3H15V4H14V5H13V6H12V7H11V8H10V9H9V10H8V11H7V12H6V13H5V14H4V15H3V16H2V15H1V14H0V13H1V12H2V11H3V10H4V9H5V8H6V7H7V6H8V5H9V4H10V3H11V2H12V1H13V0Z" fill="#C0C0C0"/>
            <path d="M12 2H11V3H10V4H9V5H8V6H7V7H6V8H5V9H4V10H3V11H2V12H1V13H0V14H1V15H2V16H3V15H4V14H5V13H6V12H7V11H8V10H9V9H10V8H11V7H12V6H13V5H14V4H15V3H16V2H15V1H14V0H13V2Z" fill="#808080"/>
            <path d="M11 5H12V6H13V4H12V3H10V2H11V1H9V2H8V3H7V4H6V5H5V6H4V7H3V8H2V9H4V8H5V7H6V6H7V5H8V4H9V3H10V4H11V5Z" fill="#A9A9A9"/>
        </svg>
    )
}
