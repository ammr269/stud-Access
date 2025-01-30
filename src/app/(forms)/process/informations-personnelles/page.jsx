import Step1Form from '@/components/packages/Step1Form';
import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect('/authentification');
  }
  return <Step1Form />;
}
