'use client';
import { Field } from '@/components/ui/field';
import { Button, Heading, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
export const dynamic = 'force-dynamic';

export default function Page() {
  const [serie, setSerie] = useState('');
  const [annee, setAnnee] = useState('');
  const [nomEtablissementBac, setNomEtablissementBac] = useState('');
  const [moyenne, setMoyenne] = useState('');
  const [mention, setMention] = useState('');
  const [domaine1, setDomaine1] = useState('');
  const [domaine2, setDomaine2] = useState('');
  const [domaine3, setDomaine3] = useState('');
  const [villeFrance1, setVilleFrance1] = useState('');
  const [villeFrance2, setVilleFrance2] = useState('');
  const [villeFrance3, setVilleFrance3] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const body = {
      serie,
      annee,
      nomEtablissementBac,
      moyenne: parseFloat(moyenne),
      mention,
      domaine1,
      domaine2,
      domaine3,
      villeFrance1,
      villeFrance2,
      villeFrance3,
    };

    setIsPending(true);

    try {
      const response = await fetch('api/informations3', {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          'Félicitations ! Vos informations ont été ajoutées avec succès. Vous avez terminé avec succès toutes les étapes',
        );
        router.push('/');
      } else {
        throw new Error(
          data.message || 'Erreur lors de la mise à jour des informations',
        );
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Stack
      as='form'
      gap='4'
      maxW='md'
      w='100%'
      mx='auto'
      bg='light.800'
      p='1rem'
      borderTopRadius='md'
      border='1px'
      borderColor='gray.300'
      boxShadow='lg'
      onSubmit={handleUpdate}
    >
      <Heading
        fontWeight={700}
        fontSize='1.3rem'
        textAlign='center'
        bg='green.600'
        p='0.5rem'
        color='white'
      >
        Informations du Baccalauréat
      </Heading>
      <Field label='Série' required>
        <Input
          placeholder='Ex: Scientifique'
          variant='outline'
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
        />
      </Field>
      <Field label='Année' required>
        <Input
          type='date'
          variant='outline'
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
        />
      </Field>
      <Field label="Nom de l'établissement" required>
        <Input
          placeholder='Ex: Lycée XYZ'
          variant='outline'
          value={nomEtablissementBac}
          onChange={(e) => setNomEtablissementBac(e.target.value)}
        />
      </Field>
      <Field label='Moyenne' required>
        <Input
          type='number'
          step='0.01'
          variant='outline'
          placeholder='Ex: 15.75'
          value={moyenne}
          onChange={(e) => setMoyenne(e.target.value)}
        />
      </Field>
      <Field label='Mention' required>
        <Input
          placeholder='Ex: Bien'
          variant='outline'
          value={mention}
          onChange={(e) => setMention(e.target.value)}
        />
      </Field>
      <Field label='Premier choix du domaine' required>
        <Input
          placeholder='Ex: Génie Informatique'
          variant='outline'
          value={domaine1}
          onChange={(e) => setDomaine1(e.target.value)}
        />
      </Field>
      <Field label='Deuxième Choix du domaine' required>
        <Input
          placeholder='Ex: Architecture'
          variant='outline'
          value={domaine2}
          onChange={(e) => setDomaine2(e.target.value)}
        />
      </Field>
      <Field label='Troisième choix du domaine' required>
        <Input
          placeholder='Ex: Robotique'
          variant='outline'
          value={domaine3}
          onChange={(e) => setDomaine3(e.target.value)}
        />
      </Field>
      <Field label='Première ville de France que vous connaissez' required>
        <Input
          placeholder='Ex: Paris'
          variant='outline'
          value={villeFrance1}
          onChange={(e) => setVilleFrance1(e.target.value)}
        />
      </Field>
      <Field label='Deuxième ville de France que vous connaissez'>
        <Input
          placeholder='Ex: Lyon'
          variant='outline'
          value={villeFrance2}
          onChange={(e) => setVilleFrance2(e.target.value)}
        />
      </Field>
      <Field label='Troisième ville de France que vous connaissez'>
        <Input
          placeholder='Ex: Marseille'
          variant='outline'
          value={villeFrance3}
          onChange={(e) => setVilleFrance3(e.target.value)}
        />
      </Field>
      <Button
        _hover={{ bgColor: 'green.800' }}
        bg='green.600'
        type='submit'
        disabled={isPending}
      >
        {isPending ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </Stack>
  );
}
