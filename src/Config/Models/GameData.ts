export default interface GameData {
	game: {
		userTries: string[][]
		word: string
		finished: boolean
	}
	lastWord: string
	lastWordAttempts: number
	streak: number
}
