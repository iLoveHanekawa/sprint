import { Link } from '@tanstack/react-router'
import React from 'react'

type SprintHeadingProps = {
    name: string
}

export default function SprintHeading({ name }: SprintHeadingProps) {
  return (
    <div className='flex items-center gap-2 text-secondary text-sm'>
        <Link to="/sprint/dist/" className='text-link hover:underline'>
            Sprint
        </Link>
        <p>/</p>
        <p>{name}</p>
    </div>
  )
}
