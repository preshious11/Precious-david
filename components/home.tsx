'use client';
import { Icon } from '@/components/icon';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { experience, interests, profile, projects, sideProjects, skills, tools, writing } from '@/data/portfolio';
import { Reveal } from './motion';
import { TalkButton } from './talk-button';
import { ProjectMedia } from './project-media';
import { ToolIcon } from './tool-icon';
const interestIcons: Record<string, 'football' | 'anime' | 'gaming' | 'music' | 'reading' | 'illustration'> = { Football: 'football', Anime: 'anime', Gaming: 'gaming', Music: 'music', Reading: 'reading', Illustration: 'illustration' };
const MotionProjectCard = motion.create(Link);
function SectionHeading({ label, title, note, primary = false }: { label: string; title: string; note?: string; primary?: boolean }) { return <Reveal className="section-heading"><p className="eyebrow">{label}</p><div>{primary ? <h1>{title}</h1> : <h2>{title}</h2>}{note && <p className="muted section-note">{note}</p>}</div></Reveal>; }
function Hero() {
  const reduced = useReducedMotion();
  const [avatarHovered, setAvatarHovered] = useState(false);
  const avatarOpen = avatarHovered;
  return <section className="hero">
    <p className="availability"><span />{profile.availability}</p>
    <h1 className="hero-name" aria-label={profile.name}>{Array.from(profile.name).map((letter, i) => <span aria-hidden="true" key={i} style={{ animationDelay: `${60 + i * 25}ms` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}<span className="hero-avatar" aria-hidden="true" onMouseEnter={() => setAvatarHovered(true)} onMouseLeave={() => setAvatarHovered(false)}>
      <Image src="/avatar.png" alt="" width={30} height={30} unoptimized />
      <motion.span className="hero-avatar-preview" aria-hidden="true" initial={false} animate={{ opacity: avatarOpen ? 1 : 0, scale: avatarOpen ? 1 : .65, y: avatarOpen ? 0 : 12 }} transition={reduced ? { duration: 0 } : { type: 'spring', duration: .5, bounce: .32 }}>
        <Image src="/avatar.png" alt="" width={180} height={180} unoptimized />
      </motion.span>
    </span></h1>
    <div className="hero-description"><p className="hero-role">Product designer, illustrator & builder.</p><p>{profile.intro}</p></div>
    <div className="hero-actions"><TalkButton /><a className="text-link hero-resume" href="/resume.pdf" download>My Resume</a></div>
  </section>;
}
export function Experience() {
  const [active, setActive] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return <section className="section" id="experience">
    <SectionHeading label="EXPERIENCE" title="Where I’ve worked" note="Different teams. New perspectives. Always learning." />
    <div className="experience-list">
      {experience.map((item, i) => <article className={`experience-row ${active === i ? 'expanded' : ''}`} key={item.company}>
        <h3><button aria-expanded={active === i} aria-controls={`experience-${i}`} onClick={() => setActive(active === i ? null : i)}>
          <span className="experience-number mono">0{i + 1}</span>
          <strong>{item.company}</strong>
          <span className="experience-role">{item.role}</span>
          <span className="experience-date mono">{item.timeline}</span>
          <span className="accordion-icon">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span key={active === i ? 'minus' : 'plus'} initial={{ opacity: 0, scale: .25, filter: 'blur(4px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: .25, filter: 'blur(4px)' }} transition={{ type: 'spring', duration: reduced ? 0 : .3, bounce: 0 }}>
                <Icon name={active === i ? 'minus' : 'plus'} />
              </motion.span>
            </AnimatePresence>
          </span>
        </button></h3>
        <AnimatePresence initial={false}>{active === i && <motion.div id={`experience-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .45, ease: [0.22, 1, 0.36, 1] }}><div className="experience-content"><p>{item.description}</p>{item.bullets.length > 0 && <ul>{item.bullets.map(b => <li key={b}>{b}</li>)}</ul>}{item.placeholder && <span className="mono placeholder-note">EXPERIENCE DETAILS / EDITABLE PLACEHOLDER</span>}</div></motion.div>}</AnimatePresence>
      </article>)}
    </div>
  </section>;
}
export function Work({ primary = true }: { primary?: boolean } = {}) { const reduced = useReducedMotion(); return <section className="section work-section" id="work"><SectionHeading primary={primary} label="SELECTED WORK" title="A few things I’ve designed" note="From everyday problems to ideas worth exploring." /><div className="work-grid">{projects.map((p, i) => <MotionProjectCard href={`/work/${p.slug}`} className="project-card" key={p.slug} initial={reduced ? false : { opacity: 0, y: 36, scale: .97 }} whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .3 }} whileTap={reduced ? undefined : { scale: .96 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * .1 }}><div className="project-info"><h3>{p.title}</h3><p>{p.subtitle}</p><div className="project-tags mono">{p.tags.join(' / ')}</div></div><ProjectMedia title={p.title} color={p.color} src={p.heroImage} className="inline-project-media" /><div className="project-end"><span className="mono">PRODUCT DESIGN</span><span className="project-arrow"><Icon name="arrow-up-right" /></span></div></MotionProjectCard>)}</div></section>; }
export function SideQuests({ primary = true }: { primary?: boolean } = {}) { return <section className="section" id="playground"><SectionHeading primary={primary} label="SIDE QUESTS" title="Curiosity doesn’t clock out." note="Small experiments. Unfamiliar tools. Things I can’t leave alone." /><div className="timeline-years mono"><span>THE ONGOING LIST</span><span>2025</span><span>2026 <Icon name="arrow-right" /></span></div>{sideProjects.map(s => <div className="quest-row" key={s.name}><div><h3>{s.name}</h3><p className="muted small">{s.description}</p><span className="quest-mobile mono">{s.period} · {s.status}</span></div><div className="timeline-track"><div className="timeline-bar" style={{ marginLeft: `${s.start}%`, width: `${s.length}%` }}><span className="mono">{s.status}</span><i /></div></div><span className="quest-period mono">{s.period}</span></div>)}</section>; }
export function OffScreen() { const drag = useRef<{ x: number; scroll: number } | null>(null); return <section className="section offscreen"><SectionHeading label="OFF SCREEN" title="When Figma is closed" note="A few other things taking up space in my head." /><div className="interest-gallery" tabIndex={0} aria-label="Interests, scroll horizontally" onPointerDown={e => { if (e.pointerType !== 'mouse') return; drag.current = { x: e.clientX, scroll: e.currentTarget.scrollLeft }; e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.style.scrollSnapType = 'none'; }} onPointerMove={e => { if (drag.current) e.currentTarget.scrollLeft = drag.current.scroll - (e.clientX - drag.current.x); }} onPointerUp={e => { drag.current = null; e.currentTarget.style.scrollSnapType = ''; }} onPointerCancel={e => { drag.current = null; e.currentTarget.style.scrollSnapType = ''; }}>{interests.map((item, i) => <figure className={`interest interest-${i}`} key={item.name}><div className="interest-art" style={{ backgroundColor: item.color }}><span className="mono">PERSONAL ARCHIVE / 0{i + 1}</span><strong aria-hidden><Icon name={interestIcons[item.name]} /></strong><small className="mono">IMAGE PLACEHOLDER</small></div><figcaption><span>{item.name}</span><span><Icon name="arrow-up-right" /></span></figcaption></figure>)}</div><p className="gallery-hint mono">A LITTLE OF EVERYTHING. <span>SCROLL SIDEWAYS <Icon name="arrow-right" /></span></p></section>; }
export function Writing({ primary = true, grid = false }: { primary?: boolean; grid?: boolean } = {}) {
  const details = (w: (typeof writing)[number]) => w.href && <div className="writing-article-details"><p className="mono muted">By {w.author} · {w.readingTime}</p><p className="writing-summary">{w.summary}</p><p className="writing-topics mono muted">{w.tags?.join(' / ')}</p><span className="writing-medium-link">Read article <Icon name="arrow-up-right" /></span></div>;
  if (grid) return <section className="section" id="writing"><SectionHeading primary={primary} label="WRITING" title="Welcome to my journal" /><div className="writing-grid">{writing.map(w => <Link href={`/writing/${w.slug}`} key={w.slug} className="writing-card"><div className="writing-card-image" aria-hidden="true">{w.image ? <Image src={w.image} alt="" width={640} height={427} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" /> : <Icon name="arrow-up-right" />}</div><div className="writing-card-body"><span className="mono muted">{w.category}</span><h3>{w.title}</h3><span className="mono muted">{w.date}</span>{details(w)}</div></Link>)}</div></section>;
  return <section className="section" id="writing"><SectionHeading primary={primary} label="WRITING" title="Welcome to my journal" />{writing.map(w => <Link href={`/writing/${w.slug}`} key={w.slug} className="writing-row"><h3>{w.title}</h3><span className="mono muted">{w.category}</span><span className="mono muted">{w.date}</span><span className="writing-arrow"><Icon name="arrow-up-right" /></span>{w.summary && <div className="writing-hover-preview" aria-hidden="true">{w.image && <Image src={w.image} alt="" width={640} height={427} sizes="320px" />}<div className="writing-hover-preview-body"><p className="mono muted">{w.readingTime} · {w.author}</p><p className="writing-summary">{w.summary}</p><span className="writing-medium-link">Read article <Icon name="arrow-up-right" /></span></div></div>}</Link>)}</section>; }
export function About({ primary = true }: { primary?: boolean } = {}) {
  const Heading = primary ? 'h1' : 'h2';
  return <section className="section about" id="about">
    <Reveal>
      <p className="eyebrow">THE HUMAN BEHIND THE PIXEL</p>
      <Heading>A little about me</Heading>
      {profile.about.map(p => <p className="about-copy" key={p}>{p}</p>)}
      <span className="mono muted">ALWAYS A WORK IN PROGRESS. SO IS THIS BIO.</span>
    </Reveal>
    <div className="portrait-placeholder">
      <span className="mono">THE HUMAN BIT</span>
      <span className="portrait-mark" aria-hidden>p<span><Icon name="asterisk" /></span></span>
      <span className="mono">PORTRAIT PLACEHOLDER / PRECIOUS</span>
    </div>
  </section>;
}
export function Skills() { return <section className="section about-panel" id="skills"><Reveal><h2 className="eyebrow">SKILLS</h2></Reveal><div className="skill-groups">{skills.map(group => <div className="skill-group" key={group.label}><p className="mono skill-group-label">{group.label}</p><ul>{group.items.map(item => <li className="skill-item" key={item}>{item}</li>)}</ul></div>)}</div></section>; }
export function Tools() { return <section className="section about-panel" id="tools"><Reveal><h2 className="eyebrow">TOOLS I WORK WITH</h2></Reveal><div className="tool-grid">{tools.map(tool => <div className="tool-tile" key={tool.name}><span className="tool-logo"><ToolIcon name={tool.logo} /></span><span className="tool-tile-name">{tool.name}</span><span className="mono tool-tile-role">{tool.category}</span></div>)}</div></section>; }
export function Contact({ primary = true }: { primary?: boolean } = {}) { const Heading = primary ? 'h1' : 'h2'; return <section className="contact" id="contact"><Reveal><p className="eyebrow"><span className="status-dot" /> OPEN TO GOOD CONVERSATIONS</p><Heading>Have something interesting to build?</Heading><p className="contact-copy">Thoughtful products start with a conversation.</p></Reveal><div className="contact-actions"><TalkButton /></div></section>; }
export function Home() { return <main id="main" className="wrap home-page"><Hero /><Experience /><Work primary={false} /><SideQuests primary={false} /><OffScreen /><Writing primary={false} /><About primary={false} /><Contact primary={false} /></main>; }
