import { LeftSideBar } from '@/components/packages/leftSideBar';
import { ClientOnly, Stack } from '@chakra-ui/react';
import React from 'react';

export default function page() {
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
