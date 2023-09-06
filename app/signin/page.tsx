import { getSession } from '@/app/supabase-server'
import AuthUI from './AuthUI'
import { redirect } from 'next/navigation'

export default async function SignIn() {
	const session = await getSession()

	if (session) {
		return redirect('/account')
	}

	return (
		<div>
			<div>
				<AuthUI />
			</div>
		</div>
	)
}
