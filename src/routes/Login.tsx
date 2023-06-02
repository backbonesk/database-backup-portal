import { Button, Center, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../utilities/config';
import { useLocalStorage } from 'react-use';

interface FormType {
  username: string;
  password: string;
}

function Login() {
  const [_token, setToken] = useLocalStorage('token');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormType) => {
      const { data } = await axios.post(`${URL}/token`, values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
  });

  async function onSubmit(values: FormType) {
    const data = await mutation.mutateAsync(values);
    setToken(data['access_token']);
    navigate('/backups');
  }

  return (
    <>
      <Center maw={400} mx="auto" className="h-full">
        <form className="w-full" onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Stack className="w-full max-w-md rounded-md" spacing="xl" p="md">
            <Title order={2} align="center">
              Login
            </Title>
            <Stack spacing="xs">
              <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
              <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
            </Stack>
            {mutation.isError && (
              <Text c="red" align="center">
                Error while logging in
              </Text>
            )}
            <Center>
              <Button type="submit" loading={mutation.isLoading}>
                Login
              </Button>
            </Center>
          </Stack>
        </form>
      </Center>
    </>
  );
}

export default Login;
