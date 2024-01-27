import { Json } from './types_db'

export interface PageMeta {
	title: string
	description: string
	cardImage: string
}

export interface Notice {
	type: string
	event: string
	object: PaymentNotice
}

export interface PaymentNotice {
	id: string
	status: string
	amount: {
		value: string
		currency: string
	}
	income_amount: {
		value: string
		currency: string
	}
	description: string
	recipient: {
		account_id: string
		gateway_id: string
	}
	payment_method: {
		type: string
		id: string
		saved: boolean
		title: string
		card: {
			first6: string
			last4: string
			expiry_year: string
			expiry_month: string
			card_type: string
			issuer_country: string
		}
	}
	captured_at: string
	created_at: string
	test: boolean
	refunded_amount: {
		value: string
		currency: string
	}
	paid: boolean
	refundable: boolean
	metadata: { user_id: string; subscription_id: string; price_id: string; user_email: string }
	authorization_details: {
		rrn: string
		auth_code: string
		three_d_secure: {
			applied: boolean
			method_completed: boolean
			challenge_completed: boolean
		}
	}
}

export interface PaymentMethod {
	type?: string
	id?: string
	saved?: boolean
	title?: string
	card?: {
		first6: string
		last4: string
		expiry_year: string
		expiry_month: string
		card_type: string
		issuer_country?: string
		issuer_name?: string
		source?: string
	}
	account_number?: string
	payment_method_id?: string
}

export interface Customer {
	id: string /* primary key */
	stripe_customer_id?: string
}

export interface Product {
	id: string /* primary key */
	active?: boolean
	name?: string
	description?: string
	image?: string
	metadata?: Json
}

export interface ProductWithPrice extends Product {
	prices?: Price[]
}

export interface UserDetails {
	id: string /* primary key */
	is_new: boolean
	full_name?: string
	avatar_url?: string
	billing_address?: Json
	payment_method?: Json
}

export interface Price {
	id: string /* primary key */
	product_id?: string /* foreign key to products.id */
	active?: boolean
	description?: string
	unit_amount?: number
	currency?: string
	type?: string
	interval?: string
	interval_count?: number
	trial_period_days?: number | null
	metadata?: Json
	products?: Product
}

export interface PriceWithProduct extends Price {}

export interface Subscription {
	id: string /* primary key */
	user_id: string
	status?: string
	metadata?: Json
	price_id?: string /* foreign key to prices.id */
	quantity?: number
	cancel_at_period_end?: boolean
	created: string
	current_period_start: string
	current_period_end: string
	ended_at?: string
	cancel_at?: string
	canceled_at?: string
	trial_start?: string
	trial_end?: string
	prices?: Price
}
