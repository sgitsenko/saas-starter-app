import { getSession, getSubscription, getActiveProductsWithPrices } from '@/app/supabase-server'
import { MobileNavbar } from '@/app/_landing/MobileNavbar'

export default async function PricingPage() {
	const [session, products, subscription] = await Promise.all([
		getSession(),
		getActiveProductsWithPrices(),
		getSubscription()
	])

	return <MobileNavbar />
}
