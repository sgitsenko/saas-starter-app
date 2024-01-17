import { AppHome } from '@/components/application/screens/home/Home'
import { LandHome } from '@/components/landing/screens/home/Home'
import { getSession, getSubscription, getActiveProductsWithPrices } from '@/utils/supabase-server'

export default async function HomePage() {
	const [session, products, subscription] = await Promise.all([
		getSession(),
		getActiveProductsWithPrices(),
		getSubscription()
	])

	return !session ? <LandHome /> : <AppHome />
}
