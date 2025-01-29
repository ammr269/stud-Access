'use client';

import { PasswordInput } from '../ui/password-input';
import { Field } from '@/components/ui/field';
import { Button, Heading, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { Bounce, toast } from 'react-toastify';

export function SignupForm() {
  const [isPending, setIsPending] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
  });

  const router = useRouter();

  const validateForm = () => {
    const newErrors = {
      firstName:
        firstName.length < 2
          ? 'Le nom doit avoir au moins deux caractères'
          : '',
      lastName:
        lastName.length < 2
          ? 'Le prénom doit avoir au moins deux caractères'
          : '',
      email: !email.match(/^[^@]+@[^@]+\.[^@]+$/) ? 'Email invalide' : '',
      password:
        password.length < 6
          ? 'Le mot de passe doit avoir au moins 6 caractères'
          : '',
      confirmPassword:
        password !== confirmPassword
          ? 'Les mots de passe ne correspondent pas'
          : '',
      telephone:
        telephone && !/^\d{1,15}$/.test(telephone)
          ? 'Le numéro de téléphone doit être une suite de chiffres (max 15)'
          : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsPending(true);

    // Créer l'utilisateur
    const user = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      phone: telephone,
      action: 'signup',
    };

    // Appeler la fonction signIn pour l'inscription
    const response = await signIn('credentials', {
      ...user,
      redirect: false,
    });

    if (response?.error) {
      toast.error("Erreur d'inscription", {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } else {
      toast.success('Inscription réussie, Vous êtes connecté(e)', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      router.push('/'); // Rediriger après l'inscription
    }

    setIsPending(false);
  };

  return (
    <Stack>
      <Stack
        as='form'
        gap='4'
        maxW='md' // Largeur maximale pour la stack (taille "sm" est assez petite)
        w='100%'
        mx='auto'
        onSubmit={handleSubmit}
        bg='light.800'
        p='1rem'
        borderTopRadius='md'
        border='1px'
        borderColor='gray.300'
        boxShadow='lg'
      >
        <Heading
          fontWeight={700}
          fontSize='1.3rem'
          textAlign='center'
          bg='green.600'
          p='0.5rem'
          color='white'
        >
          Formulaire d&apos;inscription
        </Heading>
        <Field label='Nom' required>
          <Input
            placeholder='Par Ex- Siham'
            variant='outline'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </Field>
        <Field label='Prénom' required>
          <Input
            placeholder='Par ex- Mohamed'
            variant='outline'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </Field>
        <Field label='Email' required helperText='Votre adresse email'>
          <Input
            placeholder='Par ex- @example@gmail.com'
            variant='outline'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </Field>
        <Field label='Mot de passe' required>
          {/* <Input
            type="password"
            placeholder="Votre mot de passe"
            variant="outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </Field>
        <Field label='Confirmer le mot de passe' required>
          {/* <Input
            type="password"
            placeholder="Confirmer votre mot de passe"
            variant="outline"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> */}
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </Field>
        <Field label='Numéro de téléphone' required>
          <Input
            type='tel'
            placeholder='(000) 000-0000'
            variant='outline'
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          {errors.telephone && <p>{errors.telephone}</p>}
        </Field>
        <Button
          _hover={{ bgColor: 'green.800' }}
          bg='green.600'
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Enregistrement...' : "S'inscrire"}
        </Button>
      </Stack>
    </Stack>
  );
}
