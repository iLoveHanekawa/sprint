import React from 'react'
import SprintForm from '../components/SprintForm';
import SprintHeading from '../components/SprintHeading';
import SprintContentBlock from '../layout/SprintContentBlock';

export default function Google() {
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'GOOGLE_CLIENT_ID', value: 'Google client ID' },
        { key: 'GOOGLE_CLIENT_SECRET', value: 'Google client secret' },
    ];
  return (
    <>
      <SprintHeading name={"Google"} />
      <SprintContentBlock heading='Google configuration' >
        <SprintForm envKeyArr={envKeyArr} />
        <a className='bg-button-secondary text-white primary-button mt-2.5 block w-fit' href="http://localhost:3000/sprint/google/consent">Get permission</a>
      </SprintContentBlock>
    </>
  )
}
