import { prisma } from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function PUT(req) {
  const body = await req.json();
  const {
    serie,
    annee,
    nomEtablissementBac,
    moyenne,
    mention,
    domaine1,
    domaine2,
    domaine3,
    villeFrance1,
    villeFrance2,
    villeFrance3,
  } = body;

  console.log('notre body', body);

  const session = await getServerSession(authOptions);

  if (
    !serie ||
    !annee ||
    !nomEtablissementBac ||
    !moyenne ||
    !mention ||
    !domaine1 ||
    !domaine2 ||
    !domaine3 ||
    !villeFrance1 ||
    !villeFrance2 ||
    !villeFrance3
  ) {
    return NextResponse.json(
      {
        message:
          'Tous les champs doivent être remplis correctement. Aucun champ ne peut être vide.',
      },
      { status: 400 },
    );
  }

  try {
    const studentInfo = await prisma.studentsInformations.update({
      where: { userId: session.user.id },
      data: {
        serie,
        annee: new Date(annee),
        nomEtablissementBac,
        moyenne: parseFloat(moyenne),
        mention,
        domaine1,
        domaine2,
        domaine3,
        villeFrance1,
        villeFrance2,
        villeFrance3,
        step: 'step3', // Passer à l'étape suivante
      },
    });

    return NextResponse.json({ studentInfo }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations:', error);
    return NextResponse.json(
      {
        message:
          'Erreur lors de la mise à jour des informations. Veuillez réessayer.',
      },
      { status: 500 },
    );
  }
}
