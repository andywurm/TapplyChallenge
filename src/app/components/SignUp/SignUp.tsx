import { useState } from "react";
import sustyles from "./SignUp.module.css";
import Image from "next/image";

const SignUp = () => {

    const [first, setFirst] = useState("")
    const [last, setLast] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [DOB, setDOB] = useState(Date)

    return (
        <div>

            <div className={sustyles.logoContainer}>

                <div className={sustyles.logo}>

                    <div className={sustyles.logoImg}>
                        <Image src="/imgs/quotes.png" width={80} height={80} alt="" />
                    </div>

                    <div className={sustyles.brand}>&nbsp; QUOTED</div>

                </div>

                
                <div></div>
                <input value={first} onChange={(e) => setFirst(e.target.value)} />
                <div></div>
                <input value={last} onChange={(e) => setLast(e.target.value)} />
                <div></div>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
                <div></div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
                <div></div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
                <div></div>
                <input value={DOB} type="date" onChange={(e) => setDOB(e.target.value)} />

            </div>

        </div>
    );
};
export default SignUp;
