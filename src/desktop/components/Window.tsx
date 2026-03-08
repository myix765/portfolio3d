import type { ReactNode } from 'react';
import { Rnd } from 'react-rnd';

export interface WindowProps {
  header: string;
  children: ReactNode;
  initX: number;
  initY: number;
  width: number;
  height: number;
  zIndex: number;
  focus: () => void;
  close: () => void;
}

const Window = ({ children, initX, initY, header, width, height, zIndex, focus, close }: WindowProps) => {
  const padding = 'p-4';

  return (
    <Rnd
      dragHandleClassName='header'
      default={{ x: initX, y: initY, width, height }}
      minWidth={'12%'}
      minHeight={'12%'}
      onMouseDown={focus}
      style={{ zIndex }}
      className='bg-white rounded-xl overflow-clip shadow-[0_36px_100px_0_rgba(0,0,0,0.4),0_0_3px_0_rgba(0,0,0,0.55)]'
    >
      <div className={`header w-full bg-neutral-300 ${padding} h-9 flex items-center`}>
        <div className='flex flex-1 gap-2 items-center'>
          <button
            id='close'
            className='bg-red-500 border border-red-700 w-3.5 h-3.5 rounded-full'
            onClick={close}
          ></button>
          <div id='minimize' className='bg-yellow-500 border border-yellow-600 w-3.5 h-3.5 rounded-full'></div>
          <div id='fullscreen' className='bg-green-500 border border-green-700 w-3.5 h-3.5 rounded-full'></div>
        </div>
        <h2>{header}</h2>
        <div className='flex-1'></div> {/* keep header centered */}
      </div>
      <div className={`${padding}`}>{children}</div>
    </Rnd>
  );
};

export default Window;
