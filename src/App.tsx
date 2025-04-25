import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ScrollProvider } from "./contexts/ScrollContext";
import StarField from "./components/SpaceBackground";
import MessageDisplay from "./components/MessageDisplay";
import { motion } from "framer-motion";
import { messages } from "./data/content";
import styles from "./styles/app.module.scss";

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
      <div className={styles.scrollable_container}>
        {/* Initial message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={styles.initial_message}
        >
          <div>
            <h1>Happy Birthday!</h1>
            <p>Scroll to explore our universe</p>
          </div>
        </motion.div>

        {/* Messages */}
        {messages.map((message, index) => (
          <MessageDisplay
            key={index}
            message={message.text}
            scrollThreshold={message.scrollThreshold}
          />
        ))}
      </div>
    </ScrollProvider>
  );
}

export default App;
