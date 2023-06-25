"use client";
import { useContext, useEffect, useState } from "react";
import Quotes from "../Quotes/Quotes";
import dqstyles from "./DisplayQuote.module.css";
import Image from "next/image";
import { PostType, UserContext } from "@/app/Context/UserContext";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase-config'
import { collection, doc, getDocs, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"

const DisplayQuotes = () => {

  const [clicked, setClicked] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [feed, setFeed] = useState<any>([])

  let context = useContext(UserContext)
  const postCollectionRef = doc(db, "users", context.user.id)
  const listCollectionRef = doc(db, "quotelist", context.masterList)
  const feedCollectionRef = collection(db, "quotelist")

  useEffect(() => {

    const getFeed = async () => {

      const data = await getDocs(feedCollectionRef)
      setFeed(data.docs.map((doc) => ({ ...doc.data() })))

    }

    getFeed()

  }, [context.user, listCollectionRef])

  const postQuote = async () => {

    if (newPost !== "") {

      const createPost = {
        id: uuidv4(),
        username: context.user.username,
        likes: 0,
        quote: newPost,
        time: new Date(),
        pfp: context.user.pfp
      }

      await updateDoc(postCollectionRef, {
        posts: arrayUnion(createPost)
      });

      await updateDoc(listCollectionRef, {
        masterlist: arrayUnion(createPost)
      });

      context.setUser({
        ...context.user,
        posts:[...context.user.posts,{...createPost,
          time: Timestamp.fromDate(createPost.time)
        }]
      })


    }

    setNewPost("")
    setClicked(!clicked);

  }

  // console.log(feed[0])

  return (
    <div className={dqstyles.homeContainer}>
      {clicked ? (
        <div className={dqstyles.inputArea1}>
          <div className={dqstyles.controls}>

            <div className={dqstyles.userInfo}>
              <img src={context.user.pfp === "" ? 'https://tapplychallenge.web.app/imgs/blank-pfp.png' : context.user.pfp} width={40} height={40} alt="" className={dqstyles.pfp} />
              &nbsp; @{context.user.username}
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

          <img src={context.user.pfp === "" ? 'https://tapplychallenge.web.app/imgs/blank-pfp.png' : context.user.pfp} width={40} height={40} alt="" className={dqstyles.pfp} />

          <div className={dqstyles.textArea} onClick={() => setClicked(!clicked)}>
            Type Your Quote Here!
          </div>

        </div>
      )}

      <div className={dqstyles.feed}>
        <div className={dqstyles.recentPosts}>Recent Posts</div>
        {feed.length > 0 && feed[0].masterlist.toReversed().map((post: PostType) => {
          return (<Quotes key={post.id} username={post.username} quote={post.quote} time={post.time} likes={post.likes} id={post.id} pfp={post.pfp} />)
        })}
      </div>
    </div>
  );
};
export default DisplayQuotes;
