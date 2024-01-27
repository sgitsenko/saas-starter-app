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

	const checkIsNewUser = async () => {
		try {
			const { data, error: isNewErr } = await supabase.from('users').select('is_new')
			if (isNewErr) {
				throw isNewErr
			}
			console.log('Is new user: ', data[0].is_new)

			if (data[0].is_new) {
				ampliClient.track('Sign up completed')
				const { error } = await supabase.from('users').update({ is_new: false }).eq('id', user.id)
				if (error) {
					console.log('Changing is new user failed:', error.message)
				}
				console.log('Is new user: false')
			} else {
				ampliClient.track('Sign in completed')
			}

		} catch (error) {
			console.log('Is new user check error 2:', error)
			throw error
		}
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
