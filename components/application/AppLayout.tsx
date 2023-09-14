'use client'

import { FC, PropsWithChildren } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Button, Group, Skeleton } from '@mantine/core'
import { MantineLogo } from '@mantine/ds'
import { ColorSchemeToggle } from '@/components/shared/color-scheme-toggle/ColorSchemeToggle'
import { useSupabase } from '@/utils/supabase-provider'
import { useRouter } from 'next/navigation'

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
	const router = useRouter()
	const { supabase } = useSupabase()

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
			}}
			padding='md'
		>
			<AppShell.Header>
				<Group h='100%' px='md'>
					<Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
					<Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
					<Group justify='space-between' style={{ flex: 1 }}>
						<MantineLogo size={30} />
						<Group>
							<ColorSchemeToggle />
							<Button
								radius='md'
								onClick={async () => {
									await supabase.auth.signOut()
									router.push('/')
									router.refresh()
								}}
							>
								Выйти
							</Button>
						</Group>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p='md'>
				Navbar
				{Array(15)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} h={28} mt='sm' animate={false} />
					))}
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
