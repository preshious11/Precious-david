import { ProjectMedia } from './project-media';
import type { ContentBlock } from '@/data/portfolio';
export function MediaBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph': return <p>{block.text}</p>;
    case 'heading': return <h3>{block.text}</h3>;
    case 'quote': return <blockquote>{block.text}</blockquote>;
    case 'image': return <ProjectMedia title={block.alt} src={block.src} />;
    case 'device': return <ProjectMedia title={block.alt} src={block.src} className="device-media" />;
    case 'gallery': case 'two-column': return <div className="case-gallery">{block.images.map((image, i) => <ProjectMedia key={i} title={image.alt} src={image.src} />)}</div>;
    case 'image-text': return <div className="case-gallery"><ProjectMedia title={block.alt} src={block.src} /><p>{block.text}</p></div>;
    case 'stat': return <div className="case-stat"><strong>{block.value}</strong><p>{block.label}</p></div>;
    case 'video': return block.src ? <figure><video className="case-video" controls preload="metadata" aria-label={block.caption}><source src={block.src} /><track kind="captions" /></video><figcaption>{block.caption}</figcaption></figure> : <ProjectMedia title={`${block.caption} — video placeholder`} />;
  }
}
