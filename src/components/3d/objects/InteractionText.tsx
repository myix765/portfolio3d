import { Html } from '@react-three/drei';

const InteractionText = ({
  text,
  position,
  visible,
}: {
  text: string;
  position: [number, number, number];
  visible: boolean;
}) => {
  return (
    <Html position={position} center pointerEvents='none'>
      <p style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
        {text}
      </p>
    </Html>
  );
};

export default InteractionText;
