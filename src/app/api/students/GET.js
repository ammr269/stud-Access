import { authOptions } from '../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    // Vérification de la session utilisateur
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Vous n'êtes pas connecté." },
        { status: 401 },
      );
    }

    // Vérification du rôle utilisateur
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { message: "Vous n'êtes pas autorisé à effectuer cette action." },
        { status: 403 },
      );
    }

    // Récupération des étudiants
    const students = await prisma.user.findMany({
      omit: { hashPassword: true, emailVerified: true },
    });

    // Vérification si aucun étudiant trouvé
    if (!students || students.length === 0) {
      return NextResponse.json(
        { message: 'Aucun étudiant trouvé.' },
        { status: 404 },
      );
    }

    // Retourner les données des étudiants
    return NextResponse.json(
      { students, size: students.length },
      { status: 200 },
    );
  } catch (error) {
    // Gestion des erreurs inattendues
    console.error('Erreur lors de la récupération des étudiants:', error);
    return NextResponse.json(
      { message: 'Une erreur interne est survenue.' },
      { status: 500 },
    );
  }
}
