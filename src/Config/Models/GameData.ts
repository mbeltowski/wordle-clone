export default interface GameData {
	game: {
		userTries: string[][]
		word: string
		finished: boolean
		attempts: number
		finishDate: Date | null
	}
	lastWord: string
	lastWordAttempts: number
	streak: number
}
