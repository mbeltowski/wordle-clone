import GameData from "./Models/GameData"

export const gameConfig = {
	INPUT_ROWS: 6,
	INPUT_COLS: 5
}
export const initialGameData: GameData = {
	game: {
		userTries: [],
		word: "",
		finished: false
	},
	lastWord: "",
	lastWordAttempts: 0,
	streak: 0
}
