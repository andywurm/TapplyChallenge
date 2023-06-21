import qstyles from "./Quotes.module.css";
import Image from "next/image";

interface IPropsQuotes {
  user: any;
  post: any;
}

const Quotes = (props: IPropsQuotes) => {

  function deletePost() {
    console.log("delete")
  }

  function likePost() {
    console.log("like")
  }

  return (
    <div>
      <div className={qstyles.container}>
        <div className={qstyles.profileInfo}>
          <Image
            src={props.user.pfp}
            width={40}
            height={40}
            alt=""
            className={qstyles.pfp}
          />
          <div>
            <div className={qstyles.username}>@{props.user.username}</div>
            <div className={qstyles.time}>{props.post.time}</div>
          </div>
        </div>

        <div className={qstyles.quote}>&quot;{props.post.quote}&quot;</div>

        <div className={qstyles.postInfo}>
            <div className={qstyles.likeInfo} onClick={() => likePost()}><Image
            src="/imgs/love.png"
            width={23}
            height={23}
            alt=""
            className={qstyles.likes}
          /> &nbsp; {props.post.likes}</div>

          <div className={qstyles.delete} onClick={() => deletePost()}><Image
            src="/imgs/trash.png"
            width={23}
            height={23}
            alt=""
            className={qstyles.deleteImg}
          /></div>
        </div>
      </div>
    </div>
  );
};
export default Quotes;
