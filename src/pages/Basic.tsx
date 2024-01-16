import React from 'react'
import SprintForm from '../components/SprintForm';
import SprintHeading from '../components/SprintHeading';
import SprintContentBlock from '../layout/SprintContentBlock';

export default function Basic() {
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'SMTP_HOST', value: 'SMTP host' },
        { key: 'SMTP_FROM_EMAIL', value: 'SMTP from email' },
        { key: 'SMTP_USERNAME', value: 'SMTP username' },
        { key: 'SMTP_PASSWORD', value: 'SMTP password' },
        { key: 'SMTP_FROM_NAME', value: 'SMTP from name' },
        { key: 'SMTP_PORT', value: 'SMTP port' },
    ];
  return (
    <>
      <SprintHeading name={"Basic"} />
      <SprintContentBlock heading='Basic configuration'>
        <SprintForm envKeyArr={envKeyArr} />
      </SprintContentBlock>
    </>
  )
}
