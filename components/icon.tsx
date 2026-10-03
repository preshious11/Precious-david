import { ArrowUpRight, ArrowRight, ArrowLeft, Moon, Sun, Plus, Minus, Menu, X, Asterisk, Mail, ContactRound, FileText, CircleDot, Sparkles, Gamepad2, Music2, BookOpen, PenTool, Download } from 'lucide-react';

const icons = {
  'arrow-up-right': ArrowUpRight, 'arrow-right': ArrowRight, 'arrow-left': ArrowLeft,
  moon: Moon, sun: Sun, plus: Plus, minus: Minus, menu: Menu, close: X,
  asterisk: Asterisk, mail: Mail, linkedin: ContactRound, file: FileText, download: Download,
  football: CircleDot, anime: Sparkles, gaming: Gamepad2, music: Music2,
  reading: BookOpen, illustration: PenTool,
};

export function Icon({ name }: { name: keyof typeof icons }) {
  const Component = icons[name];
  return <Component className="ui-icon" size={18} strokeWidth={1.7} aria-hidden="true" focusable="false" />;
}

