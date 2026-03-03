import { DeskModel } from '../models/DeskModel';
import { AppleKeyboardModel } from '../models/AppleKeyboardModel';
import { AppleMouseModel } from '../models/AppleMouseModel';
import { OfficeChairModel } from '../models/OfficeChairModel';
import { objectBasePosition } from '../configs/objectConfigs';
import IMacBlue from '../objects/computer/IMacBlue';
import { useRef } from 'react';
import { PointLight, PointLightHelper } from 'three';
import { useHelper } from '@react-three/drei';
// import { useControls } from 'leva';

const SetupScene = () => {
  const lightRef = useRef<PointLight>(null!);
  useHelper(lightRef, PointLightHelper, 1, 'red');

  // const { intensity, x, y, z } = useControls({
  //   intensity: { value: 1, min: 0, max: 20 },
  //   x: { value: 1, min: 0, max: 5 },
  //   y: { value: 1, min: 0, max: 5 },
  //   z: { value: 1, min: 0, max: 5 },
  // });

  return (
    <>
      <DeskModel position={objectBasePosition} />
      <AppleKeyboardModel position={objectBasePosition} />
      <IMacBlue />
      <AppleMouseModel position={objectBasePosition} />
      <OfficeChairModel position={objectBasePosition} />
      <directionalLight
        ref={lightRef}
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
