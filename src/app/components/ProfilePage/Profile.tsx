import { useContext, useEffect, useState } from "react";
import pstyles from "./Profile.module.css";
import Image from "next/image";
import Quotes from "../Quotes/Quotes";
import { PostType, UserContext } from "../../Context/UserContext";
import { db, storage } from '../../firebase-config'
import { collection, doc, getDocs, onSnapshot, updateDoc, writeBatch } from "firebase/firestore"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"

const Profile = () => {

  const [users, setUsers] = useState<any>([])
  const [newPfp, setNewPfp] = useState<any>(null)
  const [changePfp, setChangePfp] = useState(false)
  const [pfpUrl, setPfpUrl] = useState("")
  const [userposts, setUserPosts] = useState<any>([])
  let context = useContext(UserContext)
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const getPosts = onSnapshot(doc(db, "users", context.user.id), (doc) => {
      setUserPosts(doc.data()?.posts)
    });

    const getPfp = ref(storage, 'images/')
    listAll(getPfp).then((res) => {
      res.items.forEach(i => {
        if (i.name === context.user.id) {
          getDownloadURL(i).then((url) => {
            setPfpUrl(url)
          })
        }
      })
    })

    getUsers()

  }, [context.user])

  // console.log(userposts)

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
      password: password,
      pfp: pfpUrl
    })
    context.setUser(
      {
        first: first,
        last: last,
        username: username,
        email: email,
        password: password,
        id: context.user.id,
        pfp: pfpUrl,
        posts: context.user.posts
      }
    )

    if (newPfp !== null) {
      const imageRef = ref(storage, `images/${context.user.id}`)
      uploadBytes(imageRef, newPfp)
    }

    setNewPfp(null)
    setEdit(!edit)
  }

  const Upload = () => {
    return (
      <div className={pstyles.uploadContainer}>
        <div className={pstyles.upload}>
          <input type="file" onChange={(e) => setNewPfp(e.target.files ? e.target.files[0] : null)} />
        </div>
      </div>
    )
  }

  return (
    <div>

      <div>

        <div className={pstyles.userPfp}>

          <Image
            src={pfpUrl === "" ? '/imgs/blank-pfp.png' : pfpUrl}
            width={110}
            height={110}
            alt=""
            className={pstyles.pfp}
            style={{
              border: edit ? "dashed gray 2px" : "none",
              padding: edit ? "2px" : "none",
            }}
            onClick={() => setChangePfp(!changePfp)}
          />

          <div className={pstyles.userNames}>
            <div className={pstyles.fullName}>
              {context.user.first} {context.user.last}
            </div>
            <div className={pstyles.username}>@{context.user.username}</div>
          </div>

          {changePfp ? <Upload /> : <></>}

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
                {context.user.posts.reverse().map((post: PostType) => {
                  return (
                    <div key={post.id} className={pstyles.quoteContainer}>
                      <Quotes username={post.username} quote={post.quote} time={post.time} likes={post.likes} id={post.id} pfp={post.pfp} />
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

    </div>
  );
};
export default Profile;
