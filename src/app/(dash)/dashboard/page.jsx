'use client';
import { navItems } from '../../../components/packages/homeItems';
import { Card, Flex, For, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
export const dynamic = 'force-dynamic';

export default function Home() {
  const session = useSession();
  if (!session?.data?.user) {
    return <Text>Vous n&apos;êtes pas connecté</Text>;
  }
  if (session?.data?.user?.role !== 'admin') {
    return <Text>Vous n&apos;avez pas acces à cette page</Text>;
  }
  return (
    <Stack as='main' px='1rem' py='1rem'>
      <Card.Root size='md'>
        <Card.Body>
          <Heading size='md'> Bonjour {session?.data?.user?.name}</Heading>
        </Card.Body>
      </Card.Root>
      <Flex flexWrap='wrap' gap='0.5rem'>
        <For each={navItems}>
          {(item) => (
            <Card.Root
              // maxW={{ base: 'none', sm: '20rem' }}
              flexBasis='20rem'
              flexGrow={1}
              // w="100%"
              key={item.id}
            >
              <Card.Header>
                <Icon asChild fontSize='3rem' color='green.600'>
                  {item.icon}
                </Icon>{' '}
                <Text fontWeight='600'>{item.title}</Text>
              </Card.Header>
              <Card.Body pt={0} fontSize='sm' color='fg.muted'>
                {item.description}
              </Card.Body>
            </Card.Root>
          )}
        </For>
      </Flex>
    </Stack>
  );
}
