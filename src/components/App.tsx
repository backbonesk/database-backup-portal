import { MantineProvider, createEmotionCache } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import ErrorPage from '../routes/ErrorPage';
import Login from '../routes/Login';
import Root from '../routes/Root';
import Scheduler from '../routes/Scheduler';
import { useGlobalToken } from '../utilities/globals';

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: 'scheduler',
          element: <Scheduler />,
        },
      ],
    },
  ]);

  const [_localToken, setLocalToken] = useLocalStorage('token');
  const [token, _setToken] = useGlobalToken();

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
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
