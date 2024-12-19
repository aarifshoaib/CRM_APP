import React, { useState } from 'react';

const Fibonacci = () => {
    const [num, setNum] = useState(0);
    const [series, setSeries] = useState([]);

    const generateFibonacci = (n) => {
        let fib = [0, 1];
        for (let i = 2; i < n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        return fib.slice(0, n);
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNum(value);
        setSeries(generateFibonacci(value));
    };

    return (
        <div>
            <h1>Fibonacci Series</h1>
            <input type="number" value={num} onChange={handleChange} />
            <ul>
                {series.map((num, index) => (
                    <li key={index}>{num}</li>
                ))}
            </ul>
        </div>
    );
};

export default Fibonacci;