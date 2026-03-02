import { DeskModel } from '../models/DeskModel';
import { AppleKeyboardModel } from '../models/AppleKeyboardModel';
import { AppleMouseModel } from '../models/AppleMouseModel';
import { OfficeChairModel } from '../models/OfficeChairModel';
import { objectBasePosition } from '../configs/objectConfigs';
import IMacBlue from '../objects/computer/IMacBlue';

const SetupScene = () => {
  return (
    <>
      <DeskModel position={objectBasePosition} />
      <AppleKeyboardModel position={objectBasePosition} />
      <IMacBlue />
      <AppleMouseModel position={objectBasePosition} />
      <OfficeChairModel position={objectBasePosition} />
      <directionalLight position={[0, 6, 3]} intensity={1} />
    </>
  );
};

export default SetupScene;
