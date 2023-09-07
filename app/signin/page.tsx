import { getSession } from '@/utils/supabase-server'
import { SignIn } from '@/components/landing/screens/signin/SignIn'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
	const session = await getSession()

	// if (session) {
	// 	return redirect('/account')
	// }

	return <SignIn />
}
