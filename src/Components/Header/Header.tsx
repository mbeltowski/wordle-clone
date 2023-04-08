import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box, Typography } from "@mui/material"
import "./style/style.css"
const Header = () => {
	return (
		<Box className='header-container' sx={{ backgroundColor: "primary.main", color: "primary.contrastText", borderBottom: "1px solid", borderBottomColor: "secondary.main" }}>
			<Typography className='header-container__title' sx={{ fontSize: "1.8rem" }}>
				Wordle
			</Typography>
			<Box className='header-container__icon-box'>
				<QuestionMarkIcon />
				<LeaderboardIcon />
				<SettingsIcon />
			</Box>
		</Box>
	)
}

export default Header
