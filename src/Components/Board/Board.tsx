// api link https://random-word-api.vercel.app/api?words=10&length=5

import { Alert, Modal } from "@mui/material"
import { gameConfig } from "Config/gameConfig"
import { useEffect, useState } from "react"
import "./style/style.css"
const Board = () => {
	const [alertVisibility, setAlertVisibility] = useState(false)
	const [isGameFinished, setIsGameFinished] = useState(false)
	const [guess, setGuess] = useState([] as string[])
	const [guesses, setGuesses] = useState(
		Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill(""))
	)

	const fetchWords = async () => {
		const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=${gameConfig.INPUT_COLS}`)
		const data = await response.json()
		console.log(data[0])
		setGuess(data[0].split(""))
		// setGuess("lumpy".split(""))
	}

	useEffect(() => {
		fetchWords()
	}, [])

	const checkUserGuess = (rowIndex: number) => {
		const userGuess = guesses[rowIndex]
		const remainingLetters = [...guess]

		const comparedLetters = userGuess.map((letter, index) => {
			if (letter === remainingLetters[index]) {
				remainingLetters[index] = ""
				return "correct"
			} else {
				const remainingIndex = remainingLetters.indexOf(letter)
				if (remainingIndex !== -1) {
					remainingLetters[remainingIndex] = ""
					return "wrongPlace"
				} else {
					return "wrong"
				}
			}
		})

		comparedLetters.forEach((letter, index) => {
			const input = document.getElementById(`${rowIndex}-${index}`) as HTMLInputElement
			if (input == null) return
			if (letter == "correct") input.style.backgroundColor = "green"
			else if (letter == "wrongPlace") input.style.backgroundColor = "purple"
			else input.style.backgroundColor = "red"
		})

		if (comparedLetters.every((el) => el == "correct")) {
			setIsGameFinished(true)
			setAlertVisibility(true)
		}
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, colIndex: number, rowIndex: number) => {
		if (rowIndex > 0 && guesses[rowIndex - 1].join("").length < 5) return
		if (colIndex > 0 && guesses[rowIndex][colIndex - 1] === "") return
		let nextInput = undefined
		const newGuesses = [...guesses]

		if (/^[a-z]$/.test(e.key)) {
			newGuesses[rowIndex][colIndex] = e.key.toLowerCase()
			nextInput = document.getElementById(`${rowIndex}-${colIndex + 1}`) as HTMLInputElement
		} else if (e.key === "Backspace") {
			if (newGuesses[rowIndex][colIndex + 1] && newGuesses[rowIndex][colIndex + 1] !== "") return
			if (newGuesses[rowIndex][colIndex] === "") newGuesses[rowIndex][colIndex - 1] = ""

			newGuesses[rowIndex][colIndex] = ""
			nextInput = document.getElementById(`${rowIndex}-${colIndex - 1}`) as HTMLInputElement
		} else if (e.key === "Enter" && colIndex == gameConfig.INPUT_COLS - 1) {
			nextInput = document.getElementById(`${rowIndex + 1}-0`) as HTMLInputElement
			checkUserGuess(rowIndex)
		}

		setGuesses(newGuesses)

		nextInput && nextInput.focus()
	}

	return (
		<div className='board-container'>
			{isGameFinished && alertVisibility && (
				<Modal open={true} className='game-modal'>
					<Alert severity='success' closeText='close' className='game-modal__alert' onClose={() => {}}>
						Game finished!
					</Alert>
				</Modal>
			)}
			{guesses.map((row, rowIndex) => (
				<div className='board-row' key={rowIndex}>
					{row.map((col, colIndex) => (
						<input type='text' className='board-col' id={`${rowIndex}-${colIndex}`} key={`${rowIndex}-${colIndex}`} value={guesses[rowIndex][colIndex]} maxLength={1} onKeyDown={(e) => handleKeyDown(e, colIndex, rowIndex)} />
					))}
				</div>
			))}
		</div>
	)
}

export default Board
