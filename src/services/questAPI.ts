import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJSONBinResponse } from "../types";
import { QuestsState } from "../redux/reducers/questsSlice";

const keys = {
	"X-Master-Key": "$2b$10$ou1eG5cCVElqaTRE0N33zeHeGocpZk0H0e0.5jO4GeIVd2vaN.5zq",
	"X-Access-Key": "$2b$10$Yet/6G1q6JkV8tA48ACv/OF/eXoS9XpX8uCCK1/38M3MjqcviVUz.",
};

export const questAPI = createApi({
	reducerPath: "questAPI",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.jsonbin.io/v3/b/6617cb85acd3cb34a836be82" }),
	endpoints: (build) => ({
		fetchAll: build.query<IJSONBinResponse, void>({
			query: () => ({
				url: "/latest",
				method: "GET",
				headers: {
					...keys,
				},
			}),
		}),
		update: build.mutation<IJSONBinResponse, QuestsState["regions"]>({
			query: (body) => ({
				url: "",
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					...keys,
				},
				body,
			}),
		}),
	}),
});
