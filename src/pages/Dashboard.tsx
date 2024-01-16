import React from 'react'
import SprintForm from '../components/SprintForm';
import { AppContext } from '../contexts/AppContext';
import SprintHeading from '../components/SprintHeading';
import SprintContentBlock from '../layout/SprintContentBlock';

export default function Dashboard() {
  const appStore = React.useContext(AppContext);
    const envKeyArr: { key: string, value: string }[] = [
        { key: 'NODE_ENV', value: 'Node environment' },
    ];
  return (
    <>
      <SprintHeading name="Dashboard" />
      <SprintContentBlock heading={"Environment"}>
        <div className='sprint-group-of-two'>
          <div className='sprint-group-left'>Env file location</div>
          <div className='sprint-group-right'>
            { appStore?.envPath }
          </div>
        </div>
        <div className='sprint-group-of-two'>
          <div className='sprint-group-left-alt'>Environment</div>
          <div className="sprint-group-right-alt">{appStore?.data!.NODE_ENV}</div>
        </div>
        <SprintForm envKeyArr={envKeyArr} />
      </SprintContentBlock>
    </>
  )
}
