import React from 'react'
import SprintForm from '../components/SprintForm';
import TestMailForm from '../components/TestMailForm';

export default function Test() {
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'SMTP_TEST_RECIPIENT_EMAIL', value: 'SMTP test recipient\'s email' },
        { key: 'SMTP_TEST_SUBJECT', value: ' SMTP test subject' },
        { key: 'SMTP_TEST_CONTENT', value: 'SMTP test content' }
    ];
  return (
    <>
      <SprintForm envKeyArr={envKeyArr} />
      <a href="http://localhost:3000/sprint/google/consent">Get permission</a>
      <TestMailForm />
    </>
  )
}
