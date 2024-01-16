import React from 'react'
import SprintForm from '../components/SprintForm';

export default function Google() {
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'GOOGLE_CLIENT_ID', value: 'Google client ID' },
        { key: 'GOOGLE_CLIENT_SECRET', value: 'Google client secret' },
    ];
  return (
    <SprintForm envKeyArr={envKeyArr} />
  )
}
