import {
  interactTextPosition,
  objectBasePosition,
} from '../configs/objectConfigs';
import { IMacBlueModel } from '../models/IMacBlueModel';
import InteractText from './InteractText';
import { useInteractSystem } from '../../../hooks/useInteractSystem';
import type { FocusTargets } from '../../../stores/useDeskStore';
import { controls } from '../../../configs/interactConfig';

const IMacBlue = () => {
  const focusTarget: FocusTargets = 'mac';
  const isLooking = useInteractSystem(focusTarget);

  return (
    <group position={objectBasePosition}>
      <InteractText
        position={interactTextPosition[focusTarget]}
        visible={isLooking}
      >
        Press{' '}
        <span className='border border-black p-2 rounded-sm capitalize'>
          {controls.interact[0].replace('Key', '')}
        </span>{' '}
        to interact
      </InteractText>
      <IMacBlueModel />
    </group>
  );
};

export default IMacBlue;
