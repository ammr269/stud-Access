'use client';

import { PasswordInput } from '../ui/password-input';
import { Field } from '@/components/ui/field';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { SECOND_STEP_FORM_PAGE } from '@/lib/routes/route.client';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const StepForm = () => {
  const [step, setStep] = useState(1);
  const [civilite, setCivilite] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [niveauEtud, setNiveautud] = useState('');
  const [paysNaissance, setPaysNaissance] = useState('');
  const [communeNaissance, setCommuneNaissance] = useState('');
  const [paysresidence, setPaysResidence] = useState('');
  const [villeAdresseResidence, setVilleAdresseResidence] = useState('');
  const [communeResidence, setCommuneResidence] = useState('');
  const [numeroTelephone, setNumerTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  // Validation du formulaire
  const validateForm = () => {
    if (step === 1) {
      if (
        !civilite ||
        !dateNaissance ||
        !niveauEtud ||
        !paysNaissance ||
        !communeNaissance ||
        !email
      ) {
        toast.error("Veuillez remplir tous les champs de l'étape 1.");
        return false;
      }
    } else if (step === 2) {
      if (!paysresidence || !villeAdresseResidence || !communeResidence) {
        toast.error("Veuillez remplir tous les champs de l'étape 2.");
        return false;
      }
    } else if (step === 3) {
      if (!numeroTelephone) {
        toast.error('Veuillez remplir le numéro de téléphone.');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (!validateForm()) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let body = {
      civilite,
      dateNaissance: new Date(dateNaissance),
      niveauEtud,
      paysNaissance,
      communeNaissance,
      paysResidence: paysresidence,
      villeAdresseResidence: villeAdresseResidence,
      communeResidence: communeResidence,
      numeroTelephone,
      email,
    };

    setIsPending(true);

    try {
      const response = await fetch('api/informations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        toast.success('Informations ajoutées avec succès');
        router.push(SECOND_STEP_FORM_PAGE);
      } else {
        toast.error("Erreur lors de l'envoi");
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
      maxW={{ base: '85%', lg: '45%' }}
      w={{ base: '85%', lg: '95%' }} // Modifié pour avoir 85% sur petits écrans et 45% sur grands écrans
      mx='auto'
      onSubmit={handleCreate}
      bg='white'
      p='4'
      borderTopRadius='md'
      border='1px'
      borderColor='gray.300'
      boxShadow='md'
    >
      <Heading
        fontWeight={700}
        fontSize='1.5rem'
        textAlign='center'
        bg='green.700'
        p='0.75rem'
        color='white'
        borderRadius='md'
      >
        Informations personnelles
      </Heading>

      {/* Étape 1 : Informations personnelles */}
      {step === 1 && (
        <>
          <Field label='Civilité' required>
            <RadioGroup
              value={civilite}
              onValueChange={(e) => setCivilite(e.value)}
            >
              <HStack gap='6' justify='center'>
                <Radio value='homme'>Homme</Radio>
                <Radio value='femme'>Femme</Radio>
              </HStack>
            </RadioGroup>
          </Field>

          <Field label='Date de naissance' required>
            <Input
              type='date'
              variant='outline'
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              borderColor='gray.300'
              _hover={{ borderColor: 'green.500' }}
            />
          </Field>

          <Field label="Niveau d'étude" required>
            <RadioGroup
              value={niveauEtud}
              onValueChange={(e) => setNiveautud(e.value)}
            >
              <Flex direction='column' gap='3' align='flex-start'>
                <Radio value='Terminale' size='lg' colorScheme='teal'>
                  Terminale
                </Radio>
                <Radio value='Etudiant' size='lg' colorScheme='teal'>
                  Etudiant
                </Radio>
              </Flex>
            </RadioGroup>
          </Field>

          <Field label='Pays de Naissance' required>
            <Input
              placeholder='Par Ex- Comores'
              variant='outline'
              value={paysNaissance}
              onChange={(e) => setPaysNaissance(e.target.value)}
              borderColor='gray.300'
              _hover={{ borderColor: 'green.500' }}
            />
          </Field>

          <Field label='Commune et ville de Naissance (Région)' required>
            <Input
              placeholder='Par Ex- Bambao-Mvouni'
              variant='outline'
              value={communeNaissance}
              onChange={(e) => setCommuneNaissance(e.target.value)}
              borderColor='gray.300'
              _hover={{ borderColor: 'green.500' }}
            />
          </Field>
          <Field label='Mot de passe de votre adresse email' required>
            <PasswordInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </>
      )}

      {/* Étape 2 : Informations sur l'adresse */}
      {step === 2 && (
        <>
          <Field label='Pays de résidence' required>
            <Input
              placeholder='Par Ex- Maroc'
              variant='outline'
              value={paysresidence}
              onChange={(e) => setPaysResidence(e.target.value)}
              borderColor='gray.300'
              _hover={{ borderColor: 'green.500' }}
            />
          </Field>

          <Field label='Ville et adresse résidence' required>
            <Input
              placeholder='Par Ex- Moroni-Coulee-2-Rue-3'
              variant='outline'
              value={villeAdresseResidence}
              onChange={(e) => setVilleAdresseResidence(e.target.value)}
              borderColor='gray.300'
              _hover={{ borderColor: 'green.500' }}
            />
          </Field>

          <Field label='Commune de résidence (Région)' required>
            <Input
              placeholder='Par Ex- Hambou'
              variant='outline'
              value={communeResidence}
              onChange={(e) => setCommuneResidence(e.target.value)}
              borderColor='gray.300'
              _hover={{ borderColor: 'green.500' }}
            />
          </Field>
        </>
      )}

      {/* Étape 3 : Numéro de téléphone et bouton de soumission */}
      {step === 3 && (
        <>
          <Field label='Numéro de téléphone' required>
            <Input
              placeholder='Par Ex- +269 3687835'
              variant='outline'
              value={numeroTelephone}
              onChange={(e) => setNumerTelephone(e.target.value)}
              borderColor='gray.300'
              _hover={{ borderColor: 'green.500' }}
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
              onClick={handlePrevStep}
              colorScheme='teal' // même couleur que "Suivant"
              width='48%' // pour donner un peu d'espace entre les boutons
              fontSize='1.1rem'
              bg='green.700'
            >
              Retour
            </Button>
            <Button
              _hover={{ bgColor: 'green.800' }}
              bg='green.700'
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
          </ButtonGroup>
        </>
      )}

      {/* Boutons de navigation */}
      {step < 3 && (
        <ButtonGroup
          size='lg'
          width='100%'
          variant='outline'
          spacing={4}
          justifyContent='space-between'
        >
          {step > 1 && (
            <Button
              onClick={handlePrevStep}
              colorScheme='white' // même couleur que "Suivant"
              width='48%' // pour donner un peu d'espace entre les boutons
              fontSize='1.1rem'
              bg='green.700'
              color='white'
            >
              Retour
            </Button>
          )}

          {step < 3 && (
            <Button
              onClick={handleNextStep}
              colorScheme='white' // même couleur que "Retour"
              width='48%' // pour donner un peu d'espace entre les boutons
              fontSize='1.1rem'
              bg='green.700'
              color='white'
            >
              Suivant
            </Button>
          )}
        </ButtonGroup>
      )}
    </Stack>
  );
};

export default StepForm;
