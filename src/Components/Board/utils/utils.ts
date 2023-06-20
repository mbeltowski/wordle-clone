import { colors } from "Config/gameConfig"
import GameData from "Config/Models/GameData"

export const loadInputStyles = (gameData: GameData) => {
	const userGuesses = [...gameData.game.userTries]
	userGuesses.map((word, wordIndex) => {
		const remainingLetters = [...gameData.game.word.split("")]

		if (word.every((letter) => letter === "")) return

		word.map((letter, letterIndex) => {
			const input = document.getElementById(`${wordIndex}-${letterIndex}`)!
			if (letter === remainingLetters[letterIndex]) {
				remainingLetters[letterIndex] = ""
				input.style.backgroundColor = colors.correct
			} else {
				const remainingIndex = remainingLetters.indexOf(letter)
				if (remainingIndex !== -1) {
					remainingLetters[remainingIndex] = ""
					input.style.backgroundColor = colors.wrongPlace
				} else {
					input.style.backgroundColor = colors.wrong
				}
			}
		})
	})
}

// export const calculateFinishedGameScore = (gameData: GameData) => {
// 	//	5 literowe słowo
// 	//	Liczba prób
// 	//	Jak szybko gracz zgadnął odpowiednią literę

// 	const points = 0

// 	const { userTries, word } = gameData.game
// 	const correctLetters: Array<Array<boolean>> = []
// 	let guessedTryIndex = 0

// 	userTries.map((guess, guessIndex) => {
// 		const guessCorrectTries: boolean[] = []
// 		if (guess.join("") === word) guessedTryIndex = guessIndex + 1
// 		guess.map((letter, letterIndex) => {
// 			if (letter === word[letterIndex]) {
// 				guessCorrectTries.push(true)
// 			} else {
// 				guessCorrectTries.push(false)
// 			}
// 		})
// 		correctLetters.push(guessCorrectTries)
// 	})
// 	return { correctLetters, guessedTryIndex }
// }
