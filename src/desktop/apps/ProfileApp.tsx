import ProfileIconNoHi from '../assets/apps/profile-icon-no-hi.png';
import AppSection from '../components/windows/AppSection';
import { skillsConfig } from '../configs/profileConfig';

const ProfileApp = () => {
  return (
    <div className='w-full h-full @container'>
      <div className='h-full grid grid-cols-1 @3xl:grid-cols-5 grid-rows-[repeat(3,minmax(min-content,1fr))] gap-[0.8vw] p-4'>
        <AppSection colSpan={3}>
          <img src={ProfileIconNoHi} alt='' className='rounded-xl max-h-[36vh] max-w-[36vh]' />
          <div className='flex flex-col gap-y-4'>
            <div>
              <h1>Megan Yi</h1>
              <p className='italic'>currently a soon to be graduate</p>
            </div>
            <div>
              <h3>Bio:</h3>
              <p>
                Hi, I'm a software engineer mainly experienced in fullstack, but also interested in other fields like
                computer vision! Outside of coding I also enjoy drawing, woodcarving, and photography.
              </p>
            </div>
            <div>
              <h3>Education</h3>
              <p>Tufts University &apos;26, B.S.</p>
            </div>
          </div>
        </AppSection>
        <AppSection colSpan={2} rowSpan={3}>
          <h2>Experience</h2>
        </AppSection>
        <AppSection colSpan={3} isCol>
          <h2>Skills</h2>
          <div className='flex gap-3 flex-wrap'>
            {skillsConfig.map(skill => (
              <div className="rounded-full border border-slate-600 py-1 px-2 whitespace-nowrap">{skill}</div>
            ))}
          </div>
        </AppSection>
        <AppSection>
          <h2>Socials</h2>
        </AppSection>
        <AppSection colSpan={2}>
          <h2>GitHub</h2>
        </AppSection>
      </div>
    </div>
  );
};

export default ProfileApp;
