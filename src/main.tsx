import Page from './Page';
import AppContextProvider from './contexts/AppContext';
import './style.css'
import React from 'react';
import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(
    <AppContextProvider>
        <Page />
    </AppContextProvider>
);

