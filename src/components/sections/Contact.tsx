import { personal } from '../../data/personal';
import { useLanguage } from '../../i18n/useLanguage';
import { getContactChannels } from '../../lib/contact';
import { AppLink } from '../ui/AppLink';
import { ButtonLink } from '../ui/ButtonLink';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import styles from './Contact.module.css';

const channels = getContactChannels(personal.contact);
const emailChannel = channels.find((channel) => channel.id === 'email');
const whatsappChannel = channels.find((channel) => channel.id === 'whatsapp');

export function Contact() {
  const { t, text } = useLanguage();

  return (
    <Section id="contact" title={t.contact.title} description={t.contact.description}>
      <div className={styles.layout}>
        <ul className={styles.channels}>
          {channels.map((channel) => (
            <Card key={channel.id} as="li" interactive className={styles.channel}>
              <span className={styles.channelIcon}>
                <Icon name={channel.icon} size={22} weight="duotone" />
              </span>
              <span className={styles.channelText}>
                <span className={styles.channelLabel}>{t.contact.channels[channel.id]}</span>
                <AppLink href={channel.href} external={channel.external} className={styles.channelValue} dir="ltr">
                  {channel.display}
                </AppLink>
              </span>
            </Card>
          ))}
          <Card as="li" className={styles.channel}>
            <span className={styles.channelIcon}>
              <Icon name="mapPin" size={22} weight="duotone" />
            </span>
            <span className={styles.channelText}>
              <span className={styles.channelLabel}>{t.contact.location}</span>
              <span className={styles.channelPlain}>{text(personal.location)}</span>
            </span>
          </Card>
        </ul>

        {(emailChannel || whatsappChannel) && (
          <div className={styles.actions}>
            {emailChannel && (
              <ButtonLink href={emailChannel.href} icon="mail" magnetic>
                {t.contact.sendEmail}
              </ButtonLink>
            )}
            {whatsappChannel && (
              <ButtonLink href={whatsappChannel.href} variant="secondary" icon="whatsapp" external magnetic>
                {t.contact.whatsappMe}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
