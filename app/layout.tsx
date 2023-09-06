import SupabaseProvider from './supabase-provider'
import { Providers } from './externals/provider'
import { PropsWithChildren } from 'react'
import 'styles/main.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandHeader from '@/components/headers/LandHeader'

const meta = {
	title: 'SGDev | SaaS Starter App',
	description: 'Boilerplate for SaaS',
	cardImage: '/og.png',
	robots: 'follow, index',
	favicon: '/favicon.ico',
	url: 'https://saas-sstarter-app.vercel.app',
	type: 'website'
}

export const metadata = {
	title: meta.title,
	description: meta.description,
	cardImage: meta.cardImage,
	robots: meta.robots,
	favicon: meta.favicon,
	url: meta.url,
	type: meta.type,
	openGraph: {
		url: meta.url,
		title: meta.title,
		description: meta.description,
		cardImage: meta.cardImage,
		type: meta.type,
		site_name: meta.title
	},
	twitter: {
		card: 'summary_large_image',
		site: '@srgritsenko',
		title: meta.title,
		description: meta.description,
		cardImage: meta.cardImage
	}
}

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children
}: PropsWithChildren) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<SupabaseProvider>
						<LandHeader />
						<ToastContainer theme='colored' position='top-center' />
						{children}
					</SupabaseProvider>
				</Providers>
			</body>
		</html>
	)
}
