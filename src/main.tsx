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
import Test from './pages/Test';
import { ToastContextProvider } from './contexts/ToastContext';

const root = ReactDOM.createRoot(document.getElementById('app')!);

const rootRoute = new RootRoute({
    component: () => { return <Page /> }
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/',
    component: () => <Dashboard />
});

const basicRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/basic',
    component: () => <Basic />
});

const advanceRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/advanced',
    component: () => <Advanced />
})

const googleRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/google',
    component: () => <Google />
})

const testRoute = new Route({
    getParentRoute: () => rootRoute,
    path: 'sprint/test',
    component: () => <Test />
})

const routeTree = rootRoute.addChildren([indexRoute, basicRoute, advanceRoute, googleRoute, testRoute]);
const router = new Router({ routeTree });

root.render(
    <StrictMode>
        <AppContextProvider>
            <ToastContextProvider>
                <RouterProvider router={router} />
            </ToastContextProvider>
        </AppContextProvider>
    </StrictMode>
);

