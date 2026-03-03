import { Canvas } from '@react-three/fiber';
import Setup from './3d/components/scenes/SetupScene';
import { Environment, KeyboardControls } from '@react-three/drei';
import CameraSystem from './3d/components/camera/CameraSystem';
import { freeLookOrigin } from './3d/components/configs/cameraConfigs';
import { keyMap } from './3d/configs/interactConfig';
import EscapeText from './3d/components/objects/EscapeText';
// import { OrbitControls } from '@react-three/drei';

const App = () => {
  return (
    <KeyboardControls map={keyMap}>
      <EscapeText />
      <Canvas camera={freeLookOrigin}>
        <Environment preset='apartment' environmentIntensity={0.6} />
        <Setup />
        <CameraSystem />
        {/* <OrbitControls enablePan={true} /> */}
      </Canvas>
    </KeyboardControls>
  );
};

export default App;
