import { Title, Text, Anchor } from '@mantine/core'
import classes from './Welcome.module.css'

export function Welcome() {
	return (
		<>
			<Title className={classes.title} ta='center' mt={100}>
				Welcome to{' '}
				<Text inherit variant='gradient' component='span' gradient={{ from: 'pink', to: 'yellow' }}>
					SGDev
				</Text>
			</Title>
			<Text ta='center' size='lg' maw={580} mx='auto' mt='xl'>
				Здесь будет новый SaaS-Starter для запуска умопомрачительных веб-проектов, которые
				снесут вам башню! Следите за подробностями на{' '}
				<Anchor href='https://sgdev.me' size='lg'>
					сайте проекта
				</Anchor>
				.
			</Text>
		</>
	)
}
