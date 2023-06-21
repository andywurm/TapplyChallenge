import dqstyles from "./DisplayQuote.module.css";

interface IPropsDisplayQuote{
    user: any
}

const DisplayQuotes = (props: IPropsDisplayQuote) => {
    return(
        <div className={dqstyles.homeContainer}>Welcome, {props.user.first}</div>
    )
}
export default DisplayQuotes