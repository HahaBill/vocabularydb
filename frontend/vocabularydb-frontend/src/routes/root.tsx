import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { AppShell, Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';
import VocabularyDBIcon from '../assets/vocabularydb_icon.png'
import { useDispatch } from 'react-redux';
import { checkSignedState } from '../redux-state/user/userSlice';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className="" data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconGauge, label: 'Dashboard' },
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: IconCalendarStats, label: 'Releases' },
  { icon: IconUser, label: 'Account' },
  { icon: IconFingerprint, label: 'Security' },
  { icon: IconSettings, label: 'Settings' },
];

export default function Root() {
  const [active, setActive] = useState(2);
  const authDispatch = useDispatch();
  const navigate = useNavigate();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const logout = () => {
    authDispatch(checkSignedState(false));
    navigate('/auth');
  };

  return (

    <div>
        <AppShell navbar={{ width: 80, breakpoint: 'sm'}} padding="md">
            <AppShell.Navbar p="md">
                <nav className="">
                    <Center>
                        <img className='h-12 w-12' src={VocabularyDBIcon} alt='Image'/>
                    </Center>

                    <div className="">
                        <Stack justify="center" gap={0}>
                        {links}
                        </Stack>
                    </div>

                    <Stack justify="center" gap={0}>
                        <NavbarLink icon={IconLogout} onClick={logout} label="Logout" />
                    </Stack>
                </nav>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    </div>
  );
}

// function Root() {
    
//     return (
//         <div>
//             <Outlet/>
//         </div>
//     )
// }

// export default Root;