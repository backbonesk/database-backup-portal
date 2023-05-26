import {
  AppShell,
  Burger,
  Center,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import NavBarLink from '../components/NavBarLink';
import Login from './Login';

function Root() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            <Stack spacing="sm">
              <NavBarLink label="Login" href="/" />
              <NavBarLink label="Scheduler" href="/scheduler" />
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          TODO: Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div className="flex items-center h-full">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.dark[8]}
                mr="xl"
              />
            </MediaQuery>

            <Title order={2}>Database Backup</Title>
          </div>
        </Header>
      }
    >
      <Center maw={400} mx="auto" sx={{ height: '100%' }}>
        <Login />
      </Center>
    </AppShell>
  );
}

export default Root;
