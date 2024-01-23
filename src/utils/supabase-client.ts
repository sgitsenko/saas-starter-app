import { createClientComponentClient, User } from '@supabase/auth-helpers-nextjs'
import { ProductWithPrice, Subscription, UserDetails } from '../../types'
import type { Database } from '../../types_db'

export const supabase = createClientComponentClient<Database>()

export const getUser = async (): Promise<User> => {
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	if (error) {
		console.log(error.message)
	}
	return user as User
}

export const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
	const { data, error } = await supabase
		.from('products')
		.select('*, prices(*)')
		.eq('active', true)
		.eq('prices.active', true)
		.order('metadata->index')
		.order('unit_amount', { foreignTable: 'prices' })

	if (error) {
		console.log(error.message)
	}
	// TODO: improve the typing here.
	return (data as any) || []
}

export const getSubscription = async (): Promise<Subscription> => {
	const { data, error } = await supabase
		.from('subscriptions')
		.select('*, prices(*, products(*))')
		.in('status', ['active', 'canceled', 'past_due', 'unpaid'])
		.single()

	if (error) {
		console.log(error.message)
	}
	// TODO: improve the typing here.
	return data as Subscription
}

export const getUserDetails = async (): Promise<UserDetails> => {
	const { data, error } = await supabase.from('users').select('*').single()

	if (error) {
		console.log(error.message)
	}
	// TODO: improve the typing here.
	return data as UserDetails
}

export const updateUserName = async (user: User, name: string) => {
	await supabase
		.from('users')
		.update({
			full_name: name
		})
		.eq('id', user.id)
}
