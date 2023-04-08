import { Box } from "@mui/material"
import Board from "Components/Board/Board"
import Keyboard from "Components/Keyboard/Keyboard"
import "./style/style.css"
const Game = () => {
	return (
		<Box className='game-container' sx={{ bgcolor: "primary.main", color: "white" }}>
			<Board />
			<Keyboard />
		</Box>
	)
}

export default Game
