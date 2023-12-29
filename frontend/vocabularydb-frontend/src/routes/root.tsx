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

interface NavbarIcon {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarIcon) {
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton onClick={onClick}>
        <Icon className={`rounded-lg ${active ? 'bg-gradient-to-r from-amber-100 to-emerald-100 ' : 'bg-gradient-to-r from-amber-200 to-emerald-300 hover:from-amber-100 hover:to-emerald-100'} `} style={{ width: rem(30), height: rem(30) }} stroke={1.5} color="#000066"/>
      </UnstyledButton>
    </Tooltip>
  );
}

const navbarIcons = [
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

  const links = navbarIcons.map((link, index) => (
    <NavbarLink
      {...link}
      label={link.label}
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
            <AppShell.Navbar className='bg-gradient-to-r from-orange-200 to-emerald-500' p="md">
                <nav className="">
                    <Center>
                        <img className='h-12 w-12' src={VocabularyDBIcon} alt='Image'/>
                    </Center>

                    <div className="absolute top-24 left-6">
                      <Stack justify="center" gap={10}>
                        {links}
                      </Stack>
                    </div>
                    <div className='absolute bottom-8 left-6'>
                      <NavbarLink icon={IconLogout} onClick={logout} label="Logout" />
                    </div>
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