import {
  AppShell,
  Burger,
  Center,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import NavBarLink from '../components/NavBarLink';
import { useGlobalToken } from '../utilities/globals';

function Root() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [token, setToken] = useGlobalToken();
  const [localToken, _setLocalToken, removeLocalToken] = useLocalStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (localToken) {
      setToken(localToken as string);
      navigate('/scheduler');
    } else {
      navigate('/');
    }
  }, [navigate]);

  function logOut() {
    removeLocalToken();
    setToken(undefined);
  }

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
            <Group position="apart" className="w-full">
              <Title order={2}>Database Backup</Title>
              {token ? (
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <UnstyledButton onClick={logOut}>Log out</UnstyledButton>
                </MediaQuery>
              ) : null}
            </Group>
          </div>
        </Header>
      }
    >
      <Center maw={400} mx="auto" className="h-full">
        <Outlet />
      </Center>
    </AppShell>
  );
}

export default Root;
