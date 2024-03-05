'use client'

import { useForm } from '@mantine/form'
import { TextInput, Paper, Button, Divider, Container, Title, Loader } from '@mantine/core'
import { useState } from 'react'
import { useSupabase } from '@/src/utils/supabase-provider'
import { GoogleButton } from './google-button'
import { toast } from 'react-toastify'
import { getURL } from '@/src/utils/helpers'
import { ampliClient } from '@/src/utils/amplitude-client'

export const SignIn = () => {
	const [loading, setLoading] = useState(false)
	const { supabase } = useSupabase()

	const form = useForm({
		initialValues: {
			email: ''
		},

		validate: {
			email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email')
		}
	})

	const signInWithEmail = async () => {
		setLoading(true)
		ampliClient.track('Sign up/in started', { provider: 'email' })

		const { error: mgcErr } = await supabase.auth.signInWithOtp({
			email: form.values.email,
			options: {
				emailRedirectTo: `${getURL()}`
			}
		})

		if (mgcErr) {
			setLoading(false)
			toast.error(mgcErr.message)
			return
		}

		setLoading(false)
		toast.success(`Ссылка для входа отправлена на почту ${form.values.email}`, { autoClose: false })
	}

	const signInWithGoogle = async () => {
		ampliClient.track('Sign up/in started', { provider: 'google' })

		const { error: goglErr } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				},
				redirectTo: `${getURL()}`
			}
		})

		if (goglErr) {
			setLoading(false)
			toast.error(goglErr.message)
			return
		}

		setLoading(false)
	}

	return (
		<Container size={450}>
			<Title order={2} mt={58} style={{ textAlign: 'center' }}>
				Авторизация
			</Title>
			<Paper withBorder shadow='md' p={20} mt={30} radius='md'>
				{loading ? (
					<Loader size='xl' />
				) : (
					<form onSubmit={form.onSubmit(signInWithEmail)}>
						<TextInput
							required
							label='Введите эл.почту'
							placeholder='name@email.com'
							value={form.values.email}
							onChange={event => form.setFieldValue('email', event.currentTarget.value)}
							error={form.errors.email && 'Invalid email'}
							radius='sm'
						/>

						<Button type='submit' radius='md' fullWidth mt='xl'>
							Отправить ссылку для входа
						</Button>
					</form>
				)}

				<Divider label='ИЛИ' labelPosition='center' my='lg' />

				<GoogleButton onClick={signInWithGoogle} />
			</Paper>
		</Container>
	)
}
