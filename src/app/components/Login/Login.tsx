import lstyles from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import SignUp from "../SignUp/SignUp";
import { UserContext } from "../../Context/UserContext";
import { db } from '../../firebase-config'
import { collection, getDocs } from "firebase/firestore"

const Login = () => {

    const [users, setUsers] = useState<any>([])
    const usersCollectionRef = collection(db, "users")
    let context = useContext(UserContext)

    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUsers()

    }, [usersCollectionRef])

    // console.log(...users)

    const [clicked, setClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function letsLogIn() {

        users.map((user: any) => {

            if (user.password === password && user.email === email) {
                context.setUser(user)
            }

        })

    }

    // console.log(users)

    return (
        <div>
            {clicked ? (
                <SignUp clicked={clicked} setClicked={setClicked} />
            ) : (
                <div className={lstyles.logoContainer}>

                    <div className={lstyles.logo}>
                        <div className={lstyles.logoImg}>
                            <img src="https://tapplychallenge.web.app/imgs/quotes.png" width={80} height={80} alt="" />
                        </div>
                        <div className={lstyles.brand}>QUOTED</div>
                    </div>

                    <div className={lstyles.inputs}>
                        Email:
                        <input
                            className={lstyles.email}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        Password:
                        <input
                            className={lstyles.password}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>

                    <div className={lstyles.logBtnContainer}>
                        <button className={lstyles.logBtn} onClick={() => letsLogIn()}>
                            Log in
                        </button>
                    </div>

                    <div className={lstyles.signUp}>
                        New to Quoted?{" "}
                        <u onClick={() => setClicked(!clicked)}>Sign up here</u>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Login;
