'use client';
import {
  AbsoluteCenter,
  Button,
  ButtonGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import Logo from '~/images/logost.png';
import NextImage from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// import { FaLock } from 'react-icons/fa';

export default function AppSessionProvider({ children }) {
  const { status } = useSession();

  if (status === 'unauthenticated')
    return (
      <Stack position='absolute' inset={0} bg='white'>
        <AbsoluteCenter>
          <Stack alignItems='center'>
            {/* <Icon fontSize='4rem' asChild color='red.700'>
              <FaLock />
            </Icon> */}
            <NextImage
              src={Logo}
              alt='Stud Access Logo'
              width={300}
              height={300}
            />
            <Text fontWeight='600'>
              Vous devez vous connecter pour commencer
            </Text>
            <ButtonGroup>
              <Button h='auto' colorPalette='blue' asChild>
                <Link href='/authentification'>Connexion</Link>
              </Button>
              <Button h='auto' colorPalette='green' asChild>
                <Link href='/inscription'>S&apos;inscrire</Link>
              </Button>
            </ButtonGroup>
          </Stack>
        </AbsoluteCenter>
      </Stack>
    );
  return children;
}
