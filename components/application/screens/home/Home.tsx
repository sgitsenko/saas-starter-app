import { Title, Text, Anchor } from '@mantine/core'
import classes from './Home.module.css'

export function AppHome() {
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