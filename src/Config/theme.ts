import { red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

const lightTheme = createTheme({
	palette: {
		primary: {
			main: "#ffffff"
		},
		secondary: {
			main: "#dedede"
		},
		error: {
			main: red.A400
		}
	}
})

const darkTheme = createTheme({
	typography: {
		fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif"
	},
	palette: {
		primary: {
			main: "#121213"
		},
		secondary: {
			main: "#252526"
		},
		error: {
			main: red.A400
		}
	}
})

export const themes = {
	light: lightTheme,
	dark: darkTheme
}
