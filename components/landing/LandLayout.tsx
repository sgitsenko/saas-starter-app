'use client'

import { FC, PropsWithChildren } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { AppShell, Burger, Group, Button, NavLink } from '@mantine/core'
import { MantineLogo } from '@mantine/ds'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ColorSchemeToggle } from '@/components/shared/color-scheme-toggle/ColorSchemeToggle'
import { NewsletterModal } from '../shared/newsletter-modal/NewsletterModal'
import { analytics } from '@/utils/analitics'
import { useEffect } from 'react'


export const LandLayout: FC<PropsWithChildren> = ({ children }) => {
	const [opened, { toggle }] = useDisclosure()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		analytics.trackEvent('Visit page', {pathname})
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
						<MantineLogo size={30} onClick={() => router.push('/')} />
						<Group ml='xl' gap={30} visibleFrom='sm'>
							<Link key='Pricing' href='/'>
								Pricing
							</Link>
							<Link key='Blog' href='/'>
								Blog
							</Link>
							<Link key='Contacts' href='/'>
								Contacts
							</Link>
							<Link key='Support' href='/'>
								Support
							</Link>
						</Group>
						<Group>
							<ColorSchemeToggle />
							<NewsletterModal buttonText='Войти' />
							{/* <Button radius='md' onClick={() => router.push('/signin')}>
								Войти
							</Button> */}
						</Group>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar py='md' px={4}>
				<NavLink key='Pricing' label='Pricing' variant='subtle' />
				<NavLink key='Blog' label='Blog' variant='subtle' />
				<NavLink key='Contacts' label='Contacts' variant='subtle' />
				<NavLink key='Support' label='Support' variant='subtle' />
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	)
}
