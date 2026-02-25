import { Canvas } from '@react-three/fiber';
import './App.css';
import Setup from './components/3d/scenes/SetupScene';
import CameraWithMouseMovement from './components/3d/CameraWithMouseMovement';
import { Environment } from '@react-three/drei';

const App = () => {
  return (
    <Canvas camera={{ position: [0, 1, 3.1], fov: 50 }}>
      <Environment preset='apartment' environmentIntensity={0.6} />
      <Setup />
      <CameraWithMouseMovement />
    </Canvas>
  );
};

export default App;
