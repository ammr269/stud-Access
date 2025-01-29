'use client';
import { Field } from '@/components/ui/field';
import { THIRD_STEP_FORM_PAFE } from '@/lib/routes/route.client';
import {
  Button,
  ButtonGroup,
  createListCollection,
  Heading,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
export const dynamic = 'force-dynamic';

export default function Page() {
  const [sessionE, setSessionE] = useState('');
  const [niveau, setNiveau] = useState('');
  const [filiere, setFiliere] = useState('');
  const [nomEtablissement, setNomEtablissement] = useState('');
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [matiere1, setMatiere1] = useState('');
  const [nbHeure1, setNbHeure1] = useState(0);
  const [matiere2, setMatiere2] = useState('');
  const [nbHeure2, setNbHeure2] = useState(0);
  const [matiere3, setMatiere3] = useState('');
  const [nbHeure3, setNbHeure3] = useState(0);
  const [matiere4, setMatiere4] = useState('');
  const [nbHeure4, setNbHeure4] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    // Créer un objet avec les valeurs de l'état
    const body = {
      sessionE,
      niveau,
      filiere,
      nomEtablissement,
      ville,
      pays,
      matiere1,
      nbHeure1,
      matiere2,
      nbHeure2,
      matiere3,
      nbHeure3,
      matiere4,
      nbHeure4,
    };

    try {
      const response = await fetch('api/scolarite', {
        method: 'POST', // Utiliser POST pour la création d'une nouvelle entrée
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Scolarité enregistrée avec succès');
      } else {
        throw new Error(data.message || "Erreur lors de l'enregistrement");
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
      maxW={{ base: '85%', lg: '40%' }}
      w={{ base: '85%', lg: '95%' }} // Modifié pour avoir 85% sur petits écrans et 45% sur grands écrans
      mx='auto'
      bg='white'
      p='4'
      borderTopRadius='md'
      border='1px'
      borderColor='gray.300'
      boxShadow='md'
      onSubmit={handleSubmit}
    >
      <Heading
        fontWeight={700}
        fontSize='1.3rem'
        textAlign='center'
        bg='green.700'
        p='0.5rem'
        color='white'
      >
        Scolarité
      </Heading>

      <Field label='Session' required>
        <SelectRoot
          collection={frameworks}
          width='320px'
          value={sessionE}
          onValueChange={(e) => setSessionE(e.value)}
        >
          <SelectTrigger>
            <SelectValueText placeholder='Selectionner par ordre' />
          </SelectTrigger>
          <SelectContent>
            {frameworks.items.map((movie) => (
              <SelectItem item={movie} key={movie.value}>
                {movie.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field>

      <Field label='Niveau' required>
        <Input
          placeholder='Ex: Bac +3'
          variant='outline'
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
        />
      </Field>

      <Field label='Filière' required>
        <Input
          placeholder='Ex: Informatique'
          variant='outline'
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
        />
      </Field>

      <Field label="Nom de l'Établissement" required>
        <Input
          placeholder='Ex: Université XYZ'
          variant='outline'
          value={nomEtablissement}
          onChange={(e) => setNomEtablissement(e.target.value)}
        />
      </Field>

      <Field label="Ville de l'Etablissement" required>
        <Input
          placeholder="Ville de l'Établissement"
          variant='outline'
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />
      </Field>

      <Field label='Pays' required>
        <Input
          placeholder="Pays de l'Établissement"
          variant='outline'
          value={pays}
          onChange={(e) => setPays(e.target.value)}
        />
      </Field>

      <Field label='Première matière principale' required>
        <Input
          placeholder='Matière 1'
          variant='outline'
          value={matiere1}
          onChange={(e) => setMatiere1(e.target.value)}
        />
      </Field>

      <Field label="Nombre d'heures de la première matière" required>
        <Input
          type='number'
          variant='outline'
          value={nbHeure1}
          onChange={(e) => setNbHeure1(Number(e.target.value))}
        />
      </Field>

      <Field label='Deuxième matière principale' required>
        <Input
          placeholder='Matière 2'
          variant='outline'
          value={matiere2}
          onChange={(e) => setMatiere2(e.target.value)}
        />
      </Field>

      <Field label="Nombre d'heures de la deuxième matière" required>
        <Input
          type='number'
          variant='outline'
          value={nbHeure2}
          onChange={(e) => setNbHeure2(Number(e.target.value))}
        />
      </Field>

      <Field label='Troisième matière principale' required>
        <Input
          placeholder='Matière 3'
          variant='outline'
          value={matiere3}
          onChange={(e) => setMatiere3(e.target.value)}
        />
      </Field>

      <Field label="Nombre d'heures de la toisième matière" required>
        <Input
          type='number'
          variant='outline'
          value={nbHeure3}
          onChange={(e) => setNbHeure3(Number(e.target.value))}
        />
      </Field>

      <Field label='Quatrième matière principale' required>
        <Input
          placeholder='Matière 4'
          variant='outline'
          value={matiere4}
          onChange={(e) => setMatiere4(e.target.value)}
        />
      </Field>

      <Field label="Nombre d'heures de la quatrième matière" required>
        <Input
          type='number'
          variant='outline'
          value={nbHeure4}
          onChange={(e) => setNbHeure4(Number(e.target.value))}
        />
      </Field>

      <ButtonGroup
        size='lg'
        width='100%'
        variant='outline'
        spacing={4}
        justifyContent='space-between'
      >
        <Button
          _hover={{ bgColor: 'green.800' }}
          bg='green.600'
          type='submit'
          disabled={isPending}
          width='48%'
          color='white'
          borderRadius='md'
          fontSize='1rem'
          padding='1.2rem'
        >
          {isPending ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
        <Button
          bgColor='green.600' // même couleur que "Suivant"
          width='48%' // pour donner un peu d'espace entre les boutons
          fontSize='1.1rem'
          href={THIRD_STEP_FORM_PAFE}
          _hover={{ bgColor: 'green.800' }}
          as={Link}
          color='white'
        >
          Etape suivante
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

const frameworks = createListCollection({
  items: [
    { label: '2019-2020', value: '2019-2020' },
    { label: '2020-2021', value: '2020-2021' },
    { label: '2021-2022', value: '2021-2022' },
    { label: '2022-2023', value: '2022-2023' },
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ],
});
