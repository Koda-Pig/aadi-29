import { motion } from "framer-motion";
import { useScroll } from "../contexts/ScrollContext";
import { Message } from "../types";
import styles from "../styles/message-display.module.scss";

const MessageDisplay = ({ message }: { message: Message }) => {
  const { scrollPosition } = useScroll();
  const isVisible =
    scrollPosition >= message.scrollThreshold &&
    scrollPosition < message.scrollThreshold + window.innerHeight;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 50
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1,
        opacity: { duration: 0.3 }
      }}
      className={styles.message_display}
    >
      {typeof message.text === "string" ? <p>{message.text}</p> : message.text}
    </motion.div>
  );
};

export default MessageDisplay;
