'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Button, Group, Skeleton } from '@mantine/core'
import { MantineLogo } from '@mantine/ds'
import { ColorSchemeToggle } from '@/src/components/shared/color-scheme-toggle/color-scheme-toggle'
import { useSupabase } from '@/src/utils/supabase-provider'
import { useRouter, usePathname } from 'next/navigation'
import { analyticsClient } from '@/src/utils/analytics-client'
import { getUser } from '@/src/utils/supabase-client'

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
	const router = useRouter()
	const pathname = usePathname()
	const { supabase } = useSupabase()
	
	useEffect(() => {
		getUser()
			.then(user => analyticsClient.setUser(user.id))
			.catch(error => console.log(error))
		analyticsClient.track('App page viewed', { pathname })
	}, [pathname])

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
