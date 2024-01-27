'use client'

import { Title, Text, Anchor } from '@mantine/core'
import classes from './home.module.css'
import { useEffect } from 'react'
import { ampliClient } from '@/src/utils/amplitude-client'
import { User } from '@supabase/supabase-js'
import { useSupabase } from '@/src/utils/supabase-provider'

export function AppHome({ user }: { user: User }) {
	const { supabase } = useSupabase()
	let isSignedIn = localStorage.getItem('isSignedIn')

	useEffect(() => {
		const currentUser = localStorage.getItem('currentUser')

		if (currentUser !== user.id) {
			ampliClient.setUser(user.id)

			checkIsNewUser()
				.then(confirm => {
					if (confirm) {
						ampliClient.track('Sign up completed')
						changeIsNewUserStatus()
						// здесь запустить онбординг
					} else {
						ampliClient.track('Sign in completed')
					}
				})
				.catch(error => console.log('Is new user check error 3:', error))

			localStorage.setItem('currentUser', user.id)
			localStorage.setItem('isSignedIn', 'true')
			isSignedIn = 'true'
			console.log('IsSignedIn: ', isSignedIn)
		}

		if (isSignedIn === 'false') {
			ampliClient.track('Sign in completed')
			localStorage.setItem('isSignedIn', 'true')
		}
	}, [user.id])

	const checkIsNewUser = async (): Promise<boolean> => {
		try {
			const { data, error } = await supabase.from('users').select('is_new')

			if (error) {
				console.log('Is new user check error 1:', error)
				return false
			}
			console.log('Is_new user status: ', data[0].is_new)
			return data[0].is_new !== undefined
		} catch (error) {
			console.log('Is new user check error 2:', error)
			throw error
		}
	}

	const changeIsNewUserStatus = async () => {
		const { error } = await supabase.from('users').update({ is_new: false }).eq('id', user.id)
		if (error) {
			console.log('Changing is_new user status failed:', error.message)
		}
		console.log('Is_new user status changed')
	}

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
