import { AppWelcome } from '@/components/application/welcome/Welcome'
import { LandWelcome } from '@/components/landing/welcome/Welcome'
import { getSession, getSubscription, getActiveProductsWithPrices } from '@/utils/supabase-server'

export default async function HomePage() {
	const [session, products, subscription] = await Promise.all([
		getSession(),
		getActiveProductsWithPrices(),
		getSubscription()
	])

	return !session ? <LandWelcome /> : <AppWelcome />
}
