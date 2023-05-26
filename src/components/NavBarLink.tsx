import { NavLink, useMantineTheme } from '@mantine/core';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavBarLinkProps {
  label: string;
  href: string;
}

function NavBarLink({ label, href }: NavBarLinkProps) {
  const theme = useMantineTheme();

  return (
    <RouterNavLink to={href}>
      {({ isActive }) => (
        <NavLink label={label} active={isActive} variant="filled" sx={{ borderRadius: theme.radius.md }} />
      )}
    </RouterNavLink>
  );
}

export default NavBarLink;
