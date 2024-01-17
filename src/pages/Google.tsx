import React from 'react'
import SprintForm from '../components/SprintForm';
import SprintHeading from '../components/SprintHeading';
import SprintContentBlock from '../layout/SprintContentBlock';

export default function Google() {
    const [loading, setLoading] = React.useState(false);
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'GOOGLE_CLIENT_ID', value: 'Google client ID' },
        { key: 'GOOGLE_CLIENT_SECRET', value: 'Google client secret' },
    ];
  return (
    <>
      <SprintHeading name={"Google"} />
      <SprintContentBlock heading='Google configuration' >
        <SprintForm envKeyArr={envKeyArr} />
        <a onClick={() => { setLoading(true); }} className='bg-button-secondary text-white primary-button mt-2.5 w-fit flex items-center gap-4' href="http://localhost:3000/sprint/google/consent">
          <span className={`animate-spin border-2 border-l-transparent rounded-full p-2 border-white ${!loading? 'hidden': ''}`}></span>
          {loading? 'Redirecting': 'Get permission'}
        </a>
      </SprintContentBlock>
    </>
  )
}
