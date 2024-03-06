'use client'

import { FC, PropsWithChildren } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group, Button, NavLink, Title, Text } from '@mantine/core'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ColorSchemeToggle } from '@/src/components/shared/color-scheme-toggle/color-scheme-toggle'
import { NewsletterModal } from '../shared/newsletter-modal/newsletter-modal'
import { ampliClient } from '@/src/utils/amplitude-client'
import { useEffect } from 'react'

export const LandLayout: FC<PropsWithChildren> = ({ children }) => {
	const [opened, { toggle }] = useDisclosure()
	const pathname = usePathname()

	useEffect(() => {
		ampliClient.track('Land page viewed', { pathname })
	}, [pathname])

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
						<Title order={3}>
							<Link href='/'>
								<Text inherit variant='gradient' component='span' size='xl'>
									ResumAI
								</Text>
							</Link>
						</Title>

						<Group>
							<ColorSchemeToggle />
							<NewsletterModal
								buttonText='Войти'
								onClick={() => ampliClient.track('Sign clicked', { source: 'header' })}
							/>
							{/* <Button radius='md' onClick={() => router.push('/signin')}>
								Войти
							</Button> */}
						</Group>
					</Group>
				</Group>
			</AppShell.Header>

			{/* <AppShell.Navbar py='md' px={4}>
				<NavLink key='Pricing' label='Pricing' variant='subtle' />
				<NavLink key='Blog' label='Blog' variant='subtle' />
				<NavLink key='Contacts' label='Contacts' variant='subtle' />
				<NavLink key='Support' label='Support' variant='subtle' />
			</AppShell.Navbar> */}

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
