const PillTag = ({ tag }: { tag: string }) => {
  return (
    <div>
      <div className='rounded-full border border-slate-600 py-1 px-2 whitespace-nowrap'>{tag}</div>
    </div>
  );
};

export default PillTag;
