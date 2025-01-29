import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 *
 * @param {NextRequest} req
 */

const indicators = [
  'Pending',
  'Initializing',
  'Progress',
  'Validating',
  'Testing',
  'Finalizing',
  'Ready',
  'Completed',
]; // Liste des indicators

/**
 * Met à jour le rôle d'un utilisateur
 *
 * @param {NextRequest} req
 * @param {Object} params - Paramètres de l'URL
 */
export async function PUT(req, { params }) {
  const userId = (await params).id_user;
  const body = await req.json();

  if (!body || !body.indicator) {
    return NextResponse.json(
      { message: 'Veuillez inclure un indicateur' },
      { status: 400 },
    );
  }
  if (!indicators.includes(body.indicator)) {
    return NextResponse.json(
      {
        message:
          'Indicateur invalide. Les indicateurs valides sont: ' +
          indicators.join(', '),
      },
      { status: 400 },
    );
  }
  try {
    // Mettre à jour le rôle de l'utilisateur dans la base de données
    const updatedUser = await prisma.user.update({
      where: { id_user: userId },
      data: { indicator: body.indicator },
    });

    // Si l'utilisateur n'existe pas, renvoyer une erreur 404
    if (!updatedUser) {
      return NextResponse.json(
        { message: 'Utilisateur non trouvé' },
        { status: 404 },
      );
    }

    // Retourner l'utilisateur mis à jour
    return NextResponse.json(updatedUser);
  } catch (e) {
    console.error('Erreur dans PUT /api/users/[id]:', e);

    // Gérer les erreurs Prisma spécifiques, comme l'utilisateur introuvable
    if (e.code === 'P2025') {
      return NextResponse.json(
        { message: 'Utilisateur non trouvé' },
        { status: 404 },
      );
    }

    // Gestion des autres erreurs
    return NextResponse.json(
      { message: 'Erreur interne du serveur', error: e.message },
      { status: 500 },
    );
  }
}
