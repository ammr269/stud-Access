'use client';

import SideBarNavigations from './sibe-bar-naviation';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { IconButton, Show, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { MdMenuOpen } from 'react-icons/md';

export function LeftSideBar() {
  const [isMd] = useMediaQuery(['(min-width: 520px)'], { ssr: false });
  const { data: session } = useSession();
  if (!session?.user) {
    return <Text></Text>; // Texte Chakra UI
  }
  if (session?.user?.role !== 'admin') {
    return <Text></Text>; // Texte Chakra UI
  }

  // Utilisateur connecté
  const user = session?.user
    ? {
        firstName: session.user.firstName || 'Utilisateur',
        lastName: session.user.lastName || '',
        role: session.user.role || 'Membre',
      }
    : null;

  return (
    <Show when={isMd} fallback={<MobileSideBar user={user} />}>
      <SideBar
        firstName={user?.firstName || ''}
        lastName={user?.lastName || ''}
        role={user?.role || ''}
      />
    </Show>
  );
}

function SideBar({ firstName, lastName, role }) {
  return (
    <Stack
      bgColor='gray.800'
      flexShrink={0}
      h='100%'
      flexBasis='100%'
      css={{
        '@media(min-width: 520px)': { maxW: '16rem' },
      }}
      py='1rem'
    >
      {/* Affichage des infos utilisateur */}
      <Stack px='0.5rem' alignItems='center' color='white'>
        <Text fontSize='lg' fontWeight='bold'>
          {firstName} {lastName}
        </Text>
        <Text fontSize='sm' color='gray.400'>
          {role}
        </Text>
      </Stack>

      {/* Navigation */}
      <Stack px='0.5rem' flexGrow={1}>
        <SideBarNavigations />
      </Stack>
    </Stack>
  );
}

function MobileSideBar({ user }) {
  const [open, setOpen] = useState(false);
  return (
    <DrawerRoot
      placement='start'
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton
          position='absolute'
          zIndex={100}
          variant='outline'
          size='lg'
          bg='green.600'
          color='white'
          left='0.5rem'
          top='0.5rem'
        >
          <MdMenuOpen />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent p={0}>
        <DrawerBody p={0}>
          <SideBar
            firstName={user?.firstName || ''}
            lastName={user?.lastName || ''}
            role={user?.role || ''}
          />
        </DrawerBody>
        <DrawerCloseTrigger bgColor='white' />
      </DrawerContent>
    </DrawerRoot>
  );
}
