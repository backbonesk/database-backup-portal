import { Button, Center, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

interface FormType {
  username: string;
  password: string;
}

function Login() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);

  function onSubmit(values: FormType) {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <>
      <form className="w-full" onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Stack className="w-full max-w-md rounded-md" p="md">
          <Title order={2} align="center">
            Login
          </Title>
          <Stack spacing="xs">
            <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
            <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
          </Stack>
          <Center mt="md">
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Center>
        </Stack>
      </form>
    </>
  );
}

export default Login;
