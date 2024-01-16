'use client'

import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Box, Text, TextInput } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'
import { subscribeNewsletter } from '@/utils/subscribe-newsletter'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface MailingModalProps {
	buttonText: string
}

export const NewsletterModal: FC<PropsWithChildren<MailingModalProps>> = ({ buttonText }) => {
	const [opened, { open, close }] = useDisclosure(false)
	const [loading, setLoading] = useState(false)

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
		const res = await subscribeNewsletter(form.values.email)

		if (res !== 'Вы успешно подписаны!') {
			setLoading(false)
			toast.error(res)
			return
		}

		setLoading(false)
		toast.success(res)
	}

	return (
		<Box style={{ textAlign: 'center' }}>
			<Modal opened={opened} onClose={close} title='Благодарим за проявленный интерес 🤗' centered>
				<Text size='sm' mb='sm'>
					В настоящее время сервис активно разрабатывается ⚒️
					<br />
					Подпишитесь, чтобы узнать о его запуске в числе первых
					<br />
				</Text>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<TextInput
						placeholder='name@email.com'
						value={form.values.email}
						onChange={event => form.setFieldValue('email', event.currentTarget.value)}
						error={form.errors.email && 'Invalid email'}
						radius='sm'
					/>
					<Button type='submit' radius='md' fullWidth mt='sm' loading={loading}>
						Подписаться
					</Button>
				</form>
			</Modal>
			<Button onClick={open}>{buttonText}</Button>
		</Box>
	)
}
