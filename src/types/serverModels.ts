export interface IUser{
    id?: number,
    email: string,
    name: string,
    password: string,
    blogs: string[] | [],
    favouriteBlogs: string[] | []
} 
export interface IBlog{
    id: number,
    blogId: string,
    ownerId: number,
    imgId: string,
    theme: string,
    date: string,
    readTime: number,
    title: string,
    body: string
}