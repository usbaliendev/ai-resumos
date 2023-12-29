import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";
import { translateApi } from "./translateApi";

export const store = configureStore({
	reducer: {
		[articleApi.reducerPath]: articleApi.reducer,
		[translateApi.reducerPath]: translateApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(articleApi.middleware)
			.concat(translateApi.middleware),
});

// uma store e um global state que salva a informação inteira de uma app, mas na maioria dos casos não precisamos de tudo isso, então reduzimos a uma parte específica no caso *articleApi*
