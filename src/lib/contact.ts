import type { IconName } from '../components/ui/icons';
import type { ContactDetails } from '../types/portfolio';

export type ContactChannelId = keyof ContactDetails;

export interface ContactChannel {
  id: ContactChannelId;
  href: string;
  /** Human-readable value, e.g. the email address or profile path. */
  display: string;
  icon: IconName;
  external: boolean;
}

const ICONS: Record<ContactChannelId, IconName> = {
  email: 'mail',
  phone: 'phone',
  whatsapp: 'whatsapp',
  linkedin: 'linkedin',
  github: 'github',
  website: 'globe',
};

function toHref(id: ContactChannelId, value: string): string {
  if (id === 'email') return `mailto:${value}`;
  if (id === 'phone') return `tel:${value.replace(/[^\d+]/g, '')}`;
  if (id === 'whatsapp') return `https://wa.me/${value.replace(/\D/g, '')}`;
  return value;
}

function toDisplay(id: ContactChannelId, value: string): string {
  if (id === 'email' || id === 'phone' || id === 'whatsapp') return value;
  return value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

/** Converts contact details into renderable channels, skipping empty values. */
export function getContactChannels(contact: ContactDetails): ContactChannel[] {
  return (Object.keys(ICONS) as ContactChannelId[]).flatMap((id) => {
    const value = contact[id]?.trim();
    if (!value) return [];
    return [
      {
        id,
        href: toHref(id, value),
        display: toDisplay(id, value),
        icon: ICONS[id],
        external: id !== 'email' && id !== 'phone',
      },
    ];
  });
}
