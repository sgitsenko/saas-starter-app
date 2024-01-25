'use client'

import { Title, Text, Anchor } from '@mantine/core'
import classes from './home.module.css'
import { useEffect } from 'react'
import { ampliClient } from '@/src/utils/amplitude-client'
import { User } from '@supabase/supabase-js'

export function AppHome({ user }: { user: User }) {
	useEffect(() => {
		const isSignedIn = localStorage.getItem('isSignedIn')
		const currentUser = localStorage.getItem('currentUser')

		if (currentUser !== user.id) {
			ampliClient.setUser(user.id)
			ampliClient.track('Signed in')
			localStorage.setItem('currentUser', user.id)
			localStorage.setItem('isSignedIn', 'true')
		}

		if (isSignedIn === 'false') {
			ampliClient.track('Signed in')
			localStorage.setItem('isSignedIn', 'true')
		}
	}, [user.id])

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
