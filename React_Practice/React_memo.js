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
 * 
 * 🧠 Why Use React.memo?
 * Reduces unnecessary re-renders
 * Optimizes performance for pure components (output only depends on props)
 * 
 * pure components 
 * Pure components in React are a type of component optimized for performance by implementing 
 * a shallow comparison of props and state. This optimization prevents unnecessary re-renders 
 * of the component when its props or state have not significantly changed
 * Functional components can be made pure using the React.memo higher-order component (HOC).
 * 
 * 
 * DRAWBACK
 * Won’t work if props are objects/arrays/functions that change reference on each render — unless memoized (using useMemo or useCallback)
 * Better for components with stable props
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

