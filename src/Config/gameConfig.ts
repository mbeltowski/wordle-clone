import GameData from "./Models/GameData"

export const gameConfig = {
	INPUT_ROWS: 6,
	INPUT_COLS: 5,
	API_LINK: "https://random-word-api.vercel.app/api?words=1&length="
}

export const initialGameData: GameData = {
	game: {
		userTries: Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill("")),
		word: "",
		finished: false,
		attempts: 0,
		finishDate: null
	},
	lastWord: "",
	lastWordAttempts: 0,
	streak: 0
}

export enum colors {
	"correct" = "green",
	"wrongPlace" = "purple",
	"wrong" = "red"
}
