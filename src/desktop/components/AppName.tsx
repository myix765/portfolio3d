const AppName = ({ name }: { name: string }) => {
  return (
    <div
      className='px-3 py-1 text-white capitalize text-nowrap
               bg-neutral-700/80 border border-neutral-400 outline outline-gray-900 rounded-md
                 absolute -top-14 left-1/2 -translate-x-1/2'
    >
      {name}
    </div>
  );
};

export default AppName;
