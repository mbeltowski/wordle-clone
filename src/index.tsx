import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom/client"
import { themes } from "../src/Config/theme"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
const theme = themes.dark
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
			<CssBaseline />
		</ThemeProvider>
	</React.StrictMode>
)
