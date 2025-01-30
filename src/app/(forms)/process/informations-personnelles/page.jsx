import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Step1Form from '@/components/packages/Step1Form';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  if (!session) {
    redirect('/authentification');
  }
  return <Step1Form />;
}
