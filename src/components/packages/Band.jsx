import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export const Band = () => {
  return (
    <Box
      width='100%' // Prend toute la largeur de l'écran
      bg='green.700' // Fond vert
      color='white' // Texte en blanc
      py={4} // Padding vertical
      display='flex' // Utilise flexbox pour aligner le texte
      alignItems='center' // Centre verticalement le texte
      justifyContent='center' // Centre horizontalement le texte
    >
      <Text fontSize='lg' fontWeight='800'>
        Stud-Access
      </Text>
    </Box>
  );
};
