import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getAllStudents } from '@/app/api/students/users.service';
import StudentsBody from '@/components/packages/TableBodyStudents';
import { Box, Table, Text } from '@chakra-ui/react'; // Ajoutez Text ici
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // const [students, setStudents] = useState([])

  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return <Text>Vous n&apos;êtes pas connecté</Text>; // Texte Chakra UI
  }
  if (user?.role !== 'admin') {
    return <Text>Vous n&apos;avez pas accès à cette page</Text>; // Texte Chakra UI
  }
  const students = await getAllStudents();

  return (
    <Box p={4}>
      <Table.Root size='sm' variant='outline'>
        <Table.ColumnGroup>
          <Table.Column htmlWidth='25%' />
          <Table.Column htmlWidth='25%' />
          <Table.Column htmlWidth='30%' />
          <Table.Column />
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nom</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Statut</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <StudentsBody students={students} />
      </Table.Root>
    </Box>
  );
}
