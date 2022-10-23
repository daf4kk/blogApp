import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IUser } from '../../types/serverModels';

export const serverApi = createApi({
    reducerPath: 'server/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    endpoints: build => ({
        fetchUsers: build.query({
            query: () => ({
                url: 'users'
            })
        }),
        fetchUser: build.query<IUser[], string>({
            query: (search:string) => ({
                url: 'users',
                params: {
                    q: search
                }
            })
        })

        //<IUser[], string>
    })
})
export const {useFetchUsersQuery, useFetchUserQuery} = serverApi;