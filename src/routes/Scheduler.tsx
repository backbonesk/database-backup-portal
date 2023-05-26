import { Button, Code, Stack, TextInput, Title, Radio, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

function Scheduler() {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    initialValues: {
      freq: 'WEEKLY',
      count: '1',
      interval: '1',
      byWeekDay: '',
      byMonth: '',
      byMonthDay: '',
      byYearDay: '',
      byWeekNo: '',
      byHour: '',
      byMinute: '',
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}>
        <Stack
          px="lg"
          py="md"
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
            borderRadius: theme.radius.md,
            border: `1px solid ${theme.colors.gray[3]}`,
            width: '100vw',
            rowGap: '4rem',
          })}
          className="max-w-xl"
        >
          <Title>Schedule Creator</Title>
          <Stack spacing="sm">
            <Radio.Group name="freq" label="Frequency" {...form.getInputProps('freq')}>
              <Group>
                <Radio value="YEARLY" label="YEARLY" />
                <Radio value="MONTHLY" label="MONTHLY" />
                <Radio value="WEEKLY" label="WEEKLY" />
                <Radio value="DAILY" label="DAILY" />
                <Radio value="HOURLY" label="HOURLY" />
                <Radio value="MINUTELY" label="MINUTELY" />
              </Group>
            </Radio.Group>
            <TextInput className="w-full" label="By Week Day" {...form.getInputProps('byWeekDay')} />
            <TextInput className="w-full" type="number" label="Interval" {...form.getInputProps('interval')} />
            <TextInput className="w-full" label="By Month" {...form.getInputProps('byMonth')} />
            <TextInput className="w-full" label="By Month Day" {...form.getInputProps('byMonthDay')} />
            <TextInput className="w-full" label="By Year Day" {...form.getInputProps('byYearDay')} />
            <TextInput className="w-full" label="By Week Number" {...form.getInputProps('byWeekNumber')} />
            <TextInput className="w-full" label="By Hour" {...form.getInputProps('byHour')} />
            <TextInput className="w-full" label="By Minute" {...form.getInputProps('byMinute')} />
          </Stack>
          <Button type="submit">Submit</Button>
          {submittedValues && <Code block>{submittedValues}</Code>}
        </Stack>
      </form>
    </>
  );
}

export default Scheduler;
