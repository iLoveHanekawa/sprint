import React from 'react'
import { AppContext, AppContextType } from '../contexts/AppContext';
import { SprintVariables } from '../../router';

type SprintFormInputProps = {
    title: string
    value: string
}

export default function SprintFormInput({ title, value }: SprintFormInputProps) {
    const appStore = React.useContext<AppContextType | null>(AppContext);

  return (
    <div className='flex flex-col mb-5'>
        <label htmlFor={ title } className='sprint-label'>{ value }</label>
        <input className='placeholder:text-gray-600 placeholder:font-semibold font-semibold sprint-input bg-group-right' id={ title } type='text' name={ title } onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            appStore?.setData({ ...appStore.data as SprintVariables, [title]: event.currentTarget.value });
        }} value={ appStore?.data![title] } placeholder={ value } />
    </div>
  )
}
