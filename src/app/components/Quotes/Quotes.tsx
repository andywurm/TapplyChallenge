import { UserContext } from "@/app/Context/UserContext";
import qstyles from "./Quotes.module.css";
import Image from "next/image";
import { useContext, useState } from "react";
import { Timestamp } from "firebase/firestore";

interface IPropsQuotes {
  username: string
  quote: string
  time: Timestamp
  likes: number
  id: string
}

const Quotes = (props: IPropsQuotes) => {

  let context = useContext(UserContext)
  const [canChange, setCanChange] = useState(props.username === context.user.username)
  console.log(props.username + " " + context.user.username)

  function deletePost() {
    console.log("delete")
  }

  function likePost() {
    console.log("like")
  }

  const editQuote = async () => {

  }

  let seconds = props.time.seconds
  let convertSec = seconds * 1000
  let d = new Date(convertSec)
  let time = d.toLocaleString().split(",")

  function editPost(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>

      <div className={qstyles.container}>

        <div className={qstyles.profileInfo}>

          <Image
            src='/imgs/blank-pfp.png'
            width={40} height={40} alt="" className={qstyles.pfp}
          />
          <div>
            <div className={qstyles.username}>@{context.user.username}</div>
            <div className={qstyles.time}>{time}</div>
          </div>

          {canChange ?
            <div className={qstyles.editBtn} onClick={() => editQuote()}>
              <div>Edit</div>
            </div>
            :
            <></>
          }

        </div>

        <div className={qstyles.quote}>&quot;{props.quote}&quot;</div>

        <div className={qstyles.postInfo}>

          <div className={qstyles.likeInfo} onClick={() => likePost()}>
            <Image src="/imgs/love.png" width={23} height={23} alt="" className={qstyles.likes} />
            &nbsp; {props.likes}
          </div>

          {canChange ?
            <div className={qstyles.change}>
              <div className={qstyles.delete} onClick={() => deletePost()}>
                <Image src="/imgs/trash.png" width={23} height={23} alt="" className={qstyles.deleteImg} />
              </div>
              <div className={qstyles.changeBtns} onClick={() => editPost()}>
                <Image src="/imgs/pencil.png" width={23} height={23} alt="" className={qstyles.deleteImg} />
              </div>
            </div>
            :
            <div className={qstyles.change} onClick={() => deletePost()}>
              <Image src="/imgs/bookmark.png" width={23} height={23} alt="" className={qstyles.deleteImg} />
            </div>
          }

        </div>

      </div>

    </div>
  );
};
export default Quotes;
