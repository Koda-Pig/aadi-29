import { useState, useEffect, useRef } from "react";
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: document.documentElement,
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
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
              messages.length * window.innerHeight + window.innerHeight * 2
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

          {/* Bottom detection element */}
          <div
            ref={bottomRef}
            style={{
              height: "1px",
              width: "100%",
              position: "absolute",
              bottom: "0"
            }}
          />

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
