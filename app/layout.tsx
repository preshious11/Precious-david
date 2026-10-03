import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar, Footer } from '@/components/navigation';
const themeScript = `(function(){try{var theme=localStorage.getItem('precious-theme');document.documentElement.dataset.theme=theme==='light'||theme==='dark'?theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`;
export const metadata: Metadata = { icons: { icon: '/avatar.png', apple: '/avatar.png' }, title: { default: 'Precious — Product designer & curious human', template: '%s — Precious' }, description: 'Precious is a product designer, illustrator and builder based in Lagos, Nigeria. Selected work, experiments and notes from the process.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={GeistSans.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><a className="skip-link" href="#main">Skip to content</a><Navbar />{children}<Footer /></body></html>; }
