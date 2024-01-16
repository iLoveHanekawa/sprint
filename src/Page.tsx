import React from 'react';
import Layout from './layout/Layout';
import { SprintGetEnvResponse, SprintVariables } from '../router';
import { AppContext, AppContextType } from './contexts/AppContext';
import { Outlet } from '@tanstack/react-router';
import Sidebar from './components/Sidebar';

export default function Page() {

    const appStore = React.useContext<AppContextType | null>(AppContext);
    const [loading, setLoading] = React.useState<boolean>(false);
    React.useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:3000/sprint/get-env');
                const data: SprintGetEnvResponse = await res.json();
                if(data.status) {
                    appStore?.setData(data.variables as SprintVariables);
                    appStore?.setEnvPath((data.envPath as string));
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    return <Layout>
        <div className='min-h-screen flex'>
            <Sidebar />
            <div className='p-6'>
                { loading? <div>Loading</div>: <>
                    <div>
                        <Outlet />
                    </div>
                </>} 
            </div>
        </div>
        
    </Layout>
}
