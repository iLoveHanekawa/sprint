import React from 'react'
import { ToastContext, ToastContextType } from '../contexts/ToastContext';

export default function SprintToast() {
    const toastConfig = React.useContext<ToastContextType | null>(ToastContext);
    const [forceFade, setForceFade] = React.useState<boolean>(false);
  return (
    <>
        { toastConfig?.renderToast && <div onAnimationEnd={() => { 
            toastConfig.setRenderToast(false); 
            setForceFade(false);
        }} className={`sprint-toast sprint-toast-normal-animation ${forceFade? 'sprint-toast-force-fadeout': ''} ${toastConfig.isError? 'bg-error': 'bg-group-left-alt'}`}>{ toastConfig.content }
            <button className='ml-7' onClick={() => {
                setForceFade(true);
            }}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div> }
    </>
  )
}
