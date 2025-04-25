import { motion } from "framer-motion";
import { useScroll } from "../contexts/ScrollContext";
import styles from "../styles/message-display.module.scss";
import { Message } from "../types";

const MessageDisplay = ({ message }: { message: Message }) => {
  const { scrollPosition } = useScroll();
  const isVisible =
    scrollPosition >= message.scrollThreshold &&
    scrollPosition < message.scrollThreshold + 1000;

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
