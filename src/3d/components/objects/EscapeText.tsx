import useDeskStore from '../../stores/useDeskStore';
import HudText from './HudText';

const EscapeText = () => {
  const cameraMode = useDeskStore(s => s.cameraMode);

  return (
    <HudText position='bottom-6 left-8'>
      <p className={`${cameraMode.type === 'focus' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        Press <span className='border border-black p-2 rounded-sm capitalize'>Esc</span> to go back to desk view
      </p>
    </HudText>
  );
};

export default EscapeText;
