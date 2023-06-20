import Header from "Components/Header/Header"
import Game from "Pages/Game/Game"
import GameHistory from "Pages/GameHistory/GameHistory"
import { Route, Routes } from "react-router"

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Game />} />
				<Route path='/leaderboard' element={<GameHistory />} />
			</Routes>
		</div>
	)
}

export default App
