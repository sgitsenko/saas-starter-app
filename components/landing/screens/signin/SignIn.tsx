'use client'

import { useForm } from '@mantine/form'
import { TextInput, Paper, Button, Divider, Container, Title } from '@mantine/core'
import { useState } from 'react'
import { Loader } from '@mantine/core'
import { useSupabase } from '@/utils/supabase-provider'
import { GoogleButton } from './GoogleButton'
import { toast } from 'react-toastify'
import { getURL } from '@/utils/helpers'

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

	const onSubmit = async () => {
		setLoading(true)

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
			<Title mt={58}>Авторизация</Title>
			<Paper withBorder shadow='md' p={20} mt={30} radius='md'>
				{loading ? (
					<Loader size='xl' />
				) : (
					<form onSubmit={form.onSubmit(onSubmit)}>
						<TextInput
							required
							label='Введите эл.почту'
							placeholder='user@email.com'
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
