import { FIRST_STEP_FORM_PAGE } from '@/lib/routes/route.client';
import {
  Badge,
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

export const WhyUs = () => (
  <Stack
    direction={{ base: 'column', md: 'row' }} // Changer la direction selon la taille de l'écran
    spacing='1rem' // Espace entre les cartes
    align='stretch'
    maxW={{ base: '100%', lg: '90%' }} // 100% pour les petits écrans et 80% pour les grands écrans
    mx='auto' // Centrer le Stack horizontalement
    mt='2rem'
  >
    <Card.Root
      flexDirection={{ base: 'column', md: 'row' }} // Changer flexDirection selon la taille de l'écran
      overflow='hidden'
      maxW='xl'
      p='1rem'
      m='1rem'
      borderRadius='md'
      boxShadow='md'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', md: '200px' }} // L'image prend toute la largeur sur les petits écrans
        src='images/etud1.jpg'
        alt='Caffe Latte'
        borderRadius='md'
      />
      <Box p='1rem'>
        <Card.Body>
          <Card.Title
            mb='2'
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight='bold'
          >
            Votre avenir débute aujourd&apos;hui
          </Card.Title>
          <Card.Description fontSize={{ base: 'sm', md: 'md' }}>
            Vous avez envie de maximiser vos chances de réussite dans vos
            inscriptions ? Vous êtes au bon endroit !
          </Card.Description>
          <HStack mt='4' spacing='4'>
            <Badge>Bac</Badge>
            <Badge>Bac +</Badge>
          </HStack>
        </Card.Body>
        <Card.Footer>
          <Button
            asChild
            fontSize='20px'
            bg='green.700'
            w='full'
            size={{ base: 'md', sm: 'lg' }}
            _hover={{
              bg: 'green.700', // Changement de couleur au survol
              transform: 'scale(1.05)', // Effet d'agrandissement au survol
              transition: 'all 0.2s ease-in-out', // Transition fluide
            }}
            _active={{
              bg: 'teal.00', // Changer de couleur au clic
            }}
          >
            <Link href={FIRST_STEP_FORM_PAGE}>C&apos;est parti !</Link>
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
    {/* Deuxième Card */}
    <Card.Root
      p='2rem'
      size='md'
      m='1rem'
      border='none'
      flex='1'
      borderRadius='xl' // Coins arrondis pour un effet plus moderne
    >
      <Card.Header>
        <Heading
          size='2xl'
          fontWeight='extrabold' // Mettre le titre bien en valeur
          textAlign='center'
          fontSize={{ base: '2xl', md: '2rem' }} // Taille responsive du titre
          color='teal.700' // Couleur douce et chaleureuse pour le titre
          letterSpacing='wider' // Espacement entre les lettres pour un effet plus élégant
          mb='1.5rem' // Marge en bas du titre pour espacer un peu
          textDecoration='underline'
        >
          Bienvenue !
        </Heading>
      </Card.Header>

      <Card.Body
        color='gray.600'
        fontSize='lg'
        lineHeight='1.7'
        textAlign='center'
      >
        <Text>
          Préparez vos documents et soyez prêts à commencer le remplissage du
          formulaire. Vous êtes prêts ? Parfait ! Cliquez sur le bouton
          ci-dessous pour débuter cette belle aventure.
        </Text>
      </Card.Body>

      <Card.Footer display='flex' justifyContent='center' mt='1.5rem'>
        <Button
          asChild
          fontSize='lg'
          fontWeight='bold'
          bg='green.700'
          color='white'
          size='lg'
          _hover={{
            bg: 'green.700', // Changement de couleur au survol
            transform: 'scale(1.05)', // Effet d'agrandissement au survol
            transition: 'all 0.2s ease-in-out', // Transition fluide
          }}
          _active={{
            bg: 'green.700', // Changer de couleur au clic
          }}
        >
          <Link href={FIRST_STEP_FORM_PAGE}> Commencer</Link>
        </Button>
      </Card.Footer>
    </Card.Root>
  </Stack>
);
