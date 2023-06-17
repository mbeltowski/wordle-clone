import { Alert, Modal } from "@mui/material"
import GameData from "Config/Models/GameData"
import { gameConfig } from "Config/gameConfig"
import { useEffect, useState } from "react"
import "./style/style.css"

enum colors {
	"correct" = "green",
	"wrongPlace" = "purple",
	"wrong" = "red"
}

const Board = (props: any) => {
	const { data }: { data: GameData } = props
	const [alertVisibility, setAlertVisibility] = useState(false)
	const [isGameFinished, setIsGameFinished] = useState(false)
	const [guess, setGuess] = useState([] as string[])
	const [userGuesses, setUserGuesses] = useState(
		Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill(""))
	)

	const fetchWords = async () => {
		const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=${gameConfig.INPUT_COLS}`)
		const data = await response.json()
		setGuess(data[0].split(""))
	}

	const loadInputStyles = () => {
		userGuesses.map((word, wordIndex) => {
			const remainingLetters = [...guess]

			if (word.every((elem) => elem === "")) return

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

	const loadGame = () => {
		if (data !== null && data?.game?.word === "") {
			fetchWords()
		} else {
			setGuess(data.game?.word.split(""))
			setUserGuesses(data.game.userTries)
		}
	}

	useEffect(() => {
		loadGame()
	}, [])

	useEffect(() => {
		loadInputStyles()
	}, [guess])

	const checkUserGuess = (rowIndex: number) => {
		loadInputStyles()

		data.game.word = guess.join("")
		data.game.userTries = userGuesses

		if (guess.join("") === userGuesses[rowIndex].join("")) {
			setAlertVisibility(true)
			setIsGameFinished(true)
			data.game.finished = true
			data.lastWord = guess.join("")
			console.log(userGuesses, userGuesses.length)

			data.lastWordAttempts = userGuesses.filter((guess) => Array.isArray(guess) && guess.every((letter) => letter !== "")).length

			const historyDataJson = localStorage.getItem("gameHistory")
			const historyData: Array<object | any> = JSON.parse(historyDataJson || "[]") || []

			console.log(historyData)

			historyData.push(data)

			localStorage.setItem("gameHistory", JSON.stringify(historyData))
		}

		localStorage.setItem("gameData", JSON.stringify(data))
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, colIndex: number, rowIndex: number) => {
		if (rowIndex > 0 && userGuesses[rowIndex - 1].join("").length < 5) return
		if (colIndex > 0 && userGuesses[rowIndex][colIndex - 1] === "") return
		let nextInput = undefined
		const newuserGuesses = [...userGuesses]

		if (/^[a-z]$/.test(e.key)) {
			newuserGuesses[rowIndex][colIndex] = e.key.toLowerCase()
			nextInput = document.getElementById(`${rowIndex}-${colIndex + 1}`) as HTMLInputElement
		} else if (e.key === "Backspace") {
			if (newuserGuesses[rowIndex][colIndex + 1] && newuserGuesses[rowIndex][colIndex + 1] !== "") return
			if (newuserGuesses[rowIndex][colIndex] === "") newuserGuesses[rowIndex][colIndex - 1] = ""

			newuserGuesses[rowIndex][colIndex] = ""
			nextInput = document.getElementById(`${rowIndex}-${colIndex - 1}`) as HTMLInputElement
		} else if (e.key === "Enter" && colIndex == gameConfig.INPUT_COLS - 1) {
			nextInput = document.getElementById(`${rowIndex + 1}-0`) as HTMLInputElement
			checkUserGuess(rowIndex)
		}

		setUserGuesses(newuserGuesses)

		nextInput && nextInput.focus()
	}

	return (
		<div className='board__container'>
			{isGameFinished && alertVisibility && (
				<Modal open={true} className='game-modal'>
					<Alert severity='success' closeText='close' className='game-modal__alert' onClose={() => {}}>
						Game finished!
					</Alert>
				</Modal>
			)}
			{guess}
			{userGuesses.map((row, rowIndex) => (
				<div className='board__row' key={rowIndex}>
					{row.map((col, colIndex) => (
						// <p key={colIndex}>aa</p>
						<input type='text' className='board__col' id={`${rowIndex}-${colIndex}`} key={`${rowIndex}-${colIndex}`} value={userGuesses[rowIndex][colIndex]} maxLength={1} onKeyDown={(e) => handleKeyDown(e, colIndex, rowIndex)} />
					))}
				</div>
			))}
		</div>
	)
}

export default Board
