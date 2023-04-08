// api link https://random-word-api.vercel.app/api?words=10&length=5

import { gameConfig } from "Config/gameConfig"
import { useState } from "react"
import "./style/style.css"
const Board = () => {
	const [guesses, setGuesses] = useState(
		Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill(""))
	)

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, colIndex: number, rowIndex: number) => {
		console.log(e)
		const key = e.key
		const newGuesses = [...guesses]
		if (/^[a-z]$/.test(key)) {
			newGuesses[rowIndex][colIndex] = key
		} else if (key === "Backspace") {
			newGuesses[rowIndex][colIndex] = ""
		}
		setGuesses(newGuesses)

		const nextInput = document.getElementById(`${rowIndex}-${colIndex + 1}`) as HTMLInputElement
		if (nextInput) {
			nextInput.focus()
		}
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
