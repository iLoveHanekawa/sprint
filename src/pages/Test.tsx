import React from 'react'
import SprintForm from '../components/SprintForm';
import TestMailForm from '../components/TestMailForm';
import SprintHeading from '../components/SprintHeading';
import SprintContentBlock from '../layout/SprintContentBlock';

export default function Test() {
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'SMTP_TEST_RECIPIENT_EMAIL', value: 'SMTP test recipient\'s email' },
        { key: 'SMTP_TEST_SUBJECT', value: ' SMTP test subject' },
        { key: 'SMTP_TEST_CONTENT', value: 'SMTP test content' }
    ];
  return (
    <>
      <SprintHeading name={"Test"} />
      <SprintContentBlock heading='Test configuration'>
        <SprintForm envKeyArr={envKeyArr} />
        <TestMailForm />
      </SprintContentBlock>
    </>
  )
}
