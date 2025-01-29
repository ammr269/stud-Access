'use client';
import { navItems } from './navItems';
import { Button, For, List } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function SideBarNavigations() {
  const pathname = usePathname();
  return (
    <List.Root
      gap='2'
      variant='plain'
      align='center'
      color='gray.50'
      minH='130vh' // Adapte la hauteur au conteneur
      h='100%' // Fait en sorte que la liste occupe toute la hauteur disponible
      overflowY='auto'
    >
      {/* {navItems.map((nav) => ( */}
      <For each={navItems}>
        {(nav) => (
          <List.Item key={nav.id}>
            <Button
              _active={{ transform: 'scale(0.9)' }}
              asChild
              w='100%'
              justifyContent='left'
              bgColor={pathname === nav.href ? 'green.800' : 'black'}
              _hover={{ bgColor: 'green.800' }}
            >
              <Link href={nav.href}>
                <List.Indicator asChild color='green.500'>
                  {nav.icon}
                </List.Indicator>
                {nav.title}
              </Link>
            </Button>
          </List.Item>
        )}
      </For>
      {/* ))} */}
    </List.Root>
  );
}
