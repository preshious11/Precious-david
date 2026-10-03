import { Icon } from '@/components/icon';
import { profile } from '@/data/portfolio';

export function TalkButton() {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;
  return <a className="talk-button" href={gmailUrl} target="_blank" rel="noopener noreferrer" aria-label="Let’s talk — compose an email in Gmail (opens a new tab)">Let’s talk <span aria-hidden="true"><Icon name="arrow-up-right" /></span></a>;
}
