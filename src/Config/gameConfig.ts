import GameData from "./Models/GameData"

export const gameConfig = {
	INPUT_ROWS: 6,
	INPUT_COLS: 5
}

export const initialGameData: GameData = {
	game: {
		userTries: Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill("")),
		word: "",
		finished: false,
		attempts: 0
	},
	lastWord: "",
	lastWordAttempts: 0,
	streak: 0
}
