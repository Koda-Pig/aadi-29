import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ScrollProvider } from "./contexts/ScrollContext";
import StarField from "./components/SpaceBackground";
import styles from "./styles/app.module.scss";
import { PasswordProtection } from "./components/PasswordProtection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <Router>
      <ScrollProvider>
        {/* Fixed background container */}
        <div className={styles.background}>
          <Canvas camera={{ position: [0, 0, 1] }} className={styles.canvas}>
            <ambientLight intensity={0.1} />
            <StarField />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </ScrollProvider>
    </Router>
  );
}

export default App;
