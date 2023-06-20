import { colors } from "Config/gameConfig"
import GameData from "Config/Models/GameData"

export const loadInputStyles = (gameData: GameData) => {
	const userGuesses = [...gameData.game.userTries]
	userGuesses.forEach((word, wordIndex) => {
		const remainingLetters = [...gameData.game.word.split("")]

		if (word.every((letter) => letter === "")) return

		word.forEach((letter, letterIndex) => {
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
