import { UserContext } from "@/app/Context/UserContext";
import qstyles from "./Quotes.module.css";
import Image from "next/image";
import { useContext, useState } from "react";
import { Timestamp, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase-config";
import { v4 as uuidv4 } from 'uuid';

interface IPropsQuotes {
  username: string
  quote: string
  time: Timestamp
  likes: number
  id: string
  pfp: string
}

const Quotes = (props: IPropsQuotes) => {

  let context = useContext(UserContext)
  const [canChange, setCanChange] = useState(props.username === context.user.username)
  const [canEdit, setCanEdit] = useState(false)
  const [newPost, setNewPost] = useState("")
  const userRef = doc(db, 'users', context.user.id);
  const quoteRef = doc(db, 'quotelist', context.masterList);

  const deletePost = async () => {

    await updateDoc(userRef, {
      posts: arrayRemove(props)
    });

    await updateDoc(quoteRef, {
      masterlist: arrayRemove(props)
    });

    context.setUser({
    ...context.user,
    posts: context.user.posts.filter((i) => i.id !== props.id)
    })

  }

  const likePost = () => {
    console.log("like")
  }

  const updatePost = async () => {

    if (newPost !== "") {

      const createPost = {
        id: props.id,
        username: props.username,
        likes: props.likes,
        quote: newPost,
        time: props.time,
        pfp: context.user.pfp
      }

      await updateDoc(userRef, {
        posts: arrayRemove(props)
      });
  
      await updateDoc(quoteRef, {
        masterlist: arrayRemove(props)
      });

      await updateDoc(userRef, {
        posts: arrayUnion(createPost)
      });
  
      await updateDoc(quoteRef, {
        masterlist: arrayUnion(createPost)
      });

    }

    setNewPost("")
    setCanEdit(!canEdit)

  }

  let seconds = props.time.seconds
  let convertSec = seconds * 1000
  let d = new Date(convertSec)
  let time = d.toLocaleString().split(",")

  return (
    <div>
      {!canEdit ?
        <div className={qstyles.container}>

          <div className={qstyles.profileInfo}>

            <Image
              src={props.pfp === "" ? '/imgs/blank-pfp.png' : props.pfp}
              width={40} height={40} alt="" className={qstyles.pfp}
            />
            <div>
              <div className={qstyles.username}>@{props.username}</div>
              <div className={qstyles.time}>{time[0]}</div>
            </div>

          </div>

          <div className={qstyles.quote}>&quot;{props.quote}&quot;</div>

          <div className={qstyles.postInfo}>

            <div className={qstyles.likeInfo} onClick={() => likePost()}>
              <Image src="/imgs/love.png" width={23} height={23} alt="" className={qstyles.likes} />
              &nbsp; {props.likes}
            </div>

            {canChange ?
              <div className={qstyles.change}>
                <div className={qstyles.changeBtns} onClick={() => setCanEdit(!canEdit)}>
                  <Image src="/imgs/pencil.png" width={23} height={23} alt="" className={qstyles.deleteImg} />
                </div>
                <div className={qstyles.delete} onClick={() => deletePost()}>
                  <Image src="/imgs/trash.png" width={23} height={23} alt="" className={qstyles.deleteImg} />
                </div>
              </div>
              :
              <div className={qstyles.change} onClick={() => deletePost()}>
                <Image src="/imgs/bookmark.png" width={23} height={23} alt="" className={qstyles.deleteImg} />
              </div>
            }

          </div>

        </div> :

        <div className={qstyles.container}>

          <div className={qstyles.profileInfo}>

            <Image
              src='/imgs/blank-pfp.png'
              width={40} height={40} alt="" className={qstyles.pfp}
            />
            <div>
              <div className={qstyles.username}>@{props.username}</div>
              <div className={qstyles.time}>{time[0]}</div>
            </div>

          </div>

          <textarea 
          className={qstyles.changeQuote} 
          onChange={(e) => setNewPost(e.target.value)}
          value={newPost}
          > 
          </textarea>

          <div className={qstyles.postInfo}>

            <div className={qstyles.likeInfo} onClick={() => likePost()}>
              <Image src="/imgs/love.png" width={23} height={23} alt="" className={qstyles.likes} />
              &nbsp; {props.likes}
            </div>

            <div className={qstyles.change} onClick={()=>updatePost()}>
              <button className={qstyles.update}>Update</button>
            </div>

          </div>

        </div>
      }

    </div>
  );
};
export default Quotes;
