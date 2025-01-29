import { Accueil } from '@/components/packages/Accueil';
import { Indicator } from '@/components/packages/Indicator';
import { WhyUs } from '@/components/packages/WhyUs';
import { Stack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Stack>
      <WhyUs />
      <Accueil />
      <Indicator />
    </Stack>
  );
}
