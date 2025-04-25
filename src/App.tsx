import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ScrollProvider } from "./contexts/ScrollContext";
import StarField from "./components/SpaceBackground";
import MessageDisplay from "./components/MessageDisplay";
import { motion } from "framer-motion";
import { messages } from "./data/content";
import styles from "./styles/app.module.scss";
import { ArrowDown } from "lucide-react";

function App() {
  return (
    <ScrollProvider>
      {/* Fixed background container */}
      <div className={styles.background}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.1} />
          <StarField />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Scrollable content container */}
      <div
        className={styles.scrollable_container}
        style={{
          minHeight: `${messages.length * 100 + 100}vh`
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
                  top: window.innerHeight,
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
      </div>
    </ScrollProvider>
  );
}

export default App;
