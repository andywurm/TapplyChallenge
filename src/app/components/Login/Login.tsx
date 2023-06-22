import Image from "next/image";
import lstyles from "./Login.module.css";
import { useState } from "react";
import SignUp from "../SignUp/SignUp";

const Login = () => {

    const [clicked, setClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function letsLogIn() {
        console.log(email + " " + password);
    }

    return (
        <div>
            {clicked ? (
                <SignUp clicked={clicked} setClicked={setClicked}/>
            ) : (
                <div className={lstyles.logoContainer}>

                    <div className={lstyles.logo}>
                        <div className={lstyles.logoImg}>
                            <Image src="/imgs/quotes.png" width={80} height={80} alt="" />
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
                        />
                        Password:
                        <input
                            className={lstyles.password}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
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
