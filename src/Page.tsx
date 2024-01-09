import React from 'react';
import Layout from './layout/Layout';
import { SprintGetEnvResponse, SprintVariables } from '../routers';
import { AppContext, AppContextType } from './contexts/AppContext';
import SprintForm from './components/SprintForm';

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
        Main contents
        { loading && <div>Loading</div> } 
        <div>
            <p>Env file location: { appStore?.envPath }</p>
            <SprintForm />
            <form method='POST' action="http://localhost:3000/sprint/send">
                <button type="submit">Test mail</button>
            </form>
        </div>
    </Layout>
}
