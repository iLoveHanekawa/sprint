import React from "react";
import logo from '/logo-alt.png';

export default function Header() {
    return <header className="bg-secondary pl-4 pt-3 pb-3 text-primary font-semibold text-2xl">
        <a href='/sprint/dist/' className="flex items-center gap-1.5">
            <img src={logo} alt="Sprint logo" className="h-10"/>
            <h1>SPRINT</h1>
        </a>
    </header>
}