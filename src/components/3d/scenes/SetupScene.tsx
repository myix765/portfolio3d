import { Desk } from '../models/Desk';

const SetupScene = () => {
  return (
    <>
      <Desk position={[0, 0, 2.25]} scale={[1.3, 1, 1]} />
    </>
  );
};

export default SetupScene;
