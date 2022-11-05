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
        updateUser: build.mutation<IUser, IUser>({  //1 аргумент - который мы ожидаем, второй тип - который мы отправим на сервер   //ENDPOINT
            query: (user) => ({
                url: `/posts/${user.id}`,   //id поста который мы хотим ОБНОВИТЬ в url
                method: 'PUT', //При обновлений данных
                body: user
            }),
              //Указываем что этот метод (createPost query) обеспечивает доставку данных (вообще можно обойтись обычным refetch() в компоненте)
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
            query: (limit:number = 9) => ({
                url: 'blogs',
                params: {
                    _limit: limit
                }

            }),
            providesTags: result => ['Blogs']
        }),
        updatePost: build.mutation<IBlog, IBlog>({  //1 аргумент - который мы ожидаем, второй тип - который мы отправим на сервер   //ENDPOINT
            query: (blog) => ({
                url: `/posts/${blog.id}`,   //id поста который мы хотим ОБНОВИТЬ в url
                method: 'PUT', //При обновлений данных
                body: blog
            }),
              //Указываем что этот метод (createPost query) обеспечивает доставку данных (вообще можно обойтись обычным refetch() в компоненте)
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
export const {useFetchUsersQuery, useLazyFetchUserQuery, usePushUserMutation, useFetchBlogsQuery, useLazyFetchBlogQuery, useRemoveBlogMutation, useUpdatePostMutation, useUpdateUserMutation} = serverApi;