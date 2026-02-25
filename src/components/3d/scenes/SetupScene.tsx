import { useRef } from 'react';
import { Desk } from '../models/Desk';
import { IMacBlue } from '../models/IMacBlue';
import { AppleKeyboard } from '../models/AppleKeyboard';
import { AppleMouse } from '../models/AppleMouse';
import { OfficeChair } from '../models/OfficeChair';
import { DirectionalLight, DirectionalLightHelper } from 'three';
import { useHelper } from '@react-three/drei';

const SetupScene = () => {
  const dirLight = useRef<DirectionalLight>(null!);
  useHelper(dirLight, DirectionalLightHelper, 5, 'red');

  return (
    <>
      <Desk position={[0, 0, 2.5]} />
      <AppleKeyboard position={[0, 0, 2.5]} />
      <IMacBlue position={[0, 0, 2.5]} />
      <AppleMouse position={[0, 0, 2.5]} />
      <OfficeChair position={[0, 0, 2.5]} />
      <directionalLight ref={dirLight} position={[0, 6, 3]} intensity={1} />
    </>
  );
};

export default SetupScene;
