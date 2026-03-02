import {
  interactTextPosition,
  objectBasePosition,
} from '../configs/objectConfigs';
import { IMacBlueModel } from '../models/IMacBlueModel';
import InteractionText from './InteractionText';
import { useInteractionSystem } from '../../../hooks/useInteractionSystem';
import type { FocusTargets } from '../../../stores/useDeskStore';

const IMacBlue = () => {
  const focusTarget: FocusTargets = 'mac';
  const isLooking = useInteractionSystem(focusTarget);

  return (
    <group position={objectBasePosition}>
      <InteractionText
        text='Interact'
        position={interactTextPosition[focusTarget]}
        visible={isLooking}
      />
      <IMacBlueModel />
    </group>
  );
};

export default IMacBlue;
