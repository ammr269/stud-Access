// /pages/api/user-info/[id_user].ts

import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const user = await prisma.user.findMany({});

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
