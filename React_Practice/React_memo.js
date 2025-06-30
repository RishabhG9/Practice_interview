/**
 * React.memo
 * 
 * A higher-order component that memoizes a functional component to prevent re-rendering if its props don’t change.
 * 
 * 
 * The Child component will not re-render when you click the button because its prop name is stable ("Alice"), thanks to React.memo.
 * Only Parent will re-render to update the count.
 * 
 * Real use case: components that render with the same props over and over.
 */

// Child.js
import React from "react";

export const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <div>Child: {name}</div>;
});

// Parent.js
import React, { useState } from "react";
import Child from "./Child";

export const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <Child name="Alice" />
      <p>Count: {count}</p>
    </div>
  );
}

