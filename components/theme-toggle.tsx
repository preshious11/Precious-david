'use client';
import { Icon } from '@/components/icon';
import { useSyncExternalStore } from 'react';

let themeListeners: (() => void)[] = [];
const subscribeTheme = (cb: () => void) => { themeListeners.push(cb); return () => { themeListeners = themeListeners.filter(l => l !== cb); }; };
const getThemeSnapshot = () => document.documentElement.dataset.theme === 'dark';
const getServerThemeSnapshot = () => false;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  function toggle() {
    // Suppress transitions during the flip so every color/background/border
    // change fires at once instead of smearing across the page.
    const style = document.createElement('style');
    style.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.appendChild(style);
    void document.body.offsetHeight;
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('precious-theme', next); } catch { /* Theme works without storage. */ }
    themeListeners.forEach(l => l());
    requestAnimationFrame(() => { style.remove(); });
  }
  return <button className="theme-toggle" onClick={toggle} aria-pressed={dark} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}><span className="theme-to-dark" aria-hidden="true"><Icon name="moon" /></span><span className="theme-to-light" aria-hidden="true"><Icon name="sun" /></span></button>;
}
