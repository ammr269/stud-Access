'use client';
import { Box, Table } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export const Indicator = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const indicatorMessages = [
    'Dossier en attente',
    "Dossier en cours d'initialisation",
    'Dossier en cours de traitement',
    "Dossier en validation. Veuillez vous présenter au niveau de l'agence",
    'Dossier en phase de soumission',
    'Dossier en finalisation',
    'Dossier prêt',
    'Dossier terminé',
  ];

  const indicatorOrder = [
    'Pending',
    'Initializing',
    'Progress',
    'Validating',
    'Testing',
    'Finalizing',
    'Ready',
    'Completed',
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/studentinfo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(
            'Erreur lors de la récupération des données utilisateur.',
          );
        }

        const data = await response.json();

        if (data?.message === 'Données utilisateur récupérées avec succès.') {
          setUserData(data?.data);
        } else {
          setError(data?.message || 'Erreur inconnue');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    void fetchUserData();
  }, [session?.user?.id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!userData) {
    return <div></div>;
  }

  const currentIndex = indicatorOrder.indexOf(userData?.indicator);

  return (
    <Box p='4' display='flex' justifyContent='center' alignItems='center'>
      <Table.Root
        size='sm'
        w={{ base: '90%', lg: '50%' }} // 90% on small screens, 50% on large screens
        borderRadius='sm'
        shadow='lg'
        variant='outline'
      >
        <Table.Header>
          <Table.Row textAlign='center' p='1rem'>
            <Table.Cell
              textAlign='center'
              fontWeight='bold'
              fontSize='1.2rem'
              bg='green.700'
              color='White'
              h='50px'
            >
              Tableau de suivi du dossier de {userData.name}
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.ColumnGroup>
          <Table.Column htmlWidth='25%' />
          <Table.Column />
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row></Table.Row>
        </Table.Header>
        <Table.Body>
          {indicatorMessages.map((message, index) => (
            <Table.Row
              key={index}
              color={index <= currentIndex ? 'green.500' : 'gray.500'}
              fontWeight={index <= currentIndex ? 'bold' : 'normal'}
            >
              <Table.Cell textAlign='center' p='4' fontSize='1rem'>
                {message}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
