import PillTag from './PillTag';

const SkillsSection = ({ skills }: { skills: string[] }) => {
  return (
    <div className='flex gap-3 flex-wrap'>
      {skills.map(s => (
        <PillTag tag={s} />
      ))}
    </div>
  );
};

export default SkillsSection;
