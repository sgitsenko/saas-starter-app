import { Title, Text, Anchor } from '@mantine/core'
import classes from './Welcome.module.css'

export function LandWelcome() {
	return (
		<>
			<Title className={classes.title} ta='center' mt={100}>
				Welcome to{' '}
				<Text inherit variant='gradient' component='span'>
					SGDev
				</Text>
			</Title>
			<Text ta='center' size='lg' maw={580} mx='auto' mt='xl'>
				Здесь будет лендинг для привлечения клиентов в умопомрачительную веб-прилу, которая
				снесут вам башню! Следите за обновлениями на{' '}
				<Anchor href='https://sgdev.me' size='lg'>
					сайте разработчика
				</Anchor>
			</Text>
		</>
	)
}
