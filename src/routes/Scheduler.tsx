import { Button, Code, Stack, TextInput, Title, Radio, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useId } from '@mantine/hooks';
import { useState } from 'react';

function Scheduler() {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    initialValues: {
      freq: 'WEEKLY',
      count: '1',
      interval: '1',
      byWeekDay: '',
      byMonthDay: '',
      byHour: '',
      byMinute: '',
    },
  });

  const FREQUENCIES = ['YEARLY', 'MONTHLY', 'WEEKLY', 'DAILY', 'HOURLY', 'MINUTELY'];
  const MONTHS = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const WEEK_DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  return (
    <>
      <form onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}>
        <Stack
          p="lg"
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
          <Stack>
            <Radio.Group name="freq" label="Frequency" {...form.getInputProps('freq')}>
              <Group>
                {FREQUENCIES.map((freq) => (
                  <Radio value={freq} label={freq} key={useId()} />
                ))}
              </Group>
            </Radio.Group>
            <Radio.Group name="byWeekDay" label="By Week Day" {...form.getInputProps('byWeekDay')}>
              <Group>
                {WEEK_DAYS.map((day) => (
                  <Radio value={day} label={day} key={useId()} />
                ))}
              </Group>
            </Radio.Group>
            <Radio.Group name="interval" label="Interval" {...form.getInputProps('interval')}>
              <Group>
                {MONTHS.map((month) => (
                  <Radio value={month} label={month} key={useId()} />
                ))}
              </Group>
            </Radio.Group>
            <TextInput className="w-full" label="By Month Day" {...form.getInputProps('byMonthDay')} />
            <TextInput className="w-full" label="By Hour" {...form.getInputProps('byHour')} />
            <TextInput className="w-full" label="By Minute" {...form.getInputProps('byMinute')} />
          </Stack>
          {submittedValues && <Code block>{submittedValues}</Code>}
          <Group grow>
            <Button type="submit">Submit</Button>
            <Button onClick={() => form.reset()}>Reset</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default Scheduler;
