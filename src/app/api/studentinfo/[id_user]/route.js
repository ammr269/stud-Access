import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id_user } = await params; // id_user est une chaîne

  try {
    // Recherche d'utilisateur avec Prisma
    const etudiants = await prisma.user.findUnique({
      where: { id_user }, // Pas besoin de conversion, c'est une chaîne
      select: {
        id_user: true,
        name: true,
        createdAt: true,
        image: true,
        informationsPersonnelles: { include: { scolarites: true } },
      },
    });

    // Si l'utilisateur n'est pas trouvé
    if (!etudiants) {
      return NextResponse.json(
        { message: 'Utilisateur introuvable' },
        { status: 404 },
      );
    }

    // Retourne les données utilisateur
    return NextResponse.json(etudiants);
  } catch (error) {
    // Gestion des erreurs du serveur
    return NextResponse.json(
      { error: 'Erreur du serveur', details: error.message },
      { status: 500 },
    );
  }
}
