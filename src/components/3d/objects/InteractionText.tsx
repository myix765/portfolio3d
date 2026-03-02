import { Html } from '@react-three/drei';
// import { useState } from 'react';

const InteractionText = ({
  text,
  position,
}: {
  text: string;
  position: [number, number, number];
}) => {
  // const [isLooking, setIsLooking] = useState(false);

  return (
    <Html position={position} center pointerEvents='none'>
      <p>{text}</p>
    </Html>
  );
};

export default InteractionText;
