import { useRef } from 'react';
import { DeskModel } from '../models/DeskModel';
import { IMacBlueModel } from '../models/IMacBlueModel';
import { AppleKeyboardModel } from '../models/AppleKeyboardModel';
import { AppleMouseModel } from '../models/AppleMouseModel';
import { OfficeChairModel } from '../models/OfficeChairModel';
import { DirectionalLight, DirectionalLightHelper } from 'three';
import { useHelper } from '@react-three/drei';

const SetupScene = () => {
  const dirLight = useRef<DirectionalLight>(null!);
  useHelper(dirLight, DirectionalLightHelper, 5, 'red');

  return (
    <>
      <DeskModel position={[0, 0, 2.5]} />
      <AppleKeyboardModel position={[0, 0, 2.5]} />
      <IMacBlueModel position={[0, 0, 2.5]} />
      <AppleMouseModel position={[0, 0, 2.5]} />
      <OfficeChairModel position={[0, 0, 2.5]} />
      <directionalLight ref={dirLight} position={[0, 6, 3]} intensity={1} />
    </>
  );
};

export default SetupScene;
