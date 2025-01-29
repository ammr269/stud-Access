import { Box, Grid, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export const Footer = () => {
  return (
    <Box as='footer' bg='green.700' color='white' p={8} rounded='md'>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} // Responsivité
        gap={6}
        textAlign={{ base: 'center', md: 'left' }}
      >
        {/* Colonne 1 */}
        <VStack align={{ base: 'center', md: 'start' }} spacing={3}>
          <Text fontWeight='bold' fontSize='lg'>
            À propos
          </Text>
          <Link href='#' color='white' _hover={{ textDecoration: 'underline' }}>
            Qui sommes-nous ?
          </Link>
          <Link href='#' color='white' _hover={{ textDecoration: 'underline' }}>
            Nos services
          </Link>
          <Link href='#' color='white' _hover={{ textDecoration: 'underline' }}>
            Blog
          </Link>
        </VStack>

        {/* Colonne 2 */}
        <VStack align={{ base: 'center', md: 'start' }} spacing={3}>
          <Text fontWeight='bold' fontSize='lg'>
            Liens utiles
          </Text>
          <Link href='#' _hover={{ textDecoration: 'underline' }}>
            FAQ
          </Link>
          <Link href='#' color='white' _hover={{ textDecoration: 'underline' }}>
            Mentions légales
          </Link>
          <Link href='#' color='white' _hover={{ textDecoration: 'underline' }}>
            Politique de confidentialité
          </Link>
        </VStack>

        {/* Colonne 3 - Contact */}
        <VStack align={{ base: 'center', md: 'start' }} spacing={3}>
          <Text fontWeight='bold' fontSize='lg'>
            Nous contacter
          </Text>
          <HStack spacing={2}>
            <FaPhone />
            <Text>+269 4755900</Text>
          </HStack>
          <HStack spacing={2}>
            <FaEnvelope />
            <Text>studacces@gmail.com</Text>
          </HStack>
          <HStack spacing={2}>
            <FaMapMarkerAlt />
            <Text>Adresse : Moroni, Comores</Text>
          </HStack>
        </VStack>
      </Grid>

      <Box textAlign='center' mt={8}>
        <Text fontSize='sm' color='gray.200'>
          © {new Date().getFullYear()} Tous droits réservés.
        </Text>
      </Box>
    </Box>
  );
};
