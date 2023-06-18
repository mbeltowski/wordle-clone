import EventIcon from "@mui/icons-material/Event"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import { Avatar, Box, Grid } from "@mui/material"
import GamesHistory from "Config/Models/GamesHistory"
import { useEffect, useState } from "react"
import "./style/style.css"
const GameHistory = () => {
	const [history, setHistory] = useState<GamesHistory>([])

	const getGameHistory = () => {
		const gameHistoryData = localStorage.getItem("gameHistory") || "[]"

		const game: GamesHistory = JSON.parse(gameHistoryData)

		setHistory(game)

		console.log("aaa", game[1])
	}

	useEffect(() => {
		getGameHistory()
	}, [])

	return (
		<Box className='history__container' sx={{ bgcolor: "primary.main", color: "white" }}>
			<Grid item container spacing={2} columnSpacing={{ xs: 2, sm: 6, md: 1 }}>
				{history.length > 0 &&
					history.map((gameFromHistory) => (
						<Grid item className='history__container__games' xs={12} sm={6} md={4} lg={3} xl={2}>
							<div className='history__container__single-game'>
								<div className='history__container__single-game__header'>
									<Avatar>S</Avatar>
									<p>{gameFromHistory.game.word}</p>
									<div className='history__container__single-game__header__game-state'>win!</div>
								</div>
								<div className='history__container__single-game__other-data'>
									<div className='history__container__single-game__date' title='Game date'>
										<EventIcon sx={{ fontSize: 22 }} />
										12.08.2023
									</div>
									<div className='history__container__single-game__tries' title='Number of tries'>
										<RestartAltIcon sx={{ fontSize: 22 }} />
										{gameFromHistory.lastWordAttempts}
									</div>
								</div>
							</div>
						</Grid>
					))}
			</Grid>
		</Box>
	)
}

export default GameHistory
