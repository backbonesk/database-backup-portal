import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import RRuleForm from './RRuleForm';
import { BackupFormValues } from '../utilities/types';
import { RRule } from 'rrule';

type BackupFormProps = {
  onSubmit: (values: BackupFormValues) => void;
};

function BackupForm({ onSubmit }: BackupFormProps) {
  const [formVisible, setFormVisible] = useState(false);

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

  function onRRuleCreate(rule: RRule) {
    form.setFieldValue('schedule', rule.toString());
    setFormVisible(false);
  }

  return (
    <>
      {formVisible && <RRuleForm onSubmit={onRRuleCreate} />}

      <div className="overlay" />
      <form
        className="fixed inset-0 z-20 flex items-center justify-center"
        onSubmit={form.onSubmit((values) => onSubmit(values))}
      >
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
            <TextInput className="w-full" label="Username" {...form.getInputProps('username')} />
            <TextInput className="w-full" label="Password" {...form.getInputProps('password')} />
            <TextInput className="w-full" label="Port" {...form.getInputProps('port')} />
            <TextInput className="w-full" label="DB Name" {...form.getInputProps('dbName')} />
            <div className="flex gap-x-1 items-end">
              <TextInput className="w-full grow" label="RRule Schedule" {...form.getInputProps('schedule')} />
              <Button onClick={() => setFormVisible(true)}>Create</Button>
            </div>
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
