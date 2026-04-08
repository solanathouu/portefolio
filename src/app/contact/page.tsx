import PageShell from '@/components/ui/PageShell';
import ContactLinks from '@/components/contact/ContactLinks';

export const metadata = {
  title: 'Contact | Nathan Skwarek',
  description: 'Me contacter — Email, LinkedIn, GitHub',
};

export default function ContactPage() {
  return (
    <PageShell title="Contact" subtitle="Get in touch">
      <ContactLinks />
    </PageShell>
  );
}
