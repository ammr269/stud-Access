import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req) {
  const session = await getServerSession(authOptions);

  // Vérifier la session
  if (!session?.user) {
    return NextResponse.json(
      { message: 'Vous devez vous connecter' },
      { status: 401 },
    );
  }

  const body = await req.json();
  const {
    civilite,
    dateNaissance,
    niveauEtud,
    paysNaissance,
    communeNaissance,
    paysResidence,
    villeAdresseResidence,
    communeResidence,
    numeroTelephone,
    email,
  } = body;

  const parsedDate = new Date(dateNaissance);

  // Vérification des champs
  if (
    !civilite ||
    !dateNaissance ||
    !niveauEtud ||
    !paysNaissance ||
    !communeNaissance ||
    !paysResidence ||
    !villeAdresseResidence ||
    !communeResidence ||
    !numeroTelephone ||
    !email
  ) {
    return NextResponse.json(
      { message: 'Veuillez inclure tous les champs nécessaires' },
      { status: 400 },
    );
  }

  // Define scolarites as an empty array if it's not provided
  try {
    const data = {
      civilite,
      dateNaissance: parsedDate,
      niveauEtude: niveauEtud,
      paysNaissance,
      communeNaissance,
      paysResidence,
      adresseVille: villeAdresseResidence,
      commune: communeResidence,
      numeroTelephone,
      emilPwd: email,
      userId: session.user.id,
      step: 'step1',
    };

    const info = await prisma.studentsInformations.create({
      data,
    });

    return NextResponse.json({ data: info }, { status: 201 });
  } catch (error) {
    // Log the full error to help debug
    console.error('Erreur lors de la création :', error, error.stack);
    return NextResponse.json(
      {
        message: "Erreur lors de l'ajout des informations. Veuillez réessayer.",
      },
      { status: 500 },
    );
  }
}

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

  const session = await getServerSession(authOptions);

  if (
    serie ||
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
        step: 'step2', // Passer à l'étape suivante
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
