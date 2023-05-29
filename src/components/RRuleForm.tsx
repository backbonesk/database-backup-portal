import { Button, Center, Code, Group, NumberInput, Radio, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useId } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Frequency, Options, RRule } from 'rrule';

type FormValuesType = {
  freq: string;
  byWeekDay: string;
  byMonthDay: string;
  byHour: string;
  byMinute: string;
};

type SchedulerProps = {
  onSubmit: (rrule: RRule) => void;
};

function RRuleForm({ onSubmit }: SchedulerProps) {
  const [rruleString, setRruleString] = useState('');
  const [rruleText, setRruleText] = useState('');

  const form = useForm({
    initialValues: {
      freq: 'WEEKLY',
      byWeekDay: '',
      byMonthDay: '',
      byHour: '',
      byMinute: '',
    },
  });

  const FREQUENCIES = ['MONTHLY', 'WEEKLY', 'DAILY', 'HOURLY', 'MINUTELY'];
  const WEEK_DAYS = ['MU', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  function getRRuleOptions(values: FormValuesType): Partial<Options> {
    let freq: Frequency | undefined;
    switch (values.freq) {
      case 'MONTHLY':
        freq = RRule.MONTHLY;
        break;
      case 'WEEKLY':
        freq = RRule.WEEKLY;
        break;
      case 'DAILY':
        freq = RRule.DAILY;
        break;
      case 'HOURLY':
        freq = RRule.HOURLY;
        break;
      case 'MINUTELY':
        freq = RRule.MINUTELY;
        break;

      default:
        break;
    }
    const byMonthDay = values.byMonthDay.length == 0 ? undefined : parseInt(values.byMonthDay);
    const byWeekDay = values.byWeekDay.length == 0 ? undefined : WEEK_DAYS.indexOf(values.byWeekDay);
    const byHour = values.byHour.length == 0 ? undefined : parseInt(values.byHour);
    const byMinute = values.byMinute.length == 0 ? undefined : parseInt(values.byMinute);

    return {
      freq,
      count: 1,
      ...(byWeekDay != undefined && { byweekday: byWeekDay }),
      ...(byMonthDay && { bymonthday: byMonthDay }),
      ...(byHour && { byhour: byHour }),
      ...(byMinute && { byminute: byMinute }),
    };
  }

  function createRule(values: FormValuesType) {
    const options = getRRuleOptions(values);
    const rule = new RRule(options);

    onSubmit(rule);
  }

  useEffect(() => {
    const options = getRRuleOptions(form.values);
    const rule = new RRule(options);
    setRruleString(rule.toString());
    setRruleText(rule.toText());
  }, [form.values]);

  return (
    <>
      <form className="absolute z-50" onSubmit={form.onSubmit((values) => createRule(values))}>
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
          <Title>RRule Creator</Title>
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
            <NumberInput
              className="w-full"
              label="By Month Day"
              min={1}
              max={31}
              {...form.getInputProps('byMonthDay')}
            />
            <NumberInput className="w-full" label="By Hour" min={1} max={24} {...form.getInputProps('byHour')} />
            <NumberInput className="w-full" label="By Minute" min={1} max={60} {...form.getInputProps('byMinute')} />
          </Stack>
          <Center>
            <Stack>
              <Code block>{rruleString}</Code>
              <Code block>{rruleText}</Code>
            </Stack>
          </Center>
          <Group grow>
            <Button type="submit">Add</Button>
            <Button onClick={() => form.reset()}>Reset</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default RRuleForm;
