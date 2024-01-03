import React from 'react';
import Layout from './layout/Layout';
import { SprintGetEnvResponse } from '../routers';
import { AppContext, AppContextType } from './contexts/AppContext';

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
                    appStore?.setData(data.variables);
                    appStore?.setEnvPath((data.envPath as string));
                    appStore?.setGoogleClientId(data.variables?.GOOGLE_CLIENT_ID!);
                    appStore?.setGoogleSecretKey(data.variables?.GOOGLE_CLIENT_SECRET!);
                }
                setLoading(false);
            } catch (error) {
                console.log(error)                
            }
        }
        getData();
    }, []);

    return <Layout>
        Main contents
        { loading && <div>Loading</div> } 
        <div>
            <p>Env file location: { appStore?.envPath }</p>
            <form>
                { (appStore?.data && 'GOOGLE_CLIENT_ID' in appStore?.data!) && <div>
                    <input onChange={(e) => {
                        appStore?.setGoogleClientId(e.currentTarget.value)
                    }} value={ appStore?.googleClientId } placeholder='Google client ID' />
                </div> }
                { (appStore?.data && 'GOOGLE_CLIENT_SECRET' in appStore?.data!) && <div>
                    <input onChange={(e) => {
                        appStore?.setGoogleSecretKey(e.currentTarget.value);
                    }} value={ appStore?.googleSecretKey } placeholder='Google client secret' />
                </div> }
            </form>
        </div>
    </Layout>
}
