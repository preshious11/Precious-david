export function SocialIcon({ label }: { label: string }) {
  return <svg className="ui-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
    {label === 'X' && <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.8L6.3 3.9H4.4L17.8 20Z" />}
    {label === 'Instagram' && <g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></g>}
    {label === 'LinkedIn' && <><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><g fill="var(--paper)"><circle cx="7.5" cy="7.5" r="1.4" /><path d="M6.2 10h2.6v8H6.2zm4.2 0h2.5v1.1c.6-.9 1.4-1.3 2.5-1.3 2.1 0 2.8 1.4 2.8 3.5V18h-2.6v-4.2c0-1.1-.2-1.8-1.2-1.8-1.1 0-1.4.8-1.4 1.8V18h-2.6Z" /></g></>}
    {label === 'Behance' && <><path fillRule="evenodd" d="M1 5h7c3 0 4.5 1.3 4.5 3.5 0 1.4-.7 2.4-1.9 2.9 1.7.5 2.5 1.7 2.5 3.4 0 2.8-2 4.2-5 4.2H1V5Zm3 2.6v3h3.5c1.3 0 2-.5 2-1.5s-.7-1.5-2-1.5H4Zm0 5.4v3.4h3.8c1.6 0 2.3-.5 2.3-1.7S9.4 13 7.8 13H4Z" /><path d="M15 5h7v2h-7Z" /><path fillRule="evenodd" d="M23.5 14.5h-7.3c.1 1.8.9 2.6 2.4 2.6 1 0 1.8-.5 2-1.1h2.6c-.7 2.2-2.3 3.3-4.7 3.3-3.4 0-5.3-2.4-5.3-5.5 0-3.2 2.1-5.6 5.3-5.6 3.5 0 5.2 2.7 5 6.3Zm-7.2-1.9h4.4c-.2-1.5-.9-2.2-2.2-2.2-1.3 0-2 .8-2.2 2.2Z" /></>}
    {label === 'Dribbble' && <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M7 4.5c4.5 5 7.5 10 9 15.5M3.2 10c7.2.3 12-1.7 15.5-5M5.5 18.3c3-5.8 8.5-8 15.3-5.5" /></g>}
  </svg>;
}
