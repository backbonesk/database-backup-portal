import { Button, Group, Stack, Title } from '@mantine/core';
import RRuleForm from '../components/RRuleForm';
import { useState } from 'react';

function Schedules() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && <RRuleForm onSubmit={() => {}} />}
      <Stack
        p="lg"
        sx={{
          width: '100vw',
          rowGap: '4rem',
        }}
        className="max-w-xl"
      >
        <Title>Schedules Manager</Title>
        <Group grow>
          <Button onClick={() => setVisible(true)}>Create</Button>
        </Group>
      </Stack>
    </>
  );
}

export default Schedules;
