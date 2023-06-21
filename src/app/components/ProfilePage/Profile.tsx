"use client";
import { useState } from "react";
import pstyles from "./Profile.module.css";
import Image from "next/image";
import Quotes from "../Quotes/Quotes";

interface IPropsProfile {
  user: any;
}
const Profile = (props: IPropsProfile) => {
  const [edit, setEdit] = useState(false);
  const [first, setFirst] = useState(props.user.first);
  const [last, setLast] = useState(props.user.last);
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [DOB, setDOB] = useState(props.user.DOB);

  return (
    <div>
      <div className={pstyles.userPfp}>
        <Image
          src={props.user.pfp}
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
            {props.user.first} {props.user.last}
          </div>
          <div className={pstyles.username}>@{props.user.username}</div>
        </div>

        <div className={pstyles.btnContainer}>
          {edit ? (
            <button className={pstyles.editBtn} onClick={() => setEdit(!edit)}>
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
            Birthday:
            <input className={pstyles.inputs} value={DOB} disabled />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {edit ? (
        <div style={{ height: "10vh" }}></div>
      ) : (
        <div className={pstyles.userPosts}>
          {props.user.posts.length > 0 ? (
            <div>
              <div className={pstyles.yourPosts}>Your Posts</div>
              {props.user.posts.map((post: any) => {
                return (
                  <div key={post.id}>
                    <Quotes user={props.user} post={post} />
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
