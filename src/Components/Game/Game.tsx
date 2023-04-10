import { Box } from "@mui/material"
import Board from "Components/Board/Board"
import Keyboard from "Components/Keyboard/Keyboard"
import GameData from "Config/Models/GameData"
import { useEffect, useState } from "react"
import "./style/style.css"

const Game = () => {
	const [gameData, setGameData] = useState<GameData>({
		game: {
			userTries: [],
			word: "",
			finished: false
		},
		lastWord: "",
		lastWordAttempts: 0,
		streak: 0
	})

	const loadGame = async () => {
		const storageData = await localStorage.getItem("gameData")
		if (storageData === null) return
		await setGameData(JSON.parse(storageData) as GameData)
	}

	useEffect(() => {
		loadGame()
	}, [])

	return (
		<Box className='game-container' sx={{ bgcolor: "primary.main", color: "white" }}>
			<Board data={gameData} />
			<Keyboard />
		</Box>
	)
}

export default Game
