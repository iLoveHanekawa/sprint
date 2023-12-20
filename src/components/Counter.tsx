import React from 'react';
export default function Counter() {
    const [count, setCount] = React.useState<number>(0);
    return <button id="counter" type="button" onClick={() => {
        setCount(i => i + 1);
    }}>
        count {count}
    </button>
}