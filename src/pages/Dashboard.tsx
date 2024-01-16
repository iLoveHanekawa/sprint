import React from 'react'
import SprintForm from '../components/SprintForm';
import { AppContext } from '../contexts/AppContext';

export default function Dashboard() {
  const appStore = React.useContext(AppContext);
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'NODE_ENV', value: 'Node environment' },
    ];
  return (
    <>
      <p>Env file location: { appStore?.envPath }</p>
      <SprintForm envKeyArr={envKeyArr} />
    </>
  )
}
