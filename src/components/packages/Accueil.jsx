import { navItems } from './homeItems';
import { Card, Flex, For, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';

export const Accueil = () => {
  return (
    <Stack
      as='main'
      px='1rem'
      py='1rem'
      maxW={{ base: '100%', lg: '90%' }}
      align='stretch'
      mx='auto'
    >
      <Card.Root border='none'>
        <Heading
          textAlign='center'
          my='2.5rem'
          size='xl'
          fontWeight='extrabold' // Mettre le titre bien en valeur
          fontSize={{ base: '2xl', md: '3xl' }} // Taille responsive du titre
          color='teal.700' // Couleur douce et chaleureuse pour le titre
          letterSpacing='wider' // Espacement entre les lettres pour un effet plus élégant
          mb='1.5rem'
          textDecoration='underline'
        >
          {' '}
          Pourquoi Stud-Access est un bon choix ?
        </Heading>
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
              border='none'
            >
              <Card.Header
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <Icon
                  asChild
                  fontSize='3rem'
                  color='green.600'
                  justifyContent='center'
                  alignContent='center'
                >
                  {item.icon}
                </Icon>{' '}
                <Text textAlign='center' fontWeight='600'>
                  {item.title}
                </Text>
              </Card.Header>
              <Card.Body
                pt={0}
                fontSize='sm'
                textAlign='center'
                color='fg.muted'
              >
                {item.description}
              </Card.Body>
            </Card.Root>
          )}
        </For>
      </Flex>
    </Stack>
  );
};
