import React from 'react';

export const Loading = () => {
    return <div className='text-secondary flex items-center gap-2 text-sm'>
        <span className='text-secondary animate-spin border-2 border-white border-l-transparent p-1.5 rounded-full'></span>Loading
    </div>
}