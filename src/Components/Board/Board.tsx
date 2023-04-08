// api link https://random-word-api.vercel.app/api?words=10&length=5

import { gameConfig } from "Config/gameConfig"
import { useEffect, useState } from "react"
import "./style/style.css"
const Board = () => {
	const [guess, setGuess] = useState([] as string[])

	const [checkedGuess, setCheckedGuess] = useState([] as boolean[])

	const [guesses, setGuesses] = useState(
		Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill(""))
	)

	const fetchWords = async () => {
		const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=${gameConfig.INPUT_COLS}`)
		const data = await response.json()
		console.log(data[0])
		// setGuess(data[0].split(""))
		setGuess("lumpy".split(""))
	}

	useEffect(() => {
		fetchWords()
	}, [])

	const checkUserGuess = (rowIndex: number) => {
		const userGuess = guesses[rowIndex]
		const comparedLetters = Array(gameConfig.INPUT_ROWS - 1).fill(undefined) as (undefined | "correct" | "wrongPlace" | "wrong")[]

		userGuess.map((letter, index) => {
			if (letter === guess[index]) comparedLetters[index] = "correct"
			else if (guess.includes(letter)) comparedLetters[index] = "wrongPlace"
			else comparedLetters[index] = "wrong"
		})

		comparedLetters.map((letter, index) => {
			const input = document.getElementById(`${rowIndex}-${index}`) as HTMLInputElement
			if (input == null) return
			if (letter == "correct") input.style.backgroundColor = "green"
			else if (letter == "wrongPlace") input.style.backgroundColor = "yellow"
			else input.style.backgroundColor = "red"
		})
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, colIndex: number, rowIndex: number) => {
		if (rowIndex > 0 && guesses[rowIndex - 1].join("").length < 5) return
		if (colIndex > 0 && guesses[rowIndex][colIndex - 1] === "") return
		const key = e.key
		let nextInput = undefined
		const newGuesses = [...guesses]

		if (/^[a-z]$/.test(key)) {
			newGuesses[rowIndex][colIndex] = key.toLowerCase()
			nextInput = document.getElementById(`${rowIndex}-${colIndex + 1}`) as HTMLInputElement
		} else if (key === "Backspace") {
			if (newGuesses[rowIndex][colIndex + 1] && newGuesses[rowIndex][colIndex + 1] !== "") return
			if (newGuesses[rowIndex][colIndex] === "") newGuesses[rowIndex][colIndex - 1] = ""

			newGuesses[rowIndex][colIndex] = ""
			nextInput = document.getElementById(`${rowIndex}-${colIndex - 1}`) as HTMLInputElement
		} else if (key === "Enter" && colIndex == gameConfig.INPUT_COLS - 1) {
			checkUserGuess(rowIndex)
		}

		setGuesses(newGuesses)

		nextInput && nextInput.focus()
	}

	return (
		<div className='board-container'>
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
