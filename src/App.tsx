import { Canvas } from '@react-three/fiber';
import './App.css';
import Setup from './components/3d/scenes/setup';

const App = () => {
  return (
    <Canvas>
      <Setup />
      {/* <OrbitControls /> */}
      <ambientLight intensity={1} />
    </Canvas>
  );
};

export default App;
