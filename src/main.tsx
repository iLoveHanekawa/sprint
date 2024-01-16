import Page from './Page';
import AppContextProvider from './contexts/AppContext';
import './style.css'
import React, { StrictMode } from 'react';
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import * as ReactDOM from 'react-dom/client';
import Dashboard from './pages/Dashboard';
import Basic from './pages/Basic';
import Advanced from './pages/Advanced';
import Google from './pages/Google';

const root = ReactDOM.createRoot(document.getElementById('app')!);

const rootRoute = new RootRoute({
    component: () => { return <Page /> }
});


const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/dist/',
    component: () => <Dashboard />
});

const basicRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/dist/basic',
    component: () => <Basic />
});

const advanceRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/dist/advance',
    component: () => <Advanced />
})

const googleRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/dist/google',
    component: () => <Google />
})

const routeTree = rootRoute.addChildren([indexRoute, basicRoute, advanceRoute, googleRoute]);
const router = new Router({ routeTree });

root.render(
    <StrictMode>
        <AppContextProvider>
            <RouterProvider router={router} />
        </AppContextProvider>
    </StrictMode>
);

