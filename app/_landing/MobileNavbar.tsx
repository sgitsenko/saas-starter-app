'use client'

import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core'
import { MantineLogo } from '@mantine/ds'
import classes from './MobileNavbar.module.css'
import { Welcome } from '../../components/welcome/Welcome'
import { ColorSchemeToggle } from '../../components/color-scheme-toggle/ColorSchemeToggle'
import { ActionIcon } from '@mantine/core'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

export function MobileNavbar() {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
	const [opened, { toggle }] = useDisclosure()

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
			padding='md'
		>
			<AppShell.Header>
				<Group h='100%' px='md'>
					<Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
					<Group justify='space-between' style={{ flex: 1 }}>
						<MantineLogo size={30} />
						<Group ml='xl' gap={0} visibleFrom='sm'>
							<UnstyledButton className={classes.control}>Home</UnstyledButton>
							<UnstyledButton className={classes.control}>Blog</UnstyledButton>
							<UnstyledButton className={classes.control}>Contacts</UnstyledButton>
							<UnstyledButton className={classes.control}>Support</UnstyledButton>
						</Group>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar py='md' px={4}>
				<UnstyledButton className={classes.control}>Home</UnstyledButton>
				<UnstyledButton className={classes.control}>Blog</UnstyledButton>
				<UnstyledButton className={classes.control}>Contacts</UnstyledButton>
				<UnstyledButton className={classes.control}>Support</UnstyledButton>
			</AppShell.Navbar>

			<AppShell.Main>
				<Welcome />
			</AppShell.Main>
		</AppShell>
	)
}
