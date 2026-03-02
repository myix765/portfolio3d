import { Html } from '@react-three/drei';
import useDeskStore from '../../../stores/useDeskStore';

const ComputerScreen = () => {
  const cameraMode = useDeskStore(s => s.cameraMode);

  return (
    <Html
      transform
      pointerEvents={cameraMode.type === 'free' ? 'none' : 'auto'}
      position={[0, 1.025, -0.17]}
      scale={0.01085}
    >
      <div className='w-480 h-273 bg-white'>
        <p>computer screen</p>
      </div>
    </Html>
  );
};

export default ComputerScreen;
