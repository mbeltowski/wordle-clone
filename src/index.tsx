import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { themes } from "../src/Config/theme"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
const theme = themes.dark
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<App />
				<CssBaseline />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
)
