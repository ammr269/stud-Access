'use client';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import {
  AUTH_PAGE,
  DASHBOARD_PAGE,
  SUGNUP_PAGE,
} from '@/lib/routes/route.client';
import {
  Box,
  Button,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { CiSearch, CiUser } from 'react-icons/ci';
import { HiSortAscending } from 'react-icons/hi';

export default function Navbar() {
  const [open, setOpen] = useState(false); // State to manage Drawer open/close
  const { data: session, status } = useSession(); // Récupère les données de la session
  const loading = status === 'loading'; // Vérifie si la session est en cours de chargement

  return (
    <Box bg='light.600' position='relative' px='1.5rem'>
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        {/* Logo */}
        <Box fontWeight='bold' as='div' fontSize='xl' color='white'>
          <Link href='/' passHref>
            <Image width={70} src='/images/logost.png' fill alt='Logo' />
          </Link>
        </Box>

        {/* Desktop View - Show everything on large screens */}
        <HStack
          spacing={6}
          flex={1}
          justifyContent='flex-end'
          display={{ base: 'none', lg: 'flex' }} // Hide on small/medium screens, show on large screens
        >
          {/* Search Bar */}
          <Flex as='form' alignItems='center' maxW='md' w='full'>
            <Input
              placeholder='Rechercher'
              bg='white'
              borderRadius='sm'
              _placeholder={{ color: 'gray.500' }}
              shadow='sm'
            />
            <IconButton
              type='submit'
              icon={<CiSearch />}
              aria-label='Search'
              ml={2}
              bg='white'
              _hover={{ bg: 'gray.100' }}
            />
          </Flex>

          {/* Menu Items */}
          <MenuRoot>
            <MenuTrigger asChild>
              <Button
                size='sm'
                variant='outline'
                leftIcon={<HiSortAscending />}
              >
                <CiUser />
                Actions
              </Button>
            </MenuTrigger>
            <MenuContent>
              {loading ? (
                <MenuItem asChild>
                  <Button isLoading>Chargement...</Button>
                </MenuItem>
              ) : session ? (
                <>
                  {/* Bouton Admin si l'utilisateur est admin */}
                  {session.user?.role === 'admin' && (
                    <MenuItem asChild>
                      <Button
                        color='black'
                        size='sm'
                        bg='white'
                        _hover={{ bg: 'gray.200' }}
                        asChild
                      >
                        <Link href={DASHBOARD_PAGE}> Accès Admin</Link>
                      </Button>
                    </MenuItem>
                  )}
                  {/* Bouton Déconnexion */}
                  <MenuItem asChild>
                    <Button
                      color='black'
                      size='sm'
                      bg='white'
                      _hover={{ bg: 'gray.200' }}
                      onClick={() => signOut()}
                    >
                      Se déconnecter
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <>
                  {/* Boutons Connexion / Inscription */}
                  <MenuItem asChild value='login'>
                    <Link href={AUTH_PAGE}>Se connecter</Link>
                  </MenuItem>
                  <MenuItem asChild value='register'>
                    <Link href={SUGNUP_PAGE}>S&apos;inscrire</Link>
                  </MenuItem>
                </>
              )}
            </MenuContent>
          </MenuRoot>
        </HStack>

        {/* Mobile View - Show only logo, search, and burger button */}
        <HStack
          spacing={4}
          flex={1}
          justifyContent='flex-end'
          display={{ base: 'flex', lg: 'none' }} // Show on small/medium screens, hide on large screens
        >
          {/* Search Bar */}
          <Flex as='form' alignItems='center' maxW='md' w='full'>
            <Input
              placeholder='Rechercher'
              bg='white'
              borderRadius='md'
              _placeholder={{ color: 'gray.500' }}
              shadow='sm'
            />
          </Flex>

          {/* Burger Menu Icon */}
          <Button
            _active={{ transform: 'scale(0.9)' }}
            display={{ base: 'flex', lg: 'none' }}
            bg='white'
            border='sm'
            shadow='md'
            _hover={{
              bg: 'light.900',
            }}
            onClick={() => setOpen(true)}
          >
            <AiOutlineMenuFold color='black' />
          </Button>
        </HStack>
      </Flex>

      {/* Drawer */}
      <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent
          position='fixed'
          top='0'
          right='0' // Align Drawer to the right
          bottom='0'
          zIndex='9999' // Ensure Drawer is on top of other content
          bg='white'
          boxShadow='xl'
          width='250px' // Set width for Drawer (you can adjust as needed)
        >
          <DrawerHeader>
            <DrawerTitle
              bg='green.700'
              p='1rem'
              rounded='10px'
              color='white'
              textAlign='center'
            >
              Menu
            </DrawerTitle>
          </DrawerHeader>

          {/* DrawerBody */}
          <DrawerBody>
            <VStack spacing={4} align='stretch' width='100%'>
              {loading ? (
                <Button isLoading>Chargement...</Button>
              ) : session ? (
                <>
                  {/* Bouton Accès Admin si l'utilisateur est un admin */}
                  {session.user?.role === 'admin' && (
                    <Button
                      variant='surface'
                      colorScheme='green'
                      size='lg'
                      _hover={{ bg: 'green.700', color: 'white' }}
                      asChild
                    >
                      <Link href={DASHBOARD_PAGE}> Accès Admin</Link>
                    </Button>
                  )}

                  {/* Bouton Déconnexion */}
                  <Button
                    variant='surface'
                    colorScheme='red'
                    size='lg'
                    _hover={{ bg: 'red.600', color: 'white' }}
                    onClick={() => signOut()}
                  >
                    Se déconnecter
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant='surface'
                    colorScheme='blue'
                    size='lg'
                    _hover={{ bg: 'blue.600', color: 'white' }}
                    asChild
                  >
                    <Link href={SUGNUP_PAGE}> S&apos;inscrire</Link>
                  </Button>
                  <Button
                    variant='surface'
                    colorScheme='green'
                    size='lg'
                    _hover={{ bg: 'green.600', color: 'white' }}
                    asChild
                  >
                    <Link href={AUTH_PAGE}> Se connecter</Link>
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Fermer
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
}
