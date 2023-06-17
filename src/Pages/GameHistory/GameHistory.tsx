import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined"
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
						<Grid item className='history__container__games' xs={6} sm={6} md={3} lg={2.4} xl={2}>
							<div className='history__container__single-game'>
								<div className='history__container__single-game__header'>
									<Avatar>S+</Avatar>
									<p>{gameFromHistory.game.word}yyy</p>
								</div>
								<div className='history__container__single-game__other-data'>
									<div className='history__container__single-game__tries'>
										<QuestionMarkOutlinedIcon />
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
