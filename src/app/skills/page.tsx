import PageShell from '@/components/ui/PageShell';
import SkillsGrid from '@/components/skills/SkillsGrid';

export const metadata = {
  title: 'Compétences | Nathan Skwarek',
  description: 'Langages, Data & Analyse, Outils',
};

export default function SkillsPage() {
  return (
    <PageShell title="Compétences" subtitle="Skills" orbColor="#00c8ff">
      <SkillsGrid />
    </PageShell>
  );
}
