import { interactTextPosition, objectBasePosition } from '../../configs/objectConfigs';
import { IMacBlueModel } from '../../models/IMacBlueModel';
import InteractText from '../InteractText';
import { useLookAt } from '../../../hooks/useLookAt';
import type { FocusTargets } from '../../../stores/useDeskStore';
import { controls } from '../../../configs/interactConfig';
import { useInteract } from '../../../hooks/useInteract';
import ComputerScreen from './ComputerScreen';

const IMacBlue = () => {
  const focusTarget: FocusTargets = 'mac';
  const isLooking = useLookAt(focusTarget);
  useInteract('mac', isLooking);

  return (
    <group position={objectBasePosition}>
      <InteractText position={interactTextPosition[focusTarget]} visible={isLooking}>
        Press{' '}
        <span className='border border-black p-2 rounded-sm capitalize'>{controls.interact[0].replace('Key', '')}</span>{' '}
        to interact
      </InteractText>
      <ComputerScreen />
      <IMacBlueModel />
    </group>
  );
};

export default IMacBlue;
