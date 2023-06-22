"use client";
import { useState } from "react";
import Quotes from "../Quotes/Quotes";
import dqstyles from "./DisplayQuote.module.css";
import Image from "next/image";

interface IPropsDisplayQuote {
  user: any;
}

const DisplayQuotes = (props: IPropsDisplayQuote) => {
  const [clicked, setClicked] = useState(false);
  const [newPost, setNewPost] = useState("");

  function postQuote() {

    setClicked(!clicked);

    if (newPost !== "") {
      console.log(newPost);
    }
    
  }

  return (
    <div className={dqstyles.homeContainer}>
      {clicked ? (
        <div className={dqstyles.inputArea1}>
          <div className={dqstyles.controls}>
            <div className={dqstyles.userInfo}>
              <Image
                src={props.user.pfp}
                width={40}
                height={40}
                alt=""
                className={dqstyles.pfp}
              />
              &nbsp; @{props.user.username}
            </div>

            <div className={dqstyles.postBtnCon}>
              <button className={dqstyles.postBtn} onClick={() => postQuote()}>
                Post
              </button>
            </div>
          </div>
          <textarea
            className={dqstyles.inputs}
            onChange={(e) => setNewPost(e.target.value)}
            value={newPost}
          ></textarea>
        </div>
      ) : (
        <div className={dqstyles.inputArea}>
          <Image
            src={props.user.pfp}
            width={40}
            height={40}
            alt=""
            className={dqstyles.pfp}
          />
          <div
            className={dqstyles.textArea}
            onClick={() => setClicked(!clicked)}
          >
            Type Your Quote Here!
          </div>
        </div>
      )}

      <div className={dqstyles.feed}>
        <div className={dqstyles.recentPosts}>Recent Posts</div>
        {/* <div>
            <Quotes/>
        </div> */}
      </div>
    </div>
  );
};
export default DisplayQuotes;
