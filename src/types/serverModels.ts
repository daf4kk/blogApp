export interface IUser{
    id: number,
    email: string,
    name: string,
    password: string,
    blogs: string[]
}
export interface IBlog{
    id: string,
    imgUrl: string,
    title: string,
    body: string
}