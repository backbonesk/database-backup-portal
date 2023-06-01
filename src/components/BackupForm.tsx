import { Button, Group, Stack, TextInput, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { RRule } from 'rrule';
import { BackupFormValues } from '../utilities/types';
import RRuleForm from './RRuleForm';

type BackupFormProps = {
  onSubmit: (values: BackupFormValues | undefined) => void;
};

function BackupForm({ onSubmit }: BackupFormProps) {
  const [formVisible, setFormVisible] = useState(false);

  const form = useForm({
    initialValues: {
      host: '',
      username: '',
      password: '',
      port: '5432',
      dbname: '',
      rrule: '',
      destination: '',
    },
  });

  function onRRuleCreate(rule: RRule) {
    form.setFieldValue('rrule', rule.toString());
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
            <PasswordInput className="w-full" label="Password" {...form.getInputProps('password')} />
            <TextInput className="w-full" label="Port" {...form.getInputProps('port')} />
            <TextInput className="w-full" label="DB Name" {...form.getInputProps('dbname')} />
            <div className="flex gap-x-1 items-end">
              <TextInput className="w-full grow" label="RRule" {...form.getInputProps('rrule')} />
              <Button onClick={() => setFormVisible(true)}>Create</Button>
            </div>
            <TextInput className="w-full" label="Backup Destination" {...form.getInputProps('destination')} />
          </Stack>
          <Group grow>
            <Button color="green" type="submit">
              Add
            </Button>
            <Button color="red" onClick={() => onSubmit(undefined)}>
              Discard
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default BackupForm;
