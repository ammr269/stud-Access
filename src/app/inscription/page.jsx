import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { SignupForm } from '@/components/packages/SignupForm';
import { Stack } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log('User is already logged in, redirecting to home page');
    redirect('/');
  }
  return (
    <Stack>
      <SignupForm />
    </Stack>
  );
}
