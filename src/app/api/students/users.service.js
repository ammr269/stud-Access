import { prisma } from '@/lib/prisma';

export async function getAllStudents() {
  try {
    return prisma.user.findMany({
      where: { role: 'etudiant' },
      omit: { hashPassword: true, emailVerified: true },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants:', error);
    return [];
  }
}
