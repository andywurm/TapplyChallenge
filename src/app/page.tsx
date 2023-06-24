"use client";
import { useContext, useEffect, useState } from "react";
import DisplayQuotes from "./components/DisplayQuote/DisplayQuotes";
import styles from "./page.module.css";
import Image from "next/image";
import Profile from "./components/ProfilePage/Profile";
import Bookmarks from "./components/BookMark/Bookmarks";
import Messages from "./components/Message/Messages";
import Login from "./components/Login/Login";

import { UserContext } from "./Context/UserContext";



const Page = () => {

  const [clicked, setClicked] = useState("Home");
  let context = useContext(UserContext)
  
  useEffect(() => {},[context.user])

  const DisplayMidSection = () => {
    if (clicked === "Home") {
      return <DisplayQuotes />;
    } else if (clicked === "Bookmark") {
      return <Bookmarks />;
    } else if (clicked === "Messages") {
      return <Messages />;
    } else {
      return <Profile />;
    }
  };

  return (
    <>
      {
        context.user.first.length > 0 ?

          <main className={styles.main}>

            <div className={styles.top}>
              <div className={styles.logo}>
                <Image src="/imgs/quotes.png" width={35} height={35} alt="" />
                &nbsp; QUOTED
              </div>
              <div className={styles.settings}>
                <Image src="/imgs/setting.png" width={30} height={30} alt="" />
              </div>
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
          :
          <Login />
      }
    </>
  );
};
export default Page;
