import { checkSession } from '@/src/utils/supabase-server'

export default async function DashboardPage() {
	await checkSession()
	return <div>Dashboard</div>
}
