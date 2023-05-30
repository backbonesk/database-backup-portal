import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BackupForm from '../components/BackupForm';
import { URL } from '../utilities/config';
import { useGlobalLoading } from '../utilities/stores';
import { BackupFormValues } from '../utilities/types';
import { useLocalStorage } from 'react-use';

function Backups() {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(false);
  const [_loading, setLoading] = useGlobalLoading();
  const [token] = useLocalStorage('token');

  const { isLoading, data } = useQuery({
    queryKey: ['backupSchedules'],
    queryFn: () =>
      axios
        .get(`${URL}/backup_schedules`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  function onSubmit(values: BackupFormValues | undefined) {
    if (!values) {
      setVisible(false);
      return;
    }
    console.log(values);
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
          <Title order={2}>BACKUPS {data && `(${data.length})`}</Title>
          <Button size="md" onClick={() => setVisible(true)}>
            Add
          </Button>
        </Group>
      </Stack>
    </>
  );
}

export default Backups;
