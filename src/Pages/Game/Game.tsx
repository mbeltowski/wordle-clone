import { Box, CircularProgress } from "@mui/material"

import Board from "Components/Board/Board"
import GameData from "Config/Models/GameData"
import { initialGameData } from "Config/gameConfig"
import { useEffect, useState } from "react"
import "./style/style.css"

const Game = () => {
	const [gameData, setGameData] = useState<GameData>()

	useEffect(() => {
		const storageData = localStorage.getItem("gameData")

		if (storageData !== null) {
			setGameData(JSON.parse(storageData)!)
		} else {
			setGameData({ ...initialGameData })
		}
	}, [])

	return (
		<Box className='game-container' sx={{ bgcolor: "primary.main", color: "white" }}>
			{gameData === undefined ? <CircularProgress color='secondary' size={64} sx={{ marginTop: 20 }} /> : <Board data={gameData} />}

			{/* <Keyboard /> */}
		</Box>
	)
}

export default Game
