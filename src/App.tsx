import { Canvas } from '@react-three/fiber';
import './App.css';
import Setup from './components/3d/scenes/SetupScene';
import { Environment } from '@react-three/drei';
import CameraSystem from './components/3d/camera/CameraSystem';
import { freeLookOrigin } from './components/3d/configs/cameraConfigs';

const App = () => {
  return (
    <Canvas camera={freeLookOrigin}>
      <Environment preset='apartment' environmentIntensity={0.6} />
      <Setup />
      <CameraSystem />
    </Canvas>
  );
};

export default App;
