import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api-recipes-by-sam.vercel.app/`
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/products`,
            providesTags: ["Products"]
        }),
        getProduct: builder.query({
            query: (idProduct) => `/products/${idProduct}`,
            providesTags: ["Product"]
        }),
        getReviews: builder.query({
            query: (idProduct) => `/products/${idProduct}/reviews`,
            providesTags: ["Reviews"]
        }),
        getProductStadistics: builder.query({
            query: () => `/products/reviews/stadistic`,
            providesTags: ["ProductStadistics"]
        }),
        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: `/products`,
                method: "POST",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        }),
        createReview: builder.mutation({
            query: (newComment) => ({
                url: `/products/${newComment.idProduct}/reviews`,
                method: "POST",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: newComment
            }),
            invalidatesTags: ["Reviews"]
        }),
        createSession: builder.mutation({
            query: (data) => ({
                url: `/api/session`,
                method: "POST",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: data
            }),
            invalidatesTags: ["Reviews"]
        }),
        createAccount: builder.mutation({
            query: (data) => ({
                url: `/api/account`,
                method: "POST",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: data
            }),
            invalidatesTags: ["Reviews"]
        }),
        updateProduct: builder.mutation({
            query: ({ idProduct, formData }) => ({
                url: `/products/${idProduct}`,
                method: "PUT",
                headers: { 'auth-token': localStorage.getItem('token') },
                body: formData
            }),
            invalidatesTags: ["Products", "Product"]
        }),
        deleteProduct: builder.mutation({
            query: (idProduct) => ({
                url: `/products/${idProduct}`,
                method: "DELETE",
                headers: { 'auth-token': localStorage.getItem('token') },
            }),
            invalidatesTags: ["Products"]
        })
    })
});

export const { useGetProductsQuery, useGetProductQuery, useGetReviewsQuery, useGetProductStadisticsQuery, useCreateProductMutation, useCreateReviewMutation, useCreateSessionMutation, useCreateAccountMutation, useUpdateProductMutation, useDeleteProductMutation } = apiSlice;