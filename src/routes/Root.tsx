import { AppShell, Burger, Center, Footer, Header, MediaQuery, Navbar, Title, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import Login from './Login';
import NavBarLink from '../components/NavBarLink';

function Root() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            <NavBarLink label="TODO: Routing" />
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
