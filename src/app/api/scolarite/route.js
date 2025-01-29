import { prisma } from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]/authOptions';
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
    sessionE,
    niveau,
    filiere,
    nomEtablissement,
    ville,
    pays,
    matiere1,
    nbHeure1,
    matiere2,
    nbHeure2,
    matiere3,
    nbHeure3,
    matiere4,
    nbHeure4,
  } = body;

  // Validation des champs nécessaires
  if (
    !sessionE ||
    !niveau ||
    !filiere ||
    !nomEtablissement ||
    !ville ||
    !pays ||
    !matiere1 ||
    !nbHeure1 ||
    !matiere2 ||
    !nbHeure2 ||
    !matiere3 ||
    !nbHeure3 ||
    !matiere4 ||
    !nbHeure4
  ) {
    return NextResponse.json(
      { message: 'Veuillez inclure tous les champs nécessaires' },
      { status: 400 },
    );
  }

  try {
    // Trouver les informations personnelles de l'utilisateur courant
    const studentInfo = await prisma.studentsInformations.findUnique({
      where: {
        userId: session.user.id, // Assure que l'ID de l'utilisateur correspond à celui dans la session
      },
      include: {
        scolarites: true, // Inclut les scolarités pour cet étudiant
      },
    });

    // Vérifier si les informations personnelles existent
    if (!studentInfo) {
      return NextResponse.json(
        {
          message:
            'Aucune information personnelle trouvée pour cet utilisateur',
        },
        { status: 404 },
      );
    }

    // Vérifier si la session choisie existe déjà pour cet utilisateur
    const existingScolarite = await prisma.scolarite.findFirst({
      where: {
        session: sessionE.toString(), // Vérifie si une scolarité avec cette session existe déjà
        studentsInformationsId: studentInfo.id, // Relier à l'étudiant courant
      },
    });

    if (existingScolarite) {
      return NextResponse.json(
        {
          message:
            'Cette session existe déjà. Veuillez choisir une autre session.',
        },
        { status: 400 },
      );
    }

    // Vérifier si le nombre de scolarités est inférieur ou égal à 6
    if (studentInfo.scolarites.length >= 6) {
      return NextResponse.json(
        {
          message:
            "Vous ne pouvez pas avoir plus de 6 saisies. Passez à l'étape suivante ",
        },
        { status: 400 },
      );
    }

    // Créer une nouvelle scolarité
    const scolarite = await prisma.scolarite.create({
      data: {
        session: sessionE.toString(), // Session de l'étudiant
        niveau,
        filiere,
        nomEtablissement,
        ville,
        pays,
        matiere1,
        nbHeure1,
        matiere2,
        nbHeure2,
        matiere3,
        nbHeure3,
        matiere4,
        nbHeure4,
        studentsInformationsId: studentInfo.id, // ID de l'information de l'étudiant
      },
    });

    // Vérifier si c'est la 6e scolarité et mettre à jour l'étape à step2
    if (studentInfo.scolarites.length + 1 === 6) {
      await prisma.studentsInformations.update({
        where: {
          id: studentInfo.id,
        },
        data: {
          step: 'step2', // Met à jour l'étape à `step2`
        },
      });
    }

    return NextResponse.json(scolarite, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Une erreur est survenue lors de la création de la scolarité',
      },
      { status: 500 },
    );
  }
}
