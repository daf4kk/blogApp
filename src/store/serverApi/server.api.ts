import { IBlog } from './../../types/serverModels';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IUser } from '../../types/serverModels';

export const serverApi = createApi({
    reducerPath: 'server/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    tagTypes: ['Users', 'Blogs'],
    endpoints: build => ({
        fetchUsers: build.query({
            query: () => ({
                url: 'users'
            }),
            providesTags: result => ['Users']
        }),
        fetchUser: build.query<IUser, string>({
            query: (search:string) => ({
                url: 'users',
                params: {
                    q: search,
                }
            }),
            transformResponse: (response:IUser[]) => response[0]
        }),
        pushUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        fetchBlogs: build.query<IBlog[], number>({
            query: (limit:number) => ({
                url: 'blogs',
                params: {
                    _limit: limit
                }

            }),
            providesTags: result => ['Blogs']
        }),
        fetchBlog: build.query<IBlog, string>({
            query: (search:string) => ({
                url: 'blogs',
                params: {
                    q: search
                }
            })
        }),
        removeBlog: build.mutation<IBlog, IBlog>({
            query: (blog: IBlog) => ({
                url: `blogs/${blog.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Blogs']
        })

        //<IUser[], string>
    })
})
export const {useFetchUsersQuery, useLazyFetchUserQuery, usePushUserMutation, useFetchBlogsQuery, useLazyFetchBlogQuery, useRemoveBlogMutation} = serverApi;