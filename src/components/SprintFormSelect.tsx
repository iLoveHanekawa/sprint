import React from 'react'
import { SprintVariables } from '../../router'
import { AppContext, AppContextType } from '../contexts/AppContext'

type SprintFormSelectProps = {
    title: string
}

export default function SprintFormSelect({ title }: SprintFormSelectProps) {

    const appStore = React.useContext<AppContextType | null>(AppContext);

  return (
    <div className='flex flex-col mb-5'>
        <label className='sprint-label' htmlFor='sprint-select'>Switch environment</label>
        <div className='flex border-secondary bg-group-left border-0.8 rounded'>
            <select className='w-full bg-inherit font-sm text-secondary pl-2 focus:outline-none py-1' id='sprint-select' onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                appStore?.setData({ ...appStore?.data as SprintVariables, [ title ]: event.currentTarget.value });
            }} value={appStore?.data!.NODE_ENV} name={  title  }>
                <option value='development'>Development</option>
                <option value='production'>Production</option>
            </select>
            <button type='button' className='p-2 pr-2 text-secondary text-xs'><i className="fa-solid fa-chevron-down"></i></button>
        </div>
    </div>
  )
}
