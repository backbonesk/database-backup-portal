import { Button, Center, Group, Stack, Table, Text, Title, UnstyledButton } from '@mantine/core';
import { useId } from '@mantine/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import BackupForm from '../components/BackupForm';
import { URL } from '../utilities/config';
import { useGlobalLoading } from '../utilities/stores';
import { BackupFormValues } from '../utilities/types';

type BackupSchedule = {
  uuid: string;
  dbname: string;
  host: string;
  rrulestring: string;
};

function Backups() {
  const [visible, setVisible] = useState(false);
  const [_loading, setLoading] = useGlobalLoading();
  const [token] = useLocalStorage('token');
  const id = useId();

  const queryClient = useQueryClient();

  function invalidateSchedules() {
    queryClient.invalidateQueries({ queryKey: ['backupSchedules'] });
  }

  const deleteMutation = useMutation({
    mutationFn: async (uuid: string) => {
      await axios.delete(`${URL}/backup_schedule?uuid=${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => invalidateSchedules(),
  });

  const addMutation = useMutation({
    mutationFn: async (values: BackupFormValues) => {
      await axios.post(`${URL}/backup_schedule`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => invalidateSchedules(),
  });

  const { isFetching, data } = useQuery({
    queryKey: ['backupSchedules'],
    queryFn: (): Promise<BackupSchedule[]> =>
      axios
        .get(`${URL}/backup_schedules`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });

  useEffect(() => {
    if (isFetching || addMutation.isLoading || deleteMutation.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isFetching, addMutation.isLoading, deleteMutation.isLoading]);

  const rows = data?.map((element, idx) => (
    <tr key={`${id}-${idx}`}>
      <td>{element.dbname}</td>
      <td>{element.host}</td>
      <td>{element.rrulestring}</td>
      <td className="flex justify-end">
        <UnstyledButton c="red" onClick={async () => await deleteMutation.mutateAsync(element.uuid)}>
          Delete
        </UnstyledButton>
      </td>
    </tr>
  ));

  async function onSubmit(values: BackupFormValues | undefined) {
    if (!values) {
      setVisible(false);
      return;
    }

    await addMutation.mutateAsync(values);

    setVisible(false);
  }

  return (
    <>
      {visible && <BackupForm onSubmit={onSubmit} />}

      <Stack
        p="lg"
        sx={{
          width: '100%',
          rowGap: '4rem',
        }}
      >
        <Center sx={{ flexDirection: 'column' }}>
          <Title>Backups Manager</Title>
          <Text c="dimmed">List of database backup schedules</Text>
        </Center>
        <Group position="apart">
          <Title order={2}>BACKUP SCHEDULES {data && `(${data.length})`}</Title>
          <Button size="md" onClick={() => setVisible(true)}>
            Add
          </Button>
        </Group>
        {data && (
          <Table highlightOnHover={true}>
            <thead>
              <tr>
                <th>DB Name</th>
                <th>Host</th>
                <th>RRule</th>
                <th />
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </Stack>
    </>
  );
}

export default Backups;
