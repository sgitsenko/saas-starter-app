import '@mantine/core/styles.css'
import '../styles/global.css'
import { PropsWithChildren } from 'react'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import SupabaseProvider from '../utils/supabase-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getSession } from '@/src/utils/supabase-server'
import { LandLayout } from '@/src/components/marketing/land-layout'
import { AppLayout } from '../components/application/app-layout'

const meta = {
	title: 'ResumAI | SGDev',
	description: 'AI-powered Resume Builder',
	robots: 'follow, index',
	favicon: '/src/public/favicon.ico',
	url: 'https://resumai.sgdev.me',
	type: 'website'
}

export const metadata = {
	title: meta.title,
	description: meta.description,
	robots: meta.robots,
	favicon: meta.favicon,
	url: meta.url,
	type: meta.type
	// openGraph: {
	// 	url: meta.url,
	// 	title: meta.title,
	// 	description: meta.description,
	// 	cardImage: meta.cardImage,
	// 	type: meta.type,
	// 	site_name: meta.title
	// },
	// twitter: {
	// 	card: 'summary_large_image',
	// 	site: '@srgritsenko',
	// 	title: meta.title,
	// 	description: meta.description,
	// 	cardImage: meta.cardImage
	// }
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children
}: PropsWithChildren) {
	const session = await getSession()

	return (
		<html lang='en'>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>
					<SupabaseProvider>
						<ToastContainer theme='colored' position='top-center' />
						{!session ? <LandLayout>{children}</LandLayout> : <AppLayout>{children}</AppLayout>}
					</SupabaseProvider>
				</MantineProvider>
			</body>
		</html>
	)
}
