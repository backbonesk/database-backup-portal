import {
  AppShell,
  Burger,
  Footer,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        navbar={
          <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} height={500} p="xs">
            <Text>Navbar content</Text>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
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
                ></Burger>
              </MediaQuery>

              <Title>Header</Title>
            </div>
          </Header>
        }
      >
        <Text>Login page</Text>
      </AppShell>
    </MantineProvider>
  );
}
