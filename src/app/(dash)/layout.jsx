import { Band } from '@/components/packages/Band';
import Navbar from '@/components/packages/Barnav';
import { LeftSideBar } from '@/components/packages/leftSideBar';
import AppSessionProvider from '@/components/packages/providers/app-session-provider';
import { Separator, Stack, Text } from '@chakra-ui/react';

export default function DashLayout({ children }) {
  return (
    <AppSessionProvider>
      <Stack>
        <Stack
          position='absolute' // Change from absolute to relative
          inset={0}
          bgColor='gray.100'
          overflow='hidden'
          flexDirection='row'
          gap={0}
        >
          <LeftSideBar />
          <Stack bgColor='gray.200' h='100%' flexGrow={1} overflow='hidden'>
            <Navbar />
            <Stack overflowY='auto'>
              <Band />
              {children}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </AppSessionProvider>
  );
}
export function UserInfo({ firstName, role }) {
  return (
    <Stack bgColor='gray.700' px='0.5rem' py='1rem' rounded='md'>
      <Text color='gray.50'>{firstName}</Text>
      <Separator />
      <Text color='gray.100' fontSize='sm'>
        {role}
      </Text>
    </Stack>
  );
}
