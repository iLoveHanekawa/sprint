import React from 'react'
import { Link } from '@tanstack/react-router'

export default function Sidebar() {
  return (
    <aside className='bg-secondary flex flex-col w-nav'>
      <nav className='px-4'>
        <Link className='sprint-nav-link' to="/sprint/dashboard" inactiveProps={{ className: 'text-inactive-nav-link' }} activeProps={{ className: 'text-active-nav-link bg-tertiary' }}><i className="fa-solid fa-chart-line sprint-nav-icon text-xl"></i>Dashboard</Link>
      </nav>
      <h2 className='text-secondary font-extrabold flex items-center bg-quarternary py-3 px-7'>CONFIGURE</h2>
      <nav className='px-4 pt-0.5'>
        <Link className='sprint-nav-link' to="/sprint/basic" inactiveProps={{ className: 'text-inactive-nav-link' }} activeProps={{ className: 'text-active-nav-link bg-tertiary' }}><i className="fa-solid fa-wrench sprint-nav-icon text-xl"></i>Basic</Link>
        <Link className='sprint-nav-link' to="/sprint/advanced" inactiveProps={{ className: 'text-inactive-nav-link' }} activeProps={{ className: 'text-active-nav-link bg-tertiary' }}><i className="fa-solid fa-gear sprint-nav-icon text-xl"></i>Advanced</Link>
        <Link className='sprint-nav-link' to="/sprint/google" inactiveProps={{ className: 'text-inactive-nav-link' }} activeProps={{ className: 'text-active-nav-link bg-tertiary' }}><i className="fa-brands fa-google sprint-nav-icon text-xl"></i>Google</Link>
        <Link className='sprint-nav-link' to="/sprint/test" inactiveProps={{ className: 'text-inactive-nav-link' }} activeProps={{ className: 'text-active-nav-link bg-tertiary' }}><i className="fa-solid fa-vial sprint-nav-icon text-xl"></i>Test</Link>
      </nav>
    </aside>
  )
}
