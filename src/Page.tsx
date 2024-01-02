import React from 'react';
import Layout from './layout/Layout';
import { SprintGetEnvResponse, SprintVariables } from '../middleware';

export default function Page() {

    const [data, setData] = React.useState<SprintVariables>();
    const [envPath, setEnvPath] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [googleClientId, setGoogleClientId] = React.useState<string>('');
    const [googleSecretKey, setGoogleSecretKey] = React.useState<string>('');


    React.useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:3000/sprint/get-env', {
                    headers: {
                        'authorization': 'bearer ' + 'RnUhJgTp9z0bnmP6'
                    }
                });
                const data: SprintGetEnvResponse = await res.json();
                if(data.status) {
                    setData(data.variables);
                    setEnvPath((data.envPath as string));
                    setGoogleClientId(data.variables?.GOOGLE_CLIENT_ID!);
                    setGoogleSecretKey(data.variables?.GOOGLE_CLIENT_SECRET!);
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
            <p>Env file location: { envPath }</p>
            <form>
                { (data && 'GOOGLE_CLIENT_ID' in data!) && <div>
                    <input value={ googleClientId } placeholder='Google client ID' />
                </div> }
                { (data && 'GOOGLE_CLIENT_SECRET' in data!) && <div>
                    <input value={ googleSecretKey } placeholder='Google client secret' />
                </div> }
            </form>
        </div>
    </Layout>
}
