import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ScrollProvider } from "./contexts/ScrollContext";
import StarField from "./components/SpaceBackground";
import MessageDisplay from "./components/MessageDisplay";
import { motion } from "framer-motion";
import { messages } from "./data/content";

function App() {
  return (
    <ScrollProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#0A0A0A",
          overflow: "auto"
        }}
      >
        <div style={{ height: "3000px" }}>
          {" "}
          {/* Scrollable container */}
          <div style={{ position: "fixed", width: "100%", height: "100%" }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
              <ambientLight intensity={0.1} />
              <StarField />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                textAlign: "center",
                pointerEvents: "none"
              }}
            >
              <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                Happy Birthday!
              </h1>
              <p style={{ fontSize: "1.5rem" }}>
                Scroll to explore our universe
              </p>
            </motion.div>

            {messages.map((message, index) => (
              <MessageDisplay
                key={index}
                message={message.text}
                scrollThreshold={message.scrollThreshold}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollProvider>
  );
}

export default App;
