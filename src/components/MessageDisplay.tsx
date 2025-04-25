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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.5 }}
      className={styles.message_display}
    >
      <p>{message.text}</p>
    </motion.div>
  );
};

export default MessageDisplay;
