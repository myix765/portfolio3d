import ProfileIconNoHi from '../assets/apps/profile_icon_no_hi.png';
import AppSection from '../components/windows/AppSection';
import { experienceConfig, skillsConfig, socialsConfig } from '../configs/profileConfig';
import { EnvelopeIcon } from '@phosphor-icons/react';

const ProfileApp = () => {
  return (
    <div className='w-full h-full @container'>
      <div className='h-full grid grid-cols-1 auto-rows-min @3xl:grid-cols-5 @3xl:grid-rows-[repeat(3,minmax(min-content,auto))] gap-[0.8vw] p-4'>
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
        <AppSection colSpan={2} rowSpan={3} isCol>
          <h2>Experience</h2>
          <div className='flex flex-col gap-4'>
            {experienceConfig.map(exp => (
              <div>
                <p className='font-semibold'>{exp.title}</p>
                <p>{exp.company}</p>
                <p>{exp.location}</p>
                <p>{exp.period}</p>
              </div>
            ))}
          </div>
        </AppSection>
        <AppSection colSpan={3} isCol>
          <h2>Skills</h2>
          <div className='flex gap-3 flex-wrap'>
            {skillsConfig.map(skill => (
              <div className='rounded-full border border-slate-600 py-1 px-2 whitespace-nowrap'>{skill}</div>
            ))}
          </div>
        </AppSection>
        <AppSection colSpan={3} isCol>
          <h2>Socials</h2>
          <div className='flex items-center gap-x-3'>
            <EnvelopeIcon className='w-8 h-8' />
            <p>
              Email: <a href='mailto:megan.yi765@proton.me'>megan.yi765@proton.me</a>
            </p>
          </div>
          <div className='flex gap-6 flex-wrap'>
            {socialsConfig.map(social => (
              <a href={social.href} target='_blank' rel='noopener noreferrer'>
                <social.icon className='w-10 h-10' />
              </a>
            ))}
          </div>
        </AppSection>
        <div className='h-1' /> {/* allow bottom padding to show with scroll */}
      </div>
    </div>
  );
};

export default ProfileApp;
