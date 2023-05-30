import {
  AppShell,
  Burger,
  Group,
  Header,
  LoadingOverlay,
  MediaQuery,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useGlobalLoading, useGlobalToken } from '../utilities/stores';

function Root() {
  const theme = useMantineTheme();
  const [token, setToken] = useGlobalToken();
  const [loading, _setLoading] = useGlobalLoading();
  const [localToken, _setLocalToken, removeLocalToken] = useLocalStorage('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (localToken) {
      setToken(localToken as string);
      navigate('/backups');
    } else {
      navigate('/');
    }
  }, []);

  function logOut() {
    removeLocalToken();
    setToken(undefined);
    navigate('/');
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
      {loading && <LoadingOverlay visible={loading} overlayBlur={2} />}
      <Outlet />
    </AppShell>
  );
}

export default Root;
