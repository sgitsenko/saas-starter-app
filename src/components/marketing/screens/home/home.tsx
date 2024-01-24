'use client'

import { Title, Text, Anchor, Button, Box } from '@mantine/core'
import classes from './home.module.css'
import { useRouter } from 'next/navigation'
import { NewsletterModal } from '@/src/components/shared/newsletter-modal/newsletter-modal'
import { amplitudeClient } from '@/src/utils/amplitude-client'

export function LandHome() {
	const router = useRouter()

	const onClick = () => {
		amplitudeClient.track('Button clicked')
		router.push('/signin')
	}

	return (
		<Box className={classes.container}>
			<Title className={classes.title} ta='center' mt={100}>
				Welcome to{' '}
				<Text inherit variant='gradient' component='span'>
					SGDev
				</Text>
			</Title>
			<Text ta='center' size='lg' maw={580} mx='auto' mt='xs' mb='xs'>
				Здесь будет лендинг для привлечения клиентов в умопомрачительную веб-прилу, которая снесут
				вам башню! Следите за обновлениями на{' '}
				<Anchor className={classes.link} href='https://sgdev.me' size='lg'>
					сайте разработчика
				</Anchor>
			</Text>
			<Button radius='md' mt='md' onClick={onClick}>
				Начать бесплатно
			</Button>
			{/* <NewsletterModal buttonText='Начать бесплатно' /> */}
		</Box>
	)
}
