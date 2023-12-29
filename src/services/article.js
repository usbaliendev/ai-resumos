import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const articleApi = createApi({
	reducerPath: "articleApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
		prepareHeaders: (headers) => {
			headers.set("X-RapidAPI-Key", rapidApiKey);
			headers.set(
				"X-RapidAPI-Host",
				"article-extractor-and-summarizer.p.rapidapi.com"
			);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getSummary: builder.query({
			// A função encodeURIComponent() codifica caracteres especiais que podem estar presentes nos valores dos parâmetros
			// Se não codificarmos corretamente esses caracteres, eles poderão ser mal interpretados pelo servidor e causar erros ou comportamento inesperado. Assim, aquele bug RTK
			query: (params) =>
				`summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
		}),
	}),
});

export const { useLazyGetSummaryQuery } = articleApi;
