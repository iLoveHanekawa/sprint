import React from "react";
import logo from '/logo-alt.png';

export default function Header() {
    return <header className="bg-secondary pl-4 pt-3 pb-3 text-primary font-semibold text-2xl">
        <div className="flex items-center gap-1.5">
            <img src={logo} alt="Sprint logo" className="h-10"/>
            <span>SPRINT</span>
        </div>
    </header>
}