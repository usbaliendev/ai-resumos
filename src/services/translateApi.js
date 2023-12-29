import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const googleApiKey = import.meta.env.GOOGLE_TRANSLATE_API_KEY;

export const translateApi = createApi({
	reducerPath: "translateApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://translation.googleapis.com",
		prepareHeaders: (headers) => {
			headers.set("Authorization", `Bearer ${googleApiKey}`);
			headers.set("Content-Type", "application/json");
			return headers;
		},
	}),
	endpoints: (builder) => ({
		translate: builder.mutation({
			query: ({ text, targetLanguage }) => ({
				url: "/language/translate/v2",
				method: "POST",
				body: {
					q: text,
					source: "en",
					target: targetLanguage,
					format: "text",
				},
			}),
		}),
	}),
});

export const { useTranslateMutation } = translateApi;
