import { Canvas } from '@react-three/fiber';
import Setup from './components/3d/scenes/SetupScene';
import { Environment, KeyboardControls } from '@react-three/drei';
import CameraSystem from './components/3d/camera/CameraSystem';
import { freeLookOrigin } from './components/3d/configs/cameraConfigs';
import { keyMap } from './configs/interactConfig';

const App = () => {
  return (
    <KeyboardControls map={keyMap}>
      <Canvas camera={freeLookOrigin}>
        <Environment preset='apartment' environmentIntensity={0.6} />
        <Setup />
        <CameraSystem />
      </Canvas>
    </KeyboardControls>
  );
};

export default App;
