import { motion } from "framer-motion";
import { useScroll } from "../contexts/ScrollContext";

interface MessageDisplayProps {
  message: string;
  scrollThreshold: number;
}

const MessageDisplay = ({ message, scrollThreshold }: MessageDisplayProps) => {
  const { scrollPosition } = useScroll();
  const isVisible =
    scrollPosition >= scrollThreshold && scrollPosition < scrollThreshold + 500;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        textAlign: "center",
        pointerEvents: "none",
        maxWidth: "80%",
        padding: "2rem",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "1rem"
      }}
    >
      <p style={{ fontSize: "1.5rem", lineHeight: "1.6" }}>{message}</p>
    </motion.div>
  );
};

export default MessageDisplay;
