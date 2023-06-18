export default interface GameData {
	game: {
		userTries: string[][]
		word: string
		finished: boolean
		attempts: number
	}
	lastWord: string
	lastWordAttempts: number
	streak: number
}
