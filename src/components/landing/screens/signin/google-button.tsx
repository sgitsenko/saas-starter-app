import { Button } from '@mantine/core'
import React from 'react'
import { GoogleIcon } from './google-icon'

type Props = {
	onClick: () => void
}

export const GoogleButton = ({ onClick }: Props) => {
	return (
		<Button
			leftSection={<GoogleIcon />}
			variant='default'
			color='gray'
			radius='xl'
			fullWidth
			onClick={onClick}
		>
			Войти с Google
		</Button>
	)
}
