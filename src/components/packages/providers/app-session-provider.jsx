'use client';
import { AbsoluteCenter, Button, Icon, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaLock } from 'react-icons/fa';

export default function AppSessionProvider({ children }) {
  const { status } = useSession();

  if (status === 'unauthenticated')
    return (
      <Stack position='absolute' inset={0} bg='red.50'>
        <AbsoluteCenter>
          <Stack alignItems='center'>
            <Icon fontSize='4rem' asChild color='red.700'>
              <FaLock />
            </Icon>
            <Text fontWeight='600'>Vous n&apos;êtes pas connecté.</Text>
            <Button h='auto' colorPalette='red' variant='ghost' asChild>
              <Link href='/authentification'>Connexion</Link>
            </Button>
          </Stack>
        </AbsoluteCenter>
      </Stack>
    );
  return children;
}
