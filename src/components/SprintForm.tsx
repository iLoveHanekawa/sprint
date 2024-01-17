import React, { FormEvent } from 'react';
import { AppContext, AppContextType } from '../contexts/AppContext';
import { SprintGetEnvResponse } from '../../router';
import SprintFormInput from './SprintFormInput';
import SprintFormSelect from './SprintFormSelect';
type SprintFormProps = { envKeyArr: { key: string, value: string }[] };

export default function SprintForm({ envKeyArr }: SprintFormProps) {
    // TODO env specific changes
    
    const appStore = React.useContext<AppContextType | null>(AppContext);
    
    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/sprint/post-env", {
                method: "POST",
                body: JSON.stringify(appStore?.data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data: SprintGetEnvResponse = await res.json();
            appStore?.setData(data.variables!);
        } catch (error) {
            console.log(error);            
        }
    }
    return <form method="POST" onSubmit={submitHandler}>
        <ul>
            {envKeyArr.map(({ key, value }: { key: string, value: string }, index: number) => {
                return <li key={ index }>
                    {(appStore?.data && key in appStore.data!) && key === 'NODE_ENV'? 
                        <SprintFormSelect title={key} /> 
                        : <SprintFormInput title={key} value={value} />
                    }
                </li>
            })}
        </ul>
        <button className='bg-group-left-alt text-white primary-button' type="submit">Save</button>
    </form>
}
