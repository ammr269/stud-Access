import { prisma } from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  // Récupérer la session utilisateur
  const session = await getServerSession(authOptions);

  // Vérifier si l'utilisateur est connecté
  if (!session?.user) {
    return NextResponse.json(
      {
        message: 'Vous devez vous connecter pour accéder à ces informations.',
      },
      { status: 401 },
    );
  }

  try {
    // Récupérer les données de l'utilisateur courant à partir de Prisma
    const currentUser = await prisma.user.findUnique({
      where: { id_user: session.user.id }, // Identifier l'utilisateur connecté
      select: {
        id_user: true,
        email: true,
        name: true,
        createdAt: true,
        indicator: true, // Ajoutez les champs nécessaires ici
      },
    });

    // Vérifier si les données utilisateur existent
    if (!currentUser) {
      return NextResponse.json(
        {
          message: 'Utilisateur non trouvé dans la base de données.',
        },
        { status: 404 },
      );
    }

    // Retourner les données de l'utilisateur
    return NextResponse.json({
      message: 'Données utilisateur récupérées avec succès.',
      data: currentUser,
    });
  } catch (error) {
    // Gérer les erreurs potentielles
    return NextResponse.json(
      {
        message:
          'Une erreur est survenue lors de la récupération des données utilisateur.',
        error: error.message,
      },
      { status: 500 },
    );
  }
}
