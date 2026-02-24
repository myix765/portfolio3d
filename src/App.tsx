import { Canvas } from '@react-three/fiber';
import './App.css';
import Setup from './components/3d/scenes/SetupScene';
import CameraWithMouseMovement from './components/3d/CameraWithMouseMovement';

const App = () => {
  return (
    <Canvas camera={{ position: [0, 1, 3.05], fov: 50 }}>
      <ambientLight intensity={1} />
      <Setup />
      <CameraWithMouseMovement />
    </Canvas>
  );
};

export default App;
