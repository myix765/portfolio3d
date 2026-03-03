import { DeskModel } from '../models/DeskModel';
import { AppleKeyboardModel } from '../models/AppleKeyboardModel';
import { AppleMouseModel } from '../models/AppleMouseModel';
import { OfficeChairModel } from '../models/OfficeChairModel';
import { objectBasePosition } from '../configs/objectConfigs';
import IMacBlue from '../objects/computer/IMacBlue';
import { useRef } from 'react';
import { Environment, useHelper } from '@react-three/drei';
// import { useControls } from 'leva';
import { DirectionalLightHelper, type DirectionalLight } from 'three';

const SetupScene = () => {
  const lightRef = useRef<DirectionalLight>(null!);
  useHelper(lightRef, DirectionalLightHelper, 1, 'red');

  // const { intensity, x, y, z } = useControls({
  //   intensity: { value: 1, min: 0, max: 20 },
  //   x: { value: 0, min: -5, max: 5 },
  //   y: { value: 0, min: -5, max: 5 },
  //   z: { value: 0, min: -5, max: 5 },
  // });

  return (
    <>
      <Environment preset='apartment' environmentIntensity={0.4} />
      <DeskModel position={objectBasePosition} />
      <AppleKeyboardModel position={objectBasePosition} />
      <IMacBlue />
      <AppleMouseModel position={objectBasePosition} />
      <OfficeChairModel position={objectBasePosition} />
      <directionalLight
        castShadow
        position={[0, 2.5, 3.15]}
        intensity={3}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
    </>
  );
};

export default SetupScene;
