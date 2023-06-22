import { Dispatch, SetStateAction, useState } from "react";
import sustyles from "./SignUp.module.css";
import Image from "next/image";

interface IPropsSignUp{
    clicked: boolean
    setClicked: Dispatch<SetStateAction<boolean>>
}

const SignUp = (props: IPropsSignUp) => {

    const [first, setFirst] = useState("")
    const [last, setLast] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [DOB, setDOB] = useState(Date)

    function letsSignUp(){
        
    }

    return (
        <div>

            <div className={sustyles.logoContainer}>

                <div className={sustyles.logo}>

                    <div className={sustyles.logoImg}>
                        <Image src="/imgs/quotes.png" width={60} height={60} alt="" />
                    </div>

                    <div className={sustyles.brand}> QUOTED</div>

                </div>


                <div className={sustyles.fields}>First Name:</div>
                <input className={sustyles.inputs} value={first} onChange={(e) => setFirst(e.target.value)} />
                <div className={sustyles.fields}>Last Name:</div>
                <input className={sustyles.inputs} value={last} onChange={(e) => setLast(e.target.value)} />
                <div className={sustyles.fields}>Username:</div>
                <input className={sustyles.inputs} value={username} onChange={(e) => setUsername(e.target.value)} />
                <div className={sustyles.fields}>Email:</div>
                <input className={sustyles.inputs} value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className={sustyles.fields}>Password:</div>
                <input className={sustyles.inputs} value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className={sustyles.fields}>Date of Birth:</div>
                <input className={sustyles.inputs} value={DOB} type="date" onChange={(e) => setDOB(e.target.value)} />

                <div className={sustyles.logBtnContainer}>
                    <button className={sustyles.logBtn} onClick={() => letsSignUp()}>
                        Sign up
                    </button>
                </div>

                <div className={sustyles.signUp}>
                       Have an account?{" "}
                        <u onClick={() => props.setClicked(!props.clicked)}>Log in here</u>
                </div>
            </div>

        </div>
    );
};
export default SignUp;
