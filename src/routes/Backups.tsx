import { Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import BackupForm from '../components/BackupForm';
import { BackupFormValues } from '../utilities/types';

function Backups() {
  const [visible, setVisible] = useState(false);
  const [schedulesCount, setSchedulesCount] = useState(0);

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
          <Title order={2}>BACKUPS ({schedulesCount})</Title>
          <Button size="md" onClick={() => setVisible(true)}>
            Add
          </Button>
        </Group>
      </Stack>
    </>
  );
}

export default Backups;
