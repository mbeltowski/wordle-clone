import { Alert, AlertTitle, Box, Button, CircularProgress, Modal, Typography } from "@mui/material"
import GameData from "Config/Models/GameData"
import { gameConfig, initialGameData } from "Config/gameConfig"
import { useLocalStorage } from "Hooks/useLocalStorage"
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
	const [isGameLoaded, setIsGameLoaded] = useState(false)
	const [gameData, setGameData] = useLocalStorage<GameData>("gameData", { ...initialGameData })

	const fetchWords = async () => {
		// console.log({ ...initialGameData })
		const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=${gameConfig.INPUT_COLS}`)
		const fetchedData = await response.json()
		// console.log("fetched data", fetchedData)
		const newGameData: GameData = { ...gameData }

		newGameData.game = { ...initialGameData.game }
		newGameData.game.userTries = Array(gameConfig.INPUT_ROWS)
			.fill("")
			.map(() => Array(gameConfig.INPUT_COLS).fill(""))
		// console.log("igd", initialGameData)
		newGameData.game.word = fetchedData[0]
		setIsGameLoaded(true)
		setGameData(newGameData)
		console.log(typeof gameData.game.userTries)
		// console.log("ngd", newGameData)
	}

	const restartGame = () => {
		loadGame(true)

		const userGuesses = [...gameData.game.userTries]
		userGuesses.map((word, wordIndex) => {
			word.map((letter, letterIndex) => {
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

	const loadInputStyles = () => {
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

	const loadGame = (forced: boolean) => {
		if (forced || (data !== null && (data?.game?.word === "" || data.game.finished))) {
			setIsGameLoaded(false)
			fetchWords()
		} else {
			const newGameData = { ...gameData }
			newGameData.game.word = data.game.word
			newGameData.game.userTries = data.game.userTries
			setGameData(newGameData)
			setIsGameLoaded(true)
		}
	}

	useEffect(() => {
		loadGame(false)
	}, [])

	useEffect(() => {
		if (isGameLoaded) loadInputStyles()
	}, [gameData.game.word, isGameLoaded])

	const checkUserGuess = (rowIndex: number) => {
		loadInputStyles()
		const newGameData = { ...gameData }
		newGameData.game.attempts = newGameData.game.attempts + 1
		const userGuesses = [...gameData.game.userTries]
		if (gameData.game.word === userGuesses[rowIndex].join("")) {
			setAlertVisibility(true)
			setIsGameFinished(true)
			newGameData.game.finished = true
			newGameData.lastWord = gameData.game.word
			newGameData.lastWordAttempts = newGameData.game.attempts
			const historyDataJson = localStorage.getItem("gameHistory")
			const historyData: Array<object | any> = JSON.parse(historyDataJson || "[]") || []

			historyData.push(gameData)
			localStorage.setItem("gameHistory", JSON.stringify(historyData))
		}
		setGameData(newGameData)

		localStorage.setItem("gameData", JSON.stringify(data))
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
		} else if (e.key === "Enter" && colIndex == gameConfig.INPUT_COLS - 1) {
			nextInput = document.getElementById(`${rowIndex + 1}-0`) as HTMLInputElement
			checkUserGuess(rowIndex)
		}

		const newGameData = { ...gameData }
		newGameData.game.userTries = [...userGuesses]
		setGameData(newGameData)

		nextInput?.focus()
	}

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
			{isGameFinished && (
				<Modal open={alertVisibility} className='game-modal'>
					<Alert
						severity='success'
						closeText='I will pass...'
						className='game-modal__alert'
						onClose={() => {
							setAlertVisibility(false)
						}}
					>
						<AlertTitle sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>Game finished!</AlertTitle>
						<Typography>Do you want to start new game?</Typography>
						<Box className='game-modal__alert__buttons'>
							<Button
								variant='contained'
								color='success'
								onClick={() => {
									setAlertVisibility(false)
									loadGame(true)
								}}
							>
								Let's wordle!
							</Button>
							<Button
								variant='outlined'
								color='error'
								onClick={() => {
									setAlertVisibility(false)
								}}
							>
								I will pass...
							</Button>
						</Box>
					</Alert>
				</Modal>
			)}

			{/* {"a"} */}
			{isGameLoaded ? (
				<>
					{gameData.game.word}
					{gameData.game.userTries.map((row, rowIndex) => (
						<div className='board__row' key={rowIndex}>
							{row.map((col, colIndex) => (
								<>
									{/* <p key={colIndex}>aa</p> */}
									<input
										type='text'
										className='board__col'
										id={`${rowIndex}-${colIndex}`}
										key={`${rowIndex}-${colIndex}`}
										value={gameData.game.userTries[rowIndex][colIndex]}
										maxLength={1}
										onKeyDown={(e) => handleKeyDown(e, colIndex, rowIndex)}
									/>
								</>
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
