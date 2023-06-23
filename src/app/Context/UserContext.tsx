"use client"
import * as React from "react";
import { ReactNode, createContext, useState } from "react";

const UserContext = createContext<UserContextType>({
    user: {
        first: "Satomi",
        last: "Ishihara",
        username: "Satomi86",
        email: "IshigamiKuniko@gmail.com",
        DOB: new Date(),
        pfp: "/imgs/blank-pfp.png",
        posts: [],
    },
    setUser: () => { }
})

export interface UserType {
    first: string
    last: string
    username: string
    email: string
    DOB: Date
    pfp: string
    posts: PostType[]
}

export interface PostType {
    time: string
    quote: string
    likes: number
}

interface UserContextType {
    user: UserType
    setUser: React.Dispatch<React.SetStateAction<UserType>>
}

interface IPropsUserProvider {
    children: ReactNode
}

const UserProvider = (props: IPropsUserProvider) => {

    const [currentUser, setCurrentUser] = useState<UserType>(
        {
            first: "Satomi",
            last: "Ishihara",
            username: "Satomi86",
            email: "IshigamiKuniko@gmail.com",
            DOB: new Date(),
            pfp: "/imgs/blank-pfp.png",
            posts: [],
        }
    );

    return (
        <UserContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };