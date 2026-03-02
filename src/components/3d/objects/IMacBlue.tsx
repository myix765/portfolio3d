import { objectBasePosition } from '../configs/objectConfigs';
import { IMacBlueModel } from '../models/IMacBlueModel';
import InteractionText from './InteractionText';

const IMacBlue = () => {
  return (
    <group position={objectBasePosition}>
      <InteractionText text='Interact' position={[0, 1.012, 0.2]} />
      <IMacBlueModel />
    </group>
  );
};

export default IMacBlue;
