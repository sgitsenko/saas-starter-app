'use client'

import { ActionIcon, Group, useMantineColorScheme, rem } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'

export function ThemeToggle() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()

	return (
		<Group>
			<ActionIcon
				onClick={() => toggleColorScheme()}
				size='xl'
				sx={theme => ({
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.white,
					color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
					'&:hover': {
						backgroundColor:
							theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
					},
					borderRadius: theme.radius.md
				})}
			>
				{colorScheme === 'dark' ? (
					<IconSun size={20} stroke={1.5} />
				) : (
					<IconMoonStars size={20} stroke={1.5} />
				)}
			</ActionIcon>
		</Group>
	)
}
