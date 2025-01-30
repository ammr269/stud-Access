import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { AuthForm } from '@/components/packages/AuthForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log('User is already logged in, redirecting to home page');
    redirect('/');
  }
  return <AuthForm />;
}
