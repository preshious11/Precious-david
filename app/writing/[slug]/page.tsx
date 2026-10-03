import { Icon } from '@/components/icon';
import { writing } from '@/data/portfolio';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
export function generateStaticParams() { return writing.map(w => ({ slug: w.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = writing.find(w => w.slug === slug);
  return { title: article?.title || 'Note not found', description: article?.summary };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = writing.find(w => w.slug === slug);
  if (!article) notFound();

  return <main id="main" className="wrap article-page">
    <div className="article-reading-column">
      <Link href="/writing" className="back-link mono"><Icon name="arrow-left" /> BACK TO WRITING</Link>
      <article>
        <header className="article-header">
          <p className="eyebrow muted">{article.category}</p>
          <h1>{article.title}</h1>
          <p className="article-byline muted">{article.author && <span>By {article.author}</span>}<span>{article.date}</span>{article.readingTime && <span>{article.readingTime}</span>}</p>
        </header>
        {article.image
          ? <figure className="article-image"><Image src={article.image} alt={article.imageAlt || ''} width={1600} height={1067} sizes="(max-width: 767px) 100vw, 700px" priority /></figure>
          : <div className="writing-card-image article-cover" aria-hidden="true"><Icon name="arrow-up-right" /></div>}
        {article.contentHtml
          // Checked-in HTML imported with an allowlist, without scripts or tracking pixels.
          ? <div className="article-prose" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          : <p>This note is still taking shape. The full article will be added here when it’s ready.</p>}
        {article.tags && <ul className="article-tags" aria-label="Article topics">{article.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        {article.href && <footer className="article-footer"><p className="small muted">Originally published on Medium.</p><a className="talk-button article-medium-button" href={article.href} target="_blank" rel="noopener noreferrer">Read on Medium <span aria-hidden="true"><Icon name="arrow-up-right" /></span></a></footer>}
      </article>
    </div>
  </main>;
}
