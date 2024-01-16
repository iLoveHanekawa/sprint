import React from 'react'

type SprintContentBlockProps = {
    children: React.ReactNode
    heading: string
}

export default function SprintContentBlock({ children, heading }: SprintContentBlockProps) {
  return (
    <div className='bg-secondary mt-5 p-5 rounded-md'>
        <h3 className='text-primary font-semibold text-lg mb-5'>{heading}</h3>
        {children}
    </div>
  )
}
