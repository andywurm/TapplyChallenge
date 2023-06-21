import mstyles from "./Messages.module.css";
import Image from "next/image";

const Messages = () => {
  return (
    <div className={mstyles.MessageContainer}>
      <div className={mstyles.icon}>
        <Image src="/imgs/chat.png" width={50} height={50} alt="" />
      </div>
      No Messages Available.
    </div>
  );
};
export default Messages;
