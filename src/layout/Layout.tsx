import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type LayoutType = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutType) {
    return <div className='font-nunito bg-primary antialiased'>
        <Header />
        { children }
        <Footer />
    </div>
}