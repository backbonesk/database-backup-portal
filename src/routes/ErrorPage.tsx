import { Center, Stack, Text, Title } from '@mantine/core';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <Center className="h-screen">
      <Stack>
        <Title>Oops!</Title>
        <Text>Sorry, an unexpected error has occurred.</Text>
        <Text c="red">{error.statusText || error.message}</Text>
      </Stack>
    </Center>
  );
}
