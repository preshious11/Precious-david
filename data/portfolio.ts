import adhdArticle from './articles/are-we-all-developing-adhd.json';

export const profile = {
  name: 'Precious David', role: 'Product Designer', location: 'Lagos, Nigeria', timezone: 'Africa/Lagos',
  availability: 'Available for work',
  intro: "I design digital products, obsess over the details, and occasionally build the ideas I can’t leave alone.",
  about: ["I’m Precious, a product designer interested in useful digital products, thoughtful interfaces and the messy decisions that happen before a screen gets designed.", "I’ve worked across product design, UI/UX and visual design, and lately I’ve been spending more time learning how to build some of the ideas I design."],
  email: 'officialpreciousdavid@gmail.com',
};
export const navigation = ['Work', 'About', 'Playground', 'Writing', 'Contact'];
export const experience = [
  {
    company: 'Omacart',
    role: 'Product Designer',
    timeline: 'Apr 2026–present',
    description: 'Shaping the product experience across Omacart’s digital platforms.',
    bullets: [
      'Responsible for product design across the mobile app, web platform and dashboards.',
      'Bringing a cohesive design approach to the interfaces and workflows across each platform.',
    ],
    placeholder: false,
  },
  {
    company: 'Freelance',
    role: 'Product Designer',
    timeline: 'Ongoing',
    description: 'Independent product design across a range of client projects.',
    bullets: [],
    placeholder: false,
  },
  {
    company: 'InMotionHub',
    role: 'UI/UX Designer (Lead)',
    timeline: 'Mar 2024–Sep 2024',
    description: 'Led design across web and mobile products, taking ideas from initial requirements to high-fidelity prototypes.',
    bullets: [
      'Independently delivered end-to-end design in Figma across 3+ projects, balancing product requirements with tight deadlines.',
      'Translated user feedback into design improvements that strengthened usability.',
      'Led stakeholder reviews to clarify design decisions and align delivery with project goals.',
    ],
    placeholder: false,
  },
];
export type ContentBlock =
  | { type: 'paragraph' | 'heading' | 'quote'; text: string }
  | { type: 'image' | 'device'; src?: string; alt: string }
  | { type: 'gallery' | 'two-column'; images: { src?: string; alt: string }[] }
  | { type: 'image-text'; src?: string; alt: string; text: string }
  | { type: 'stat'; value: string; label: string }
  | { type: 'video'; src?: string; caption: string };
export type Project = { slug: string; title: string; subtitle: string; year: string; role: string; platform: string; timeline: string; tags: string[]; heroImage?: string; description: string; sections: { title: string; blocks: ContentBlock[] }[]; color: string };
const projectSeeds = [
  ['yumunity', 'Yumunity', 'Food delivery for immigrant communities in Canada.', 'Marketplace · Mobile · Multi-sided product', '#dce2d9'],
  ['ourdonations', 'OurDonations', 'Fundraising and live auctions for schools and organisations.', 'Fundraising · Web · Community', '#e5dfd3'],
  ['creative-practice', 'Creative Practice Platform', 'A space to practice design and get thoughtful, professional feedback.', 'Education · Web · Design', '#dcdfe6'],
  ['school-management', 'School Management Portal', 'Bringing students, teachers, results and attendance together.', 'Administration · Web · Dashboard', '#e3ded8'],
  ['journaling', 'Journaling App', 'A place for thoughts, in all the forms they take.', 'Journaling · Multimedia · Collaboration', '#e4dedf'],
  ['dune', 'Dune', 'An exploration of a more considered investment experience.', 'Finance · Product concept', '#e5e2d2'],
];
export const projects: Project[] = projectSeeds.map(([slug, title, subtitle, tags, color]) => ({ slug, title, subtitle, tags: tags.split(' · '), color, year: 'To be added', role: 'Product Design', platform: tags.includes('Mobile') ? 'Mobile' : 'To be confirmed', timeline: 'To be added', description: subtitle, sections: ['Context', 'Problem', 'Discovery', 'Decisions', 'Exploration', 'Final experience', 'Outcome', 'Reflection'].map((title, i) => ({ title, blocks: i === 4 || i === 5 ? [{ type: 'image', alt: `${title} — image placeholder` }] : [{ type: 'paragraph', text: `Add the ${title.toLowerCase()} for this project. This case study is being documented; research, decisions and results will be added when available.` }] })) }));
export const sideProjects = [
  { name: 'Sports Prediction Telegram Bot', period: '2026', description: 'Exploring a conversational way to follow predictions.', status: 'Experiment', start: 52, length: 35 },
  { name: 'Trading / Market Signals', period: '2026', description: 'An experiment in understanding market signals.', status: 'Experiment', start: 62, length: 25 },
  { name: 'Android / Kotlin', period: '2025–now', description: 'Learning to turn small ideas into native apps.', status: 'Learning', start: 15, length: 72 },
  { name: 'Framer Experiments', period: 'Ongoing', description: 'Small studies in interactions and the web.', status: 'Exploring', start: 30, length: 57 },
  { name: 'Illustration Practice', period: 'Ongoing', description: 'Finding a visual voice, one sketch at a time.', status: 'Practicing', start: 5, length: 82 },
];
export const skills = [
  { label: 'PRODUCT', items: ['Product Design', 'UX Design', 'User Research', 'Information Architecture', 'User Flows'] },
  { label: 'INTERACTION', items: ['Interaction Design', 'Wireframing', 'Prototyping', 'Usability Testing'] },
  { label: 'INTERFACE', items: ['UI Design', 'Mobile Product Design', 'Web Product Design', 'Dashboard Design', 'Responsive Design'] },
  { label: 'SYSTEMS', items: ['Design Systems', 'Developer Handoff'] },
  { label: 'COLLABORATION', items: ['Cross-functional Collaboration'] },
];
export const tools = [
  { name: 'Figma', logo: 'figma', category: 'Product Design' },
  { name: 'Framer', logo: 'framer', category: 'Design + Build' },
  { name: 'Canva', logo: 'canva', category: 'Visual Design' },
  { name: 'Adobe Illustrator', logo: 'illustrator', category: 'Illustration' },
  { name: 'AI Coding', logo: 'code', category: 'Build / Experiments' },
];
export type WritingArticle = { slug: string; title: string; category: string; date: string; href?: string; author?: string; readingTime?: string; summary?: string; tags?: string[]; contentHtml?: string; image?: string; imageAlt?: string };
export const writing: WritingArticle[] = [
  ...[ ['basics-is-boring', 'Basics is boring', 'Design'], ['learning-android', 'Learning Android without losing my mind', 'Building'], ['quiet-design', 'Design doesn’t need to shout to convert', 'Design'] ].map(([slug, title, category]) => ({ slug, title, category, date: 'Draft · Coming soon' })),
  { slug: 'are-we-all-developing-adhd', title: 'Are We All Developing ADHD?', category: 'Attention · Medium', date: 'Mar 3, 2025', href: 'https://medium.com/@Pleshious/are-we-all-developing-adhd-861f5c157c15', author: 'Precious David', readingTime: '4 min read', summary: 'A personal reflection on digital distraction, information overload, and the habits that helped me reclaim my focus.', tags: ['ADHD', 'Technology', 'Distraction', 'Attention', 'Neurology'], contentHtml: adhdArticle.html, image: '/adhd-article-cover.jpeg', imageAlt: 'A hand holding a purple lens that brings a waterfront landscape into focus.' },
];
export const interests = [ { name: 'Football', mark: '↗', color: '#d4dbcc' }, { name: 'Anime', mark: '✳', color: '#dcd6e3' }, { name: 'Gaming', mark: '+', color: '#dbded9' }, { name: 'Music', mark: '♪', color: '#e7d9ca' }, { name: 'Reading', mark: 'Aa', color: '#d9dfe3' }, { name: 'Illustration', mark: '✎', color: '#e5dbd1' } ];
export const socialLinks = [{ label: 'X', href: 'https://x.com/figsir' }, { label: 'Instagram', href: '' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/precious-david-abb249201' }, { label: 'Behance', href: 'https://behance.net/uxpresh' }, { label: 'Dribbble', href: '' }];
