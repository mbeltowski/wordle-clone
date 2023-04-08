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
		setGuess(data[0].split(""))
	}

	useEffect(() => {
		fetchWords()
	}, [])

	const checkUserGuess = (rowIndex: number) => {
		const userGuess = guesses[rowIndex]
		const comparedLetters = Array(gameConfig.INPUT_ROWS - 1).fill(undefined) as (undefined | "correct" | "wrongPlace" | "wrong")[]
		console.log(comparedLetters)
		userGuess.map((userLetter, userIndex) => {
			if (comparedLetters[userIndex] == undefined) {
				guess.map((guessLetter, guessIndex) => {
					console.log(userIndex, userLetter, guessLetter, guessIndex)
					if (userLetter == guessLetter) {
						if (userIndex == guessIndex) comparedLetters[userIndex] = "correct"
						else comparedLetters[userIndex] = "wrongPlace"
					} else {
						comparedLetters[userIndex] = "wrong"
					}
				})
			}
		})

		console.log(comparedLetters)

		comparedLetters.map((letter, index) => {
			// console.log(`${rowIndex}-${index}`)
			const input = document.getElementById(`${rowIndex}-${index}`) as HTMLInputElement
			if (input == null) return
			if (letter == "correct") input.style.backgroundColor = "green"
			else if (letter == "wrongPlace") input.style.backgroundColor = "yellow"
			else input.style.backgroundColor = "red"
		})
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, colIndex: number, rowIndex: number) => {
		const key = e.key
		let nextInput = undefined
		const newGuesses = [...guesses]
		console.log(colIndex, rowIndex)
		if (/^[a-z]$/.test(key)) {
			newGuesses[rowIndex][colIndex] = key.toLowerCase()
			nextInput = document.getElementById(`${rowIndex}-${colIndex + 1}`) as HTMLInputElement
		} else if (key === "Backspace") {
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
