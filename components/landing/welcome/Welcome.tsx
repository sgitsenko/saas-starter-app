'use client'

import { Title, Text, Anchor, Box } from '@mantine/core'
import classes from './Welcome.module.css'
import { useRouter } from 'next/navigation'
import { NewsletterModal } from '@/components/shared/newsletter-modal/NewsletterModal'

export function LandWelcome() {
	const router = useRouter()
	return (
		<>
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
				{/* <Button radius='md' mt='xl' onClick={() => router.push('/signin')}>Начать бесплатно</Button> */}
			</Text>
			<NewsletterModal buttonText='Начать бесплатно' />
		</>
	)
}
