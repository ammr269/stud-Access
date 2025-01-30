import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { LeftSideBar } from '@/components/packages/leftSideBar';
import { ClientOnly, Stack } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/authentification');
  }
  return (
    <Stack
      position='absolute'
      bgColor='gray.100'
      inset={0}
      w='100%'
      h='100%'
      overflow='hidden'
      flexDirection='row'
      gap={0}
    >
      <ClientOnly>
        <LeftSideBar />
      </ClientOnly>
    </Stack>
  );
}
