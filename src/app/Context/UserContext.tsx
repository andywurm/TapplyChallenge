"use client"
import { Timestamp } from "firebase/firestore";
import * as React from "react";
import { ReactNode, createContext, useState } from "react";

const UserContext = createContext<UserContextType>({
    user: {
        id: "",
        first: "",
        last: "",
        username: "",
        email: "",
        password: "",
        pfp: "",
        posts: [],
    },
    setUser: () => { },
    masterList: ""
})

export interface UserType {
    id: string
    first: string
    last: string
    username: string
    email: string
    pfp: string
    password: string
    posts: PostType[]
}

export interface PostType {
    id: string
    time: Timestamp
    quote: string
    likes: number
    username: string
}

interface UserContextType {
    user: UserType
    setUser: React.Dispatch<React.SetStateAction<UserType>>
    masterList: string
}

interface IPropsUserProvider {
    children: ReactNode
}

const UserProvider = (props: IPropsUserProvider) => {

    const [currentUser, setCurrentUser] = useState<UserType>(
        {
            id: "",
            first: "",
            last: "",
            username: "",
            email: "",
            password: "",
            pfp: "",
            posts: [],
        }
    );

    const masterList = "2gIBGpf3f5xmr9JFY2o4"

    return (
        <UserContext.Provider value={{ user: currentUser, setUser: setCurrentUser, masterList: masterList, }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };