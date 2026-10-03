import { Icon } from '@/components/icon';
import Link from 'next/link';
export default function NotFound() { return <main id="main" className="wrap not-found"><span className="mono">404 / A WRONG TURN</span><h1 className="case-title">Nothing here. Yet.</h1><p>Let’s get you back to the good stuff.</p><Link href="/">Back to Precious <Icon name="arrow-right" /></Link></main>; }
