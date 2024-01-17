import * as amplitude from '@amplitude/analytics-browser'

interface Analytics {
	setUser: (id: string) => void
	trackEvent: (name: string, data?: Record<string, any>) => void
}

class AmplitudeAnalytics implements Analytics {
	apiKey: string
	isInitialized: boolean = false

	constructor(apiKey: string) {
		this.apiKey = apiKey
	}

	private initialize() {
		if (!this.isInitialized) {
			amplitude.init(this.apiKey)
			this.isInitialized = true
		}
	}

	setUser(id: string) {
		this.initialize()
		amplitude.setUserId(id)
	}

	trackEvent(name: string, data?: Record<string, unknown>) {
		this.initialize()
		amplitude.track(name, data)
	}
}

class LocalAnalytics implements Analytics {
	constructor() {
		console.log('Initialize local analytics')
	}

	setUser(id: string) {
		console.log('Set user for analytics: ', id)
	}

	trackEvent(name: string, data?: Record<string, any>) {
		console.log('Track event: ', name, data)
	}
}

function shouldBeDefined<T>(value: T | undefined, valueName: string = 'value'): T {
	if (value === undefined) {
		throw new Error(`${valueName} is undefined`)
	}

	return value
}

export const analytics =
	process.env.NODE_ENV === 'production'
		? new AmplitudeAnalytics(shouldBeDefined(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY))
		: new LocalAnalytics()

