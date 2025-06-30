/**
 * useMemo
 * 
 * A hook to memoize the result of a computation to avoid expensive recalculations on every render.
 * 
 * useMemo memoizes the expensive calculation so it only reruns when num changes.
 * Clicking “Increase Count” does not trigger the costly calculation again.
 * 
 * ✅ Real use case: calculating totals, sorting, filtering large arrays.
 */

// Child.js
export const Child = ({ result }) => {
  console.log("Child rendered");
  return <div>Expensive result: {result}</div>;
}


// Parent.js
import React, { useMemo, useState } from "react";
import Child from "./Child";

function expensiveCalculation(num) {
  console.log("Running expensive calculation");
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += i;
  }
  return total + num;
}

export const Parent = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(5);

  const result = useMemo(() => expensiveCalculation(num), [num]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => setNum(num + 1)}>Change Num</button>
      <Child result={result} />
      <p>Count: {count}</p>
    </div>
  );
}
