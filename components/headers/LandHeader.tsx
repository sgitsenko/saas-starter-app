'use client'

import { Transition, Header, Group, Burger, Paper, Button, Flex, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantine/ds'
import { ThemeToggle } from '../theme-toggle/ThemeToggle'
import Link from 'next/link'
import { useStyles } from './LandHeader.styles'
import { useRouter } from 'next/navigation'

const links = [
	// { link: '/app/test', label: 'Test' },
	{ link: '/pricing', label: 'Цены' }
	// { link: '/app', label: 'App' }
]

export function LandHeader() {
	const [opened, { toggle, close }] = useDisclosure(false)
	const { classes, cx } = useStyles()
	const router = useRouter()

	const items = links.map(link => (
		<Link
			key={link.label}
			href={link.link}
			className={classes.link}
			onClick={() => {
				close()
			}}
		>
			{link.label}
		</Link>
	))

	return (
		<Box>
			<Header height={60} px='xl'>
				<Group position='apart' sx={{ height: '100%' }}>
					<Link href='/'>
						<Flex align='center' style={{ cursor: 'pointer' }}>
							<MantineLogo size={30} />
						</Flex>
					</Link>

					<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />

					<Transition transition='pop-top-right' duration={200} mounted={opened}>
						{styles => (
							<Paper className={classes.dropdown} withBorder style={styles}>
								{items}
							</Paper>
						)}
					</Transition>

					<Group position='right'>
						<Group spacing={4} className={classes.links}>
							{items}
						</Group>
						<ThemeToggle />
						<Button radius='md' onClick={() => router.push('/signin')}>
							Войти
						</Button>
					</Group>
				</Group>
			</Header>
		</Box>
	)
}

export default LandHeader
