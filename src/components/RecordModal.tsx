import { Box, Button, Table, Text, Title } from '@mantine/core';
import { BackupScheduleRecord } from '../utilities/types';

type RecordModalProps = {
  title: string;
  records: BackupScheduleRecord[];
  onExit: () => void;
};

function RecordModal({ title, records, onExit }: RecordModalProps) {
  function statusColor(status: string) {
    switch (status) {
      case 'finished':
        return 'green';
      case 'running':
        return 'orange';
      case 'failed':
        return 'red';
      default:
        return 'indigo';
    }
  }

  const rows = records.map((element, idx) => (
    <tr key={element.id}>
      <td>
        <Text c="gray">{idx + 1}</Text>
      </td>
      <td className="uppercase">
        <Text tt="uppercase" c={statusColor(element.status)}>
          {element.status}
        </Text>
      </td>
      <td>{element.id}</td>
      <td>{element.created_at}</td>
      <td>{element.destination}</td>
      <td></td>
    </tr>
  ));

  return (
    <>
      <div className="overlay" />
      <div className="w-full h-full flex items-center justify-center fixed inset-0 z-20">
        <Box
          sx={(theme) => ({
            backgroundColor: theme.white,
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            border: `1px solid ${theme.colors.gray[3]}`,
          })}
          className="flex flex-col justify-between max-w-4xl gap-8 w-screen h-screen max-h-[80vh]"
        >
          <Title order={2} align="center">
            {title} logs
          </Title>
          <div className="overflow-auto">
            <Table horizontalSpacing="md" verticalSpacing="lg">
              <thead>
                <tr>
                  <th />
                  <th>status</th>
                  <th>id</th>
                  <th>created_at</th>
                  <th>destination</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
          <Button color="green" onClick={onExit}>
            OK
          </Button>
        </Box>
      </div>
    </>
  );
}

export default RecordModal;
