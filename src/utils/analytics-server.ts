import { init, identify, Identify, track } from '@amplitude/analytics-node'

class AmplitudeAnalytics {
	apiKey: string
	isInitialized: boolean = false

	constructor(apiKey: string) {
		this.apiKey = apiKey
	}

	private initialize() {
		if (!this.isInitialized) {
			init(this.apiKey)
			this.isInitialized = true
		}
	}

	identify(id: string): void {
		this.initialize()
		const identifyObj = new Identify()
		identify(identifyObj, { user_id: id })
	}

	track(eventName: string, eventProperties?: Record<string, any>, id?: string): void {
		this.initialize()
		track(eventName, eventProperties, { user_id: id })
	}
}

class LocalAnalytics {
	constructor() {
		console.log('Initialize local analytics')
	}

	identify(userId: string): void {
		console.log('Set user for analytics: ', userId)
	}

	track(name: string, data?: Record<string, any>) {
		console.log('Track event: ', name, data)
	}
}

function shouldBeDefined<T>(value: T | undefined, valueName: string = 'value'): T {
	if (value === undefined) {
		throw new Error(`${valueName} is undefined`)
	}

	return value
}

export const analyticsServer =
	process.env.NODE_ENV === 'production'
		? new AmplitudeAnalytics(shouldBeDefined(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY))
		: new LocalAnalytics()
