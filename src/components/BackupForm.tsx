import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

function BackupForm() {
  const form = useForm({
    initialValues: {
      host: '',
      username: '',
      password: '',
      port: '',
      dbName: '',
      schedule: '',
    },
  });

  return (
    <>
      <form className="fixed z-30 inset-0 flex items-center justify-center" onSubmit={form.onSubmit((values) => {})}>
        <Stack
          p="lg"
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            backgroundColor: theme.white,
            border: `1px solid ${theme.colors.gray[3]}`,
            width: '100vw',
            rowGap: '4rem',
          })}
          className="max-w-xl"
        >
          <Title>Backup Schedule Creator</Title>
          <Stack>
            <TextInput className="w-full" label="Host" {...form.getInputProps('host')} />
            <TextInput className="w-full" label="Username" {...form.getInputProps('password')} />
            <TextInput className="w-full" label="Port" {...form.getInputProps('port')} />
            <TextInput className="w-full" label="DB Name" {...form.getInputProps('dbName')} />
            <TextInput className="w-full" label="Schedule" {...form.getInputProps('schedule')} />
          </Stack>
          <Group grow>
            <Button type="submit">Add</Button>
            <Button onClick={() => form.reset()}>Reset</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default BackupForm;
