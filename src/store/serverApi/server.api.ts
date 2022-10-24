import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IUser } from '../../types/serverModels';

export const serverApi = createApi({
    reducerPath: 'server/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    tagTypes: ['Post'],
    endpoints: build => ({
        fetchUsers: build.query({
            query: () => ({
                url: 'users'
            }),
            providesTags: result => ['Post']
        }),
        fetchUser: build.query<IUser, string>({
            query: (search:string) => ({
                url: 'users',
                params: {
                    q: search
                }
            })
        }),
        pushUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Post']
        })

        //<IUser[], string>
    })
})
export const {useFetchUsersQuery, useLazyFetchUserQuery, usePushUserMutation} = serverApi;