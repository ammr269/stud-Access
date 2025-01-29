import { Accueil } from '@/components/packages/Accueil';
import { Indicator } from '@/components/packages/Indicator';
import { WhyUs } from '@/components/packages/WhyUs';

export default function Home() {
  return (
    <main>
      <WhyUs />
      <Accueil />
      <Indicator />
    </main>
  );
}
