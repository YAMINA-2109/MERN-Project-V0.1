import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// baseUrl: process.env.REACT_APP_BASE_URL
export const api = createApi({ 
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Rdv", "Allusers", "Transactions"],
    endpoints:(build)=>({
        getUser: build.query({
            query: () => `/api/users`,
            providesTags: ["User"],
        }),
        getRdv: build.query({
            query: ()=> `/api/rendezVous/rendezVous`,
            providesTags: ["Rdv"],
        }),
        getAllusers: build.query({
            query: ()=> `/api/users/getAllUsers`,
            providesTags: ["Allusers"],
        }),
        getTransactions: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url:"client/transactions",
                method: "GET",
                params: {page, pageSize, sort, search}
            }),
            providesTags: ["Transactions"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetRdvQuery,
    useGetAllusersQuery,
    useGetTransactionsQuery,
} = api