/**
 * useCallback
 * 
 * A hook to memoize a function so it does not get re-created on every render, 
 * avoiding unnecessary re-renders of child components that depend on that function.
 * 
 * handleClick is stable across renders due to useCallback.
 * So even when Parent re-renders (on count changes), Child will not re-render because its onClick prop stays the same.
 * 
 * ✅ Real use case: passing event handlers to deeply nested memoized components.
 */

// Child.js
export const child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child button</button>;
});


// Parent.js
import React, { useCallback, useState } from "react";
import Child from "./Child";

export const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("child clicked");
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <Child onClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  );
}
