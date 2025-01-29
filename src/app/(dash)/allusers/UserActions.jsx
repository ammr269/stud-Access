'use client';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  createListCollection,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';

export function UserActions({ onUserUpdate, student }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChangeStatus = async () => {
    try {
      setLoading(true);
      if (value.length === 0) {
        return;
      }
      const indicator = value[0];
      const response = await fetch(`/api/students/${student.id_user}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ indicator: indicator }),
      });
      setLoading(false);
      if (!response.ok) {
        throw new Error('Erreur lors de la modification du statut.');
      }
      const updatedUser = await response.json();
      onUserUpdate(updatedUser);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Table.Cell>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Button variant='outline'>Modifier</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle bg='green.700' color='white' p='1rem' rounded='sm'>
              Changer l&apos;indicateur du dossier
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <SelectRoot
              collection={frameworks}
              width='320px'
              value={value}
              onValueChange={(e) => setValue(e.value)}
            >
              <SelectLabel>Selectionner le statut</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder='Selectionner le statut' />
              </SelectTrigger>
              <SelectContent>
                {frameworks.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant='outline' disabled={loading}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              loading={loading}
              loadingText='Enregistrement'
              onClick={handleChangeStatus}
              bg='green.700'
            >
              Enregister
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      {/* <Button>Modifier</Button> */}
    </Table.Cell>
  );
}

const frameworks = createListCollection({
  items: [
    { label: 'Pending', value: 'Pending' },
    { label: 'Initializing', value: 'Initializing' },
    { label: 'Progress', value: 'Progress' },
    { label: 'Validating', value: 'Validating' },
    { label: 'Testing', value: 'Testing' },
    { label: 'Finalizing', value: 'Finalizing' },
    { label: 'Ready', value: 'Ready' },
    { label: 'Completed', value: 'Completed' },
  ],
});
