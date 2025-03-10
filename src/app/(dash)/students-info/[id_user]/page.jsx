import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { StudentInfos } from '@/components/packages/StudentInfos';
import environement from '@/config/environement.config';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { id_user } = await params; // Récupération de l'ID depuis les paramètres d'URL
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/authentification');
  }
  try {
    // Appel à l'API
    const response = await fetch(
      `${environement.siteUrl}/api/studentinfo/${id_user}`,
      // `http://localhost:3000/api/studentinfo/${id_user}`,
      { cache: 'no-store' }, // Évite de mettre en cache les réponses
    );

    // Vérifie si l'utilisateur est introuvable
    if (response.status !== 200) {
      return <h3>Page non trouvée</h3>;
    }

    // Extraction des données utilisateur
    const student = await response.json();
    return <StudentInfos student={student} />;
  } catch (error) {
    return <h3>Erreur lors de la récupération des données</h3>;
  }
}
