import React from 'react'

export default function Counter() {
  const [count, setCount] = React.useState<number>(0);
  return <div className='card'>
      <button onClick={() => {
        setCount(i => i + 1);
      }}>Count: { count }</button>
    </div>
}