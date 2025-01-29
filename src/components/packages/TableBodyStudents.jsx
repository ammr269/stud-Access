'use client';
import { UserActions } from '@/app/(dash)/allusers/UserActions';
import { getStudentInfo } from '@/lib/routes/route.client';
import { Table } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

export default function StudentsBody({ students: s = [] }) {
  const [students, setStudents] = useState(s);
  const onUserUpdate = (student) => {
    // const std = students.find((s) => s.id_user === student.id_user)
    // if (!std) {
    //   console.log('student non trouvé')
    //   return
    // }
    const stds = students.map((s) => {
      if (s.id_user !== student.id_user) {
        return s;
      }
      return student;
    });
    setStudents([...stds]);
  };
  return (
    <Table.Body>
      {students.map((student) => (
        <Table.Row key={student.id_user || student.email}>
          <Table.Cell>
            {/* <Link href={`/students-info/${student.id_user}`}> */}
            <Link href={getStudentInfo(student.id_user)}>{student.name}</Link>
          </Table.Cell>
          <Table.Cell>{student.email}</Table.Cell>
          <Table.Cell>{student.indicator}</Table.Cell>
          <UserActions onUserUpdate={onUserUpdate} student={student} />
        </Table.Row>
      ))}
    </Table.Body>
  );
}
