import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const StudentInfos = ({ student }) => {
  const { name, createdAt, informationsPersonnelles } = student;

  return (
    <Box w='100%' mx='auto' p={6}>
      <Heading as='h1' size='xl' mb={6} textAlign='center' color='teal.700'>
        Informations de l&apos;Étudiant {name}
      </Heading>

      {/* Informations personnelles */}
      <VStack
        spacing={5}
        align='stretch'
        bg='gray.50'
        p={6}
        borderRadius='md'
        boxShadow='md'
        mb={6}
        border='1px solid'
        borderColor='gray.200'
      >
        <Heading as='h2' size='lg' color='teal.600'>
          1. Informations personnelles
        </Heading>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Nom:
          </Text>{' '}
          {name || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Date de création du compte:
          </Text>{' '}
          {new Date(createdAt).toLocaleDateString() || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Civilité:
          </Text>{' '}
          {informationsPersonnelles?.civilite || 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Date de naissance:
          </Text>{' '}
          {informationsPersonnelles?.dateNaissance
            ? new Date(
                informationsPersonnelles.dateNaissance,
              ).toLocaleDateString()
            : 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Niveau d&apos;étude:
          </Text>
          {informationsPersonnelles?.niveauEtude || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Pays de naissance:
          </Text>{' '}
          {informationsPersonnelles?.paysNaissance || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Commune et ville de Naissance:
          </Text>{' '}
          {informationsPersonnelles?.communeNaissance || 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Pays de résidence:
          </Text>
          {informationsPersonnelles?.paysResidence || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Adresse / Ville de résidence:
          </Text>
          {informationsPersonnelles?.adresseVille || 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Commune:
          </Text>{' '}
          {informationsPersonnelles?.commune || 'Non spécifiée'}
        </Text>

        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Téléphone:
          </Text>{' '}
          {informationsPersonnelles?.numeroTelephone || 'Non spécifié'}
        </Text>
      </VStack>

      {/* Scolarité */}
      <VStack
        spacing={5}
        align='stretch'
        bg='gray.50'
        p={6}
        borderRadius='md'
        boxShadow='md'
        mb={6}
        border='1px solid'
        borderColor='gray.200'
      >
        <Heading as='h2' size='lg' color='teal.600'>
          2. Scolarité
        </Heading>
        {student?.informationsPersonnelles?.scolarites &&
        student?.informationsPersonnelles?.scolarites.length > 0 ? (
          student?.informationsPersonnelles?.scolarites.map((scolarite) => (
            <Box
              key={scolarite.id}
              p={4}
              border='1px solid'
              borderColor='gray.300'
              borderRadius='md'
              mb={4}
              bg='white'
              boxShadow='sm'
            >
              <Text fontSize='md'>
                <Text as='strong' fontWeight='600'>
                  Session:
                </Text>{' '}
                {scolarite.session || 'Non spécifiée'}
              </Text>
              <Text fontSize='md'>
                <Text as='strong' fontWeight='600'>
                  Niveau:
                </Text>{' '}
                {scolarite.niveau || 'Non spécifié'}
              </Text>
              <Text fontSize='md'>
                <Text as='strong' fontWeight='600'>
                  Filière:
                </Text>{' '}
                {scolarite.filiere || 'Non spécifiée'}
              </Text>
              <Text fontSize='md'>
                <Text as='strong' fontWeight='600'>
                  Nom de l&apos;établissement:
                </Text>{' '}
                {scolarite.nomEtablissement || 'Non spécifié'}
              </Text>
              <Text fontSize='md'>
                <Text as='strong' fontWeight='600'>
                  Ville:
                </Text>{' '}
                {scolarite.ville || 'Non spécifiée'}
              </Text>
              <Text fontSize='md'>
                <Text as='strong' fontWeight='600'>
                  Pays:
                </Text>{' '}
                {scolarite.pays || 'Non spécifié'}
              </Text>
              <Text fontSize='md'>
                <Text as='strong' fontWeight='600'>
                  Matières et heures:
                </Text>
              </Text>
              <Text fontSize='md'>
                {scolarite.matiere1}: {scolarite.nbHeure1 || 0}h,{' '}
                {scolarite.matiere2}: {scolarite.nbHeure2 || 0}h,{' '}
                {scolarite.matiere3}: {scolarite.nbHeure3 || 0}h,{' '}
                {scolarite.matiere4}: {scolarite.nbHeure4 || 0}h
              </Text>
            </Box>
          ))
        ) : (
          <Text fontSize='md' color='gray.500'>
            ⚠️ Aucune donnée sur la scolarité pour l&apos;instant.
          </Text>
        )}
      </VStack>

      {/* Informations Baccalauréat */}
      <VStack
        spacing={5}
        align='stretch'
        bg='gray.50'
        p={6}
        borderRadius='md'
        boxShadow='md'
        border='1px solid'
        borderColor='gray.200'
      >
        <Heading as='h2' size='lg' color='teal.600'>
          3. Informations Baccalauréat
        </Heading>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Série:
          </Text>{' '}
          {informationsPersonnelles?.serie || 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Année:
          </Text>{' '}
          {informationsPersonnelles?.annee
            ? new Date(informationsPersonnelles.annee).getFullYear()
            : 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Établissement:
          </Text>{' '}
          {informationsPersonnelles?.nomEtablissementBac || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Moyenne:
          </Text>{' '}
          {informationsPersonnelles?.moyenne || 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Mention:
          </Text>{' '}
          {informationsPersonnelles?.mention || 'Non spécifiée'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Domaines d&apos;études:
          </Text>
          {[
            informationsPersonnelles?.domaine1,
            informationsPersonnelles?.domaine2,
            informationsPersonnelles?.domaine3,
          ]
            .filter(Boolean)
            .join(', ') || 'Non spécifiés'}
        </Text>{' '}
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Première ville en France:
          </Text>{' '}
          {informationsPersonnelles?.villeFrance1 || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Deuxième ville en France:
          </Text>{' '}
          {informationsPersonnelles?.villeFrance2 || 'Non spécifié'}
        </Text>
        <Text fontSize='md'>
          <Text as='strong' fontWeight='600'>
            Troisième ville en France:
          </Text>{' '}
          {informationsPersonnelles?.villeFrance3 || 'Non spécifié'}
        </Text>
      </VStack>
    </Box>
  );
};
