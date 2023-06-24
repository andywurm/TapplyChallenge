import { useContext, useEffect, useState } from "react";
import pstyles from "./Profile.module.css";
import Image from "next/image";
import Quotes from "../Quotes/Quotes";
import { PostType, UserContext } from "../../Context/UserContext";
import { db } from '../../firebase-config'
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore"

const Profile = () => {

  const [users, setUsers] = useState<any>([])
  const [userposts, setUserPosts] = useState<any>([])
  let context = useContext(UserContext)
  const usersCollectionRef = collection(db, "users")
  const listCollectionRef = doc(db, "quotelist", context.masterList)

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

    }

    const getPosts = onSnapshot(doc(db, "users", context.user.id), (doc) => {
      setUserPosts(doc.data().posts)
    });

    getUsers()

  }, [context.user,usersCollectionRef])

  const [edit, setEdit] = useState(false);
  const [first, setFirst] = useState(context.user.first);
  const [last, setLast] = useState(context.user.last);
  const [username, setUsername] = useState(context.user.username);
  const [email, setEmail] = useState(context.user.email);
  const [password, setPassword] = useState(context.user.password);

  const updateUser = async () => {

    const userDoc = doc(db, "users", context.user.id)

    await updateDoc(userDoc, {
      first: first,
      last: last,
      username: username,
      email: email,
      password: password
    })
    context.setUser(
      {
        first: first,
        last: last,
        username: username,
        email: email,
        password: password,
        id: context.user.id,
        pfp: context.user.pfp,
        posts: context.user.posts
      }
    )
    setEdit(!edit)
  }

  return (
    <div>

      <div className={pstyles.userPfp}>

        <Image
          src='/imgs/blank-pfp.png'
          width={110}
          height={110}
          alt=""
          className={pstyles.pfp}
          style={{
            border: edit ? "dashed gray 2px" : "none",
            padding: edit ? "2px" : "none",
          }}
        />

        <div className={pstyles.userNames}>
          <div className={pstyles.fullName}>
            {context.user.first} {context.user.last}
          </div>
          <div className={pstyles.username}>@{context.user.username}</div>
        </div>

        <div className={pstyles.btnContainer}>
          {edit ? (
            <button className={pstyles.editBtn} onClick={() => updateUser()}>
              Save Changes
            </button>
          ) : (
            <button className={pstyles.editBtn} onClick={() => setEdit(!edit)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {edit ? (
        <div className={pstyles.userInfo}>
          <div className={pstyles.info}>
            First Name:
            <input
              className={pstyles.inputs}
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div className={pstyles.info}>
            Last Name:
            <input
              className={pstyles.inputs}
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
          <div className={pstyles.info}>
            Username:
            <input
              className={pstyles.inputs}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={pstyles.info}>
            Email:
            <input
              className={pstyles.inputs}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={pstyles.info}>
            Password:
            <input
              className={pstyles.inputs}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {edit ? (
        <div style={{ height: "10vh" }}></div>
      ) : (
        <div className={pstyles.userPosts}>
          {context.user.posts.length > 0 ? (
            <div>
              <div className={pstyles.yourPosts}>Your Posts</div>
              {userposts.reverse().map((post: PostType) => {
                return (
                  <div key={post.id} className={pstyles.quoteContainer}>
                    <Quotes username={post.username} quote={post.quote} time={post.time} likes={post.likes} id={post.id} />
                  </div>
                );
              })}
              <div style={{ height: "10vh" }}></div>
            </div>
          ) : (
            <div className={pstyles.noUserPosts}>
              <div className={pstyles.icon}>
                <Image src="/imgs/chat.png" width={50} height={50} alt="" />
              </div>
              Aww, No Posts Yet.
            </div>
          )}

        </div>
      )}

    </div>
  );
};
export default Profile;
