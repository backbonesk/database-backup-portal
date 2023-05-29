import { AppShell, Burger, Group, Header, MediaQuery, Title, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useGlobalToken } from '../utilities/globals';

function Root() {
  const theme = useMantineTheme();
  const [token, setToken] = useGlobalToken();
  const [localToken, _setLocalToken, removeLocalToken] = useLocalStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (localToken) {
      setToken(localToken as string);
      navigate('/backups');
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
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div className="flex items-center h-full">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={false} onClick={() => {}} size="sm" color={theme.colors.dark[8]} mr="xl" />
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
      <Outlet />
    </AppShell>
  );
}

export default Root;
