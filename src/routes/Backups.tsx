import { Button, Center, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import RRuleForm from '../components/RRuleForm';

function Backups() {
  const [visible, setVisible] = useState(false);
  const [schedulesCount, setSchedulesCount] = useState(0);

  return (
    <>
      {visible && <RRuleForm onSubmit={() => setVisible(false)} />}
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
          <div className="fixed z-10 bottom-5 flex justify-center">
            <Button size="md">Add Schedule</Button>
          </div>
        </Center>
        <Title order={2}>BACKUPS ({schedulesCount})</Title>
      </Stack>
    </>
  );
}

export default Backups;
