import { Group, Text, UnstyledButton, useMantineTheme } from '@mantine/core';

interface NavBarLinkProps {
  label: string;
}

function NavBarLink({ label }: NavBarLinkProps) {
  const theme = useMantineTheme();

  return (
    <UnstyledButton
      className="block w-full"
      sx={{
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.black,

        '&:hover': {
          backgroundColor: theme.colors.blue[0],
        },
      }}
    >
      <Group>
        <Text size="md">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

export default NavBarLink;
