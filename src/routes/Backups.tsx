import { Button, Center, Group, Stack, Table, Text, Title, UnstyledButton } from '@mantine/core';
import { useId } from '@mantine/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import BackupForm from '../components/BackupForm';
import { URL } from '../utilities/config';
import { useGlobalLoading } from '../utilities/stores';
import { BackupFormValues, BackupScheduleRecord } from '../utilities/types';
import RecordModal from '../components/RecordModal';

type BackupSchedule = {
  uuid: string;
  dbname: string;
  host: string;
  rrule: string;
  status: string;
};

function Backups() {
  const [visible, setVisible] = useState(false);
  const [backupRecordTitle, setBackupRecordTitle] = useState('');
  const [backupRecords, setBackupRecords] = useState<BackupScheduleRecord[]>();

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

  const recordsMutation = useMutation({
    mutationFn: async (uuid: string) => {
      const { data } = await axios.get(`${URL}/backup_schedule_records?uuid=${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
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

  async function openLogs(title: string, uuid: string) {
    const data = await recordsMutation.mutateAsync(uuid);
    setBackupRecordTitle(title);
    setBackupRecords(data);
  }

  const rows = data?.map((element, idx) => (
    <tr key={`${id}-${idx}`}>
      <td>
        <Text c="gray">{idx + 1}</Text>
      </td>
      <td>{element.dbname}</td>
      <td>{element.host}</td>
      <td>{element.rrule}</td>
      <td className="flex gap-x-6 justify-end">
        <UnstyledButton c="blue" onClick={async () => await openLogs(element.dbname, element.uuid)}>
          Logs
        </UnstyledButton>
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
      {backupRecords && (
        <RecordModal title={backupRecordTitle} records={backupRecords} onExit={() => setBackupRecords(undefined)} />
      )}

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
                <th />
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
