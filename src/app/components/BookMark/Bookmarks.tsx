import bmstyles from "./Bookmarks.module.css";
import Image from "next/image";

const Bookmarks = () => {
  return (
    <div className={bmstyles.BookmarkContainer}>
      <div className={bmstyles.icon}>
        <img src="https://tapplychallenge.web.app/imgs/bookmark.png" width={50} height={50} alt="" />
      </div>
      No Bookmarks Available.
    </div>
  );
};
export default Bookmarks;
