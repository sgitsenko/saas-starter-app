// import * as amplitude from '@amplitude/analytics-node'

// class AmplitudeAnalytics {
// 	apiKey: string
// 	isInitialized: boolean = false

// 	constructor(apiKey: string) {
// 		this.apiKey = apiKey
// 	}

// 	private initialize() {
// 		if (!this.isInitialized) {
// 			amplitude.init(this.apiKey)
// 			this.isInitialized = true
// 		}
// 	}

// 	identify(userId: string): void {
// 		this.initialize()
// 		const identifyObj = new amplitude.Identify()
// 		amplitude.identify(identifyObj, { user_id: userId })
// 	}

// 	track(eventName: string, eventProperties?: Record<string, any>, userId?: string): void {
// 		this.initialize()
// 		amplitude.track(eventName, eventProperties, { user_id: userId })
// 	}
// }

// class LocalAnalytics {
// 	constructor() {
// 		console.log('Initialize local analytics')
// 	}

// 	identify(userId: string): void {
// 		console.log('Set user for analytics: ', userId)
// 	}

// 	track(name: string, data?: Record<string, any>, userId?: string) {
// 		console.log('Track event: ', name, data, { user_id: userId })
// 	}
// }

// function shouldBeDefined<T>(value: T | undefined, valueName: string = 'value'): T {
// 	if (value === undefined) {
// 		throw new Error(`${valueName} is undefined`)
// 	}

// 	return value
// }

// export const ampliServer =
// 	process.env.NODE_ENV === 'production'
// 		? new AmplitudeAnalytics(shouldBeDefined(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY))
// 		: new LocalAnalytics()
