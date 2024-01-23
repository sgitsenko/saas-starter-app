'use server'

const apiKey = process.env.NEXT_PUBLIC_SENDER_API_KEY
const groupId = process.env.NEXT_PUBLIC_SENDER_GROUP_ID

export async function subscribeNewsletter(email: string) {
	const checkRes = await fetch('https://api.sender.net/v2/subscribers/' + email, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	})

	if (checkRes.status === 200) {
		return 'Этот адрес уже подписан, введите другой'
	} else {
		switch (checkRes.status) {
			case 422:
				return 'Эл.почта не валидна, введите другую'
			case 429:
				return 'Слишком много запросов, попробуйте позднее'
			default:
				break
		}
	}

	try {
		await fetch('https://api.sender.net/v2/subscribers', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				email: email,
				groups: [groupId]
			})
		})

		return 'Вы успешно подписаны!'
	} catch (error) {
		return 'Что-то пошло не так, попробуйте позднее'
	}
}
