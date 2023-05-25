import {
  AppShell,
  Burger,
  Center,
  Footer,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Title,
  createEmotionCache,
  useMantineTheme,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { useGlobalToken } from '../utilities/globals';
import Login from './Login';
import NavBarLink from './NavBarLink';

const queryClient = new QueryClient();

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [localToken, setLocalToken] = useLocalStorage('token');
  const [token, setToken] = useGlobalToken();

  useEffect(() => {
    if (localToken) setToken(localToken as string);
  }, []);
  useEffect(() => {
    setLocalToken(token);
  }, [token]);

  const myCache = createEmotionCache({
    key: 'mantine',
    prepend: false,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider emotionCache={myCache} withGlobalStyles withNormalizeCSS>
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
      </MantineProvider>
    </QueryClientProvider>
  );
}
