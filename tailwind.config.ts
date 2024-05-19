import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem'
			}
		}
	}
}
