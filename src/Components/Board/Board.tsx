import { Button, CircularProgress } from "@mui/material"
import FinishedGameModal from "Components/FinishedGameModal/FinishedGameModal"
import GameData from "Config/Models/GameData"
import { gameConfig, initialGameData } from "Config/gameConfig"
import { useLocalStorage } from "Hooks/useLocalStorage"
import { useEffect, useState } from "react"
import "./style/style.css"
import { loadInputStyles } from "./utils/utils"

const Board = (props: any) => {
	// const { data }: { data: GameData } = props
	const [alertVisibility, setAlertVisibility] = useState<boolean>(false)
	const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
	const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false)

	const [gameData, setGameData] = useLocalStorage<GameData>("gameData", { ...initialGameData })

	const fetchWords = async () => {
		const response = await fetch(`${gameConfig.API_LINK}${gameConfig.INPUT_COLS}`)
		const fetchedData = await response.json()
		const newGameData: GameData = { ...gameData }

		newGameData.game = { ...initialGameData.game }
		newGameData.game.userTries = Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill(""))
		newGameData.game.word = fetchedData[0]

		setIsGameLoaded(true)
		setGameData(newGameData)
	}

	const loadGame = (forced: boolean) => {
		if (forced) {
			setIsGameLoaded(false)
			fetchWords()
			return
		}
		setIsGameLoaded(true)
	}

	const restartGame = () => {
		loadGame(true)

		const userGuesses = [...gameData.game.userTries]
		userGuesses.forEach((word, wordIndex) => {
			word.forEach((letter, letterIndex) => {
				const input = document.getElementById(`${wordIndex}-${letterIndex}`)!
				// input.innerHTML = ""
				if (input !== null) input.style.backgroundColor = ""
			})
		})
		const firstInput = document.getElementById("0-0")
		if (firstInput instanceof HTMLElement) {
			firstInput.focus()
		}
	}

	const checkUserGuess = (rowIndex: number) => {
		loadInputStyles(gameData)

		const newGameData = { ...gameData }

		newGameData.game.attempts = newGameData.game.attempts + 1

		const userGuesses = [...gameData.game.userTries]

		if (gameData.game.word === userGuesses[rowIndex].join("")) {
			setAlertVisibility(true)
			setIsGameFinished(true)

			newGameData.game.finished = true
			newGameData.game.finishDate = new Date()
			newGameData.lastWord = gameData.game.word
			newGameData.lastWordAttempts = newGameData.game.attempts
			newGameData.streak = newGameData.streak + 1

			const historyDataJson = localStorage.getItem("gameHistory")
			const historyData: Array<object | any> = JSON.parse(historyDataJson || "[]") || []

			historyData.push(newGameData)
			localStorage.setItem("gameHistory", JSON.stringify(historyData))
		}

		setGameData({ ...newGameData })
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, colIndex: number, rowIndex: number) => {
		const userGuesses = [...gameData.game.userTries]

		if (rowIndex > 0 && userGuesses[rowIndex - 1].join("").length < 5) return
		if (colIndex > 0 && userGuesses[rowIndex][colIndex - 1] === "") return
		if (gameData.game.finished === true) return
		let nextInput = undefined

		if (/^[a-z]$/.test(e.key)) {
			userGuesses[rowIndex][colIndex] = e.key.toLowerCase()
			nextInput = document.getElementById(`${rowIndex}-${colIndex + 1}`) as HTMLInputElement
		} else if (e.key === "Backspace") {
			if (userGuesses[rowIndex][colIndex + 1] && userGuesses[rowIndex][colIndex + 1] !== "") return
			if (userGuesses[rowIndex][colIndex] === "") userGuesses[rowIndex][colIndex - 1] = ""

			userGuesses[rowIndex][colIndex] = ""
			nextInput = document.getElementById(`${rowIndex}-${colIndex - 1}`) as HTMLInputElement
		} else if (e.key === "Enter" && userGuesses[rowIndex][colIndex] !== "" && colIndex === gameConfig.INPUT_COLS - 1) {
			document.getElementById(`${rowIndex + 1}-0`)?.focus()
			checkUserGuess(rowIndex)
			return
		}

		const newGameData = { ...gameData }
		newGameData.game.userTries = [...userGuesses]
		setGameData(newGameData)

		nextInput?.focus()
	}

	useEffect(() => {
		loadGame(false)
	}, [])

	useEffect(() => {
		if (isGameLoaded) loadInputStyles(gameData)
	}, [gameData.game.word, isGameLoaded])

	return (
		<div className='board__container'>
			<Button
				sx={{ color: "white" }}
				onClick={() => {
					restartGame()
				}}
			>
				Reset
			</Button>
			{isGameFinished && <FinishedGameModal alertVisibility={alertVisibility} setAlertVisibility={setAlertVisibility} loadGame={loadGame} />}

			{isGameLoaded ? (
				<>
					{gameData.game.word}
					{gameData.game.userTries.map((row, rowIndex) => (
						<div className='board__row' key={rowIndex}>
							{row.map((col, colIndex) => (
								<input
									type='text'
									className='board__col'
									id={`${rowIndex}-${colIndex}`}
									key={`${rowIndex}-${colIndex}`}
									value={gameData.game.userTries[rowIndex][colIndex]}
									maxLength={1}
									onChange={() => {}}
									onKeyDown={(e) => handleKeyDown(e, colIndex, rowIndex)}
								/>
							))}
						</div>
					))}
				</>
			) : (
				<CircularProgress color='secondary' size={64} sx={{ marginTop: 20 }} />
			)}
		</div>
	)
}

export default Board
