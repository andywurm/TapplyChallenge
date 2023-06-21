"use client";
import { useState } from "react";
import DisplayQuotes from "./components/DisplayQuote/DisplayQuotes";
import styles from "./page.module.css";
import Image from "next/image";
import Profile from "./components/ProfilePage/Profile";
import Bookmarks from "./components/BookMark/Bookmarks";
import Messages from "./components/Message/Messages";

const Page = () => {
  const [clicked, setClicked] = useState("Home");
  const users = [
    {
      first: "Satomi",
      last: "Ishihara",
      username: "Satomi86",
      email: "IshigamiKuniko@gmail.com",
      DOB: "12/24/1986",
      pfp: "/imgs/blank-pfp.png",
      posts: [],
    },
    {
      first: "Kazuya",
      last: "Ohashi",
      username: "Hassun",
      email: "Ohashi.Kazuya@gmail.com",
      DOB: "08/09/1997",
      pfp: "/imgs/blank-pfp.png",
      posts: [
        {
          time: "01/01/2023",
          quote:
            "Just one small positive thought in the morning can change your whole day.",
          likes: 100,
        },
        {
          time: "01/01/2023",
          quote:
            "Just one small positive thought in the morning can change your whole day.",
          likes: 10,
        },
      ],
    },
  ];

  const DisplayMidSection = () => {
    if (clicked === "Home") {
      return <DisplayQuotes user={users[1]}/>;
    } else if (clicked === "Bookmark") {
      return <Bookmarks />;
    } else if (clicked === "Messages") {
      return <Messages />;
    } else {
      return <Profile user={users[1]} />;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.top}>
      &quot; Q U O T E D &quot;
      </div>

      <DisplayMidSection />

      <div className={styles.bottom}>
        <div className={styles.bottomBar}>
          <div
            className={styles.barItems}
            onClick={() => setClicked("Bookmark")}
          >
            <Image src="/imgs/bookmark.png" width={25} height={25} alt="" />
          </div>

          <div className={styles.barItems} onClick={() => setClicked("Home")}>
            <Image src="/imgs/home.png" width={25} height={25} alt="" />
          </div>

          <div
            className={styles.barItems}
            onClick={() => setClicked("Messages")}
          >
            <Image src="/imgs/chat.png" width={25} height={25} alt="" />
          </div>

          <div
            className={styles.barItems}
            onClick={() => setClicked("Profile")}
          >
            <Image src="/imgs/user.png" width={25} height={25} alt="" />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Page;
