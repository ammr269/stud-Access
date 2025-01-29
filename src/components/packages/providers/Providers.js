'use client';

import { UiProvider } from '@/components/ui/uiProvider';
import { AbsoluteCenter, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import Logo from '~/images/logost.png';
import NextImage from 'next/image';
import { SessionProvider, useSession } from 'next-auth/react';

export function Providers({ children }) {
  return (
    <UiProvider>
      <SessionProvider>
        <AppSessionLoader>{children}</AppSessionLoader>
      </SessionProvider>
    </UiProvider>
  );
}

function AppSessionLoader({ children }) {
  const { status } = useSession();
  if (status === 'loading')
    return (
      <Stack position='absolute' inset={0} bg='green.50'>
        <AbsoluteCenter>
          <Stack alignItems='center'>
            <NextImage
              src={Logo}
              alt='Stud Access Logo'
              width={300}
              height={300}
            />
            <Flex
              gap='0.5rem'
              alignItems='center'
              fontWeight='600'
              position='relative'
              top='-2rem'
            >
              <Spinner size='md' />
              <Text fontSize='1.3rem'>Chargement...</Text>
            </Flex>
          </Stack>
        </AbsoluteCenter>
      </Stack>
    );
  return children;
}
