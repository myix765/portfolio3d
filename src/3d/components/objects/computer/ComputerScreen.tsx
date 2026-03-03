import { Html } from '@react-three/drei';
import useDeskStore from '../../../stores/useDeskStore';
import Desktop from '../../../../website/Desktop';

const ComputerScreen = () => {
  const cameraMode = useDeskStore(s => s.cameraMode);

  return (
    <Html
      transform
      pointerEvents={cameraMode.type === 'free' ? 'none' : 'auto'}
      position={[0, 1.025, -0.17]}
      scale={0.01086}
    >
      <Desktop />
    </Html>
  );
};

export default ComputerScreen;
