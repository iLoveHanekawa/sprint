import React from 'react'
import SprintForm from '../components/SprintForm';

export default function Advanced() {
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'SMTP_CONTENT_TYPE', value: 'SMTP content type' },
        { key: 'SMTP_ENCRYPTION', value: 'SMTP encryption' },
        { key: 'SMTP_CHARSET', value: 'SMTP charset' },
        { key: 'SMTP_DEBUG', value: 'SMTP debug' },
    ];

  return (
    <SprintForm envKeyArr={envKeyArr} />
  )
}
