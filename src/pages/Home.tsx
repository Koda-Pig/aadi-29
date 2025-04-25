import { useState, useEffect } from "react";
import MessageDisplay from "../components/MessageDisplay";
import { motion } from "framer-motion";
import { messages } from "../data/content";
import styles from "../styles/app.module.scss";
import { ArrowDown } from "lucide-react";
import { PasswordProtection } from "../components/PasswordProtection";
import { Link } from "react-router-dom";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;

      // Show footer when we're near the bottom (within 100px)
      setIsFooterVisible(scrollHeight - scrollTop - clientHeight < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isAuthenticated) {
    return (
      <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <>
      <>
        {/* Scrollable content container */}
        <div
          className={styles.scrollable_container}
          style={{
            minHeight:
              messages.length * window.innerHeight + window.innerHeight * 3
          }}
        >
          {/* Initial message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={styles.initial_message}
          >
            <div>
              <h1>happy birthday dearest 'dila 🤎</h1>
              <p>some of the things I love about you</p>
              <button
                className={styles.arrow_down}
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight + window.innerHeight * 0.5,
                    behavior: "smooth"
                  });
                }}
              >
                <ArrowDown />
              </button>
            </div>
          </motion.div>

          {/* Messages */}
          {messages.map((message) => (
            <MessageDisplay key={message.scrollThreshold} message={message} />
          ))}

          <div
            className={`${styles.galleryLink} ${
              isFooterVisible ? styles.visible : ""
            }`}
          >
            <Link to="/gallery">
              <p>view gallery</p>
            </Link>
          </div>

          <div
            className={`${styles.footer} ${
              isFooterVisible ? styles.visible : ""
            }`}
          >
            <p>made with ❤️ by your 'ua</p>
          </div>
        </div>
      </>
    </>
  );
}
