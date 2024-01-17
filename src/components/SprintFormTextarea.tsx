import React from 'react'
import { AppContext, AppContextType } from '../contexts/AppContext';
import { SprintVariables } from '../../router';

type SprintFormTextareaProps = {
    title: string
    value: string
}

export default function SprintFormTextarea({ title, value }: SprintFormTextareaProps) {
    const appStore = React.useContext<AppContextType | null>(AppContext);
  return (
    <div className='flex flex-col mb-5'>
        <label className='sprint-label' htmlFor={ title }>{value}</label>
        <textarea className='sprint-input bg-group-right' id={ title } maxLength={1000} name={ title } onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                appStore?.setData({ ...appStore.data as SprintVariables, [title]: event.currentTarget.value });
            }} value={ appStore?.data![title] } placeholder={ value } />
    </div>
  )
}
