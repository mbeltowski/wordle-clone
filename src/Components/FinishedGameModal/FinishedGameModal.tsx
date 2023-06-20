import { Alert, AlertTitle, Box, Button, Modal, Typography } from "@mui/material"

type ModalProps = {
	alertVisibility: boolean
	setAlertVisibility: (t: boolean) => void
	loadGame: (t: boolean) => void
}

const FinishedGameModal = (props: ModalProps) => {
	const { alertVisibility, setAlertVisibility, loadGame } = props

	return (
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
	)
}

export default FinishedGameModal
