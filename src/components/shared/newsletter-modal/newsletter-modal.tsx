'use client'

import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Box, Text, TextInput } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'
import { subscribeNewsletter } from '@/src/utils/subscribe-newsletter'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { ampliClient } from '@/src/utils/amplitude-client'

interface MailingModalProps {
	buttonText: string
	onClick: () => void
}

export const NewsletterModal: FC<PropsWithChildren<MailingModalProps>> = ({
	buttonText,
	onClick
}) => {
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
		ampliClient.track('Email subscription started')

		const res = await subscribeNewsletter(form.values.email)

		if (res !== 'Вы успешно подписаны!') {
			setLoading(false)
			toast.error(res)
			ampliClient.track('Error Encountered', { source: 'email subscription' })
			return
		}

		ampliClient.track('Email subscription completed')
		setLoading(false)
		toast.success(res)
	}

	return (
		<Box style={{ textAlign: 'center' }}>
			<Modal opened={opened} onClose={close} title='Благодарим за проявленный интерес 🤗' centered>
				<Text size='sm' mb='sm'>
					В настоящее время сервис в стадии разработки ⚒️
					<br />
					Подпишитесь, чтобы узнать о запуске в числе первых
					<br />
				</Text>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<TextInput
						placeholder='name@email.ru'
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
			<Button
				radius='xl'
				onClick={() => {
					onClick()
					open()
				}}
			>
				{buttonText}
			</Button>
		</Box>
	)
}
