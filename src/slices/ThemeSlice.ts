import { createAction, createSlice } from "@reduxjs/toolkit";
import { THEME_DARK, THEME_KEYWORD, THEME_LIGHT } from "src/constants";
import { setAll } from "src/helpers";

const MESSAGES_MAX_DISPLAY_DURATION = 60000;
let nb_messages = 0;

interface Message {
	id: number;
	title: string;
	text: string;
	severity: string;
	created: number;
	open: boolean;
}
interface MessagesState {
	theme: string
}

const initialState: MessagesState = {
	theme: localStorage.getItem(THEME_KEYWORD) ?? THEME_LIGHT
};

export const toggleTheme = createAction<{ theme: string }>('user/toggleTheme')

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		initTheme(state, action) {
			const theme = (localStorage.getItem(THEME_KEYWORD) ?? THEME_DARK) === THEME_DARK ? THEME_LIGHT : THEME_DARK;
			localStorage.setItem(THEME_KEYWORD, theme)
			document.documentElement.setAttribute('data-theme', theme)
			state.theme = action.payload.theme
		},
	},
	extraReducers: builder => builder.addCase(toggleTheme, (state, action) => {
		const theme = (localStorage.getItem(THEME_KEYWORD) ?? THEME_DARK) === THEME_DARK ? THEME_LIGHT : THEME_DARK;
		localStorage.setItem(THEME_KEYWORD, theme)
		document.documentElement.setAttribute('data-theme', theme)
		state.theme = theme
	})
});

export const { initTheme } = themeSlice.actions;

export default themeSlice.reducer;
