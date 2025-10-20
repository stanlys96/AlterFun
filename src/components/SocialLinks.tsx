import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

type SocialLinksProps = {
  youtube?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  linkedin?: string;
};

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function SocialLinks({ youtube, twitter, instagram, tiktok, facebook, linkedin }: SocialLinksProps) {
  const links = [
    { url: youtube, icon: Youtube, label: 'YouTube', color: 'hover:bg-red-600', name: 'YouTube' },
    { url: twitter, icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-500', name: 'Twitter/X' },
    { url: instagram, icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600', name: 'Instagram' },
    { url: tiktok, icon: TikTokIcon, label: 'TikTok', color: 'hover:bg-black', name: 'TikTok' },
    { url: facebook, icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-700', name: 'Facebook' },
    { url: linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-800', name: 'LinkedIn' },
  ].filter(link => link.url);

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {links.map(({ url, icon: Icon, label, color, name }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${name} profile`}
          className={`p-2.5 bg-gray-100 text-gray-700 rounded-lg transition-all duration-200 ${color} hover:text-white hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          title={name}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
