import React, { FormEvent } from 'react';
import { AppContext, AppContextType } from '../contexts/AppContext';
import { SprintGetEnvResponse, SprintVariables } from '../../router';
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
                    {(appStore?.data && key in appStore.data!) && key === 'NODE_ENV'? <div className='flex flex-col mb-5'>
                        <label className='sprint-label' htmlFor='sprint-select'>Switch environment</label>
                        <div className='flex border-secondary bg-group-left border-0.8 rounded'>
                            <select className='w-full bg-inherit font-sm text-secondary pl-2 focus:outline-none py-1' id='sprint-select' onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                appStore.setData({ ...appStore.data as SprintVariables, [key]: event.currentTarget.value });
                            }} value={appStore.data.NODE_ENV} name={ key }>
                                <option value='development'>Development</option>
                                <option value='production'>Production</option>
                            </select>
                            <button type='button' className='p-2 pr-2 text-secondary text-xs'><i className="fa-solid fa-chevron-down"></i></button>
                        </div>
                    </div> :(appStore?.data && key in appStore?.data!) && key !== 'SMTP_TEST_CONTENT'? <div className='flex flex-col mb-5'>
                        <label htmlFor={ key } className='sprint-label'>{value}</label>
                        <input className='placeholder:text-teritary placeholder:font-semibold sprint-input bg-group-right' id={ key } type='text' name={ key } onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            appStore?.setData({ ...appStore.data as SprintVariables, [key]: event.currentTarget.value });
                        }} value={ appStore.data[key] } placeholder={ value } />
                    </div>: <div className='flex flex-col mb-5'>
                        <label className='sprint-label' htmlFor={ key }>{value}</label>
                        <textarea className='sprint-input bg-group-right' id={ key } maxLength={1000} name={ key } onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                appStore?.setData({ ...appStore.data as SprintVariables, [key]: event.currentTarget.value });
                            }} value={ appStore?.data![key] } placeholder={ value } />
                    </div>}
                </li>
            })}
        </ul>
        <button className='bg-group-left-alt text-white primary-button' type="submit">Save</button>
    </form>
}
