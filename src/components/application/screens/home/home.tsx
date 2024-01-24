'use client'

import { Title, Text, Anchor } from '@mantine/core'
import classes from './home.module.css'
import { useEffect } from 'react'
import { getUser } from '@/src/utils/supabase-client'
import { amplitudeClient } from '@/src/utils/amplitude-client'

export function AppHome() {
	useEffect(() => {
		const ampliUserSeted = localStorage.getItem('ampliUserSeted')

		if (!ampliUserSeted) {
			getUser()
				.then(user => {
					amplitudeClient.setUser(user.id)
					console.log('useEffect', user?.id)
				})
				.catch(error => console.log(error))

			localStorage.setItem('ampliUserSeted', 'true')
		}

		return 
	})

	return (
		<>
			<Title className={classes.title} ta='center' mt={100}>
				Welcome to{' '}
				<Text inherit variant='gradient' component='span'>
					App
				</Text>
			</Title>
			<Text ta='center' size='lg' maw={580} mx='auto' mt='xl'>
				Здесь будет та самая умопомрачительная веб-прила, которая снесёт вам башню! Следите за
				обновлениями на{' '}
				<Anchor href='https://sgdev.me' size='lg'>
					сайте разработчика
				</Anchor>
			</Text>
		</>
	)
}
