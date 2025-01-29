'use client';
import { PasswordInput } from '../ui/password-input';
import { Button, Flex, Heading, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isClient, setIsClient] = useState(false); // Ajout d'un état pour savoir si le composant est monté
  const router = useRouter();
  // S'assurer que le router est monté côté client
  useEffect(() => {
    setIsClient(true); // Le composant est maintenant côté client
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Veuillez entrer un email valide.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Le mot de passe doit comporter au moins 6 caractères.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    setIsPending(true);

    const user = { email: email, password: password, action: 'signin' };

    const res = await signIn('credentials', {
      ...user,
      redirect: false,
    });

    setIsPending(false);

    if (res.status === 200 && router) {
      router.push('/'); // Rediriger après la connexion
      toast.success('Vous êtes connecté(e)', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } else {
      toast.error('Connexion échouée, mot de passe ou email incorrecte', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  if (!isClient) {
    return null; // Retourne rien tant que le composant n'est pas monté côté client
  }

  return (
    <Flex justify='center' align='center' minHeight='50vh'>
      <Stack
        as='form'
        maxW='md'
        gap='4'
        w='100%'
        mx='auto'
        onSubmit={handleLogin}
        bg='light.800'
        p='1.5rem'
        borderTopRadius='md'
        borderColor='gray.3'
        border='5px'
        shadow='sm'
        my='1rem'
      >
        <Heading
          fontWeight={700}
          fontSize='1.3rem'
          textAlign='center'
          bg='green.700'
          p='0.5rem'
          color='white'
        >
          Connexion
        </Heading>
        <div>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            placeholder='Votre adresse email'
            variant='outline'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Mot de passe</label>
          {/* <Input
            id="password"
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
        </div>
        <Button
          _hover={{ bgColor: 'green.800' }}
          bg='green.700'
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Enregistrement...' : 'Se connecter'}
        </Button>
      </Stack>
    </Flex>
  );
};
