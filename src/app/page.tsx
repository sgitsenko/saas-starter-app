import { AppHome } from '@/src/components/application/screens/home/home'
import { LandHome } from '@/src/components/marketing/screens/home/home'
import {
	getSession,
	getSubscription,
	getActiveProductsWithPrices
} from '@/src/utils/supabase-server'

export default async function HomePage() {
	const [session, products, subscription] = await Promise.all([
		getSession(),
		getActiveProductsWithPrices(),
		getSubscription()
	])

	return !session ? <LandHome /> : <AppHome />
}
