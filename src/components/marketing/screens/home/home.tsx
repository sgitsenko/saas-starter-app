'use client'

import {
	Title,
	Text,
	Anchor,
	Button,
	Box,
	Image,
	Container,
	Group,
	List,
	ThemeIcon,
	rem
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import image from '../../../../public/image.svg'
import classes from './home.module.css'
import { useRouter } from 'next/navigation'
import { NewsletterModal } from '@/src/components/shared/newsletter-modal/newsletter-modal'
import { ampliClient } from '@/src/utils/amplitude-client'

export function LandHome() {
	const router = useRouter()

	return (
		<Container className={classes.container} >
			<Title className={classes.title} ta='center'>
				Создавайте привлекательные резюме
				<br />
				без творческих мук
			</Title>
			<Text className={classes.description}>
				Онлайн-сервис резюме с искусственным интеллектом
			</Text>
			{/* <Button
				radius='md'
				onClick={() => {
					ampliClient.track('Sign up/in clicked', { source: 'hero' })
					router.push('/signin')
				}}
			>
				Начать бесплатно
			</Button> */}
			<NewsletterModal
				buttonText='НАЧАТЬ БЕСПЛАТНО'
				onClick={() => ampliClient.track('Sign up/in clicked', { source: 'hero' })}
			/>
		</Container>
	)
}
