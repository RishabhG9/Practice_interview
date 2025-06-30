/**
 * React.lazy + Suspense (lazy loading)
 * 
 * React.lazy dynamically imports a component only when it is needed
 * Combined with Suspense, it helps you code split.
 * 
 * HeavyChild is not even downloaded until you click the button.
 * Suspense shows “Loading…” until the module is fetched and rendered.
 * Code splitting reduces the initial JS bundle size, improving page speed.
 * 
 * ✅ Real use case: pages with heavy third-party components (charts, maps, etc.)
 */

// HeavyChild.js
export const HeavyChild = () => {
  console.log("HeavyChild loaded");
  return <div>Heavy component loaded!</div>;
}

// Parent.js
import React, { Suspense, useState } from "react";

const HeavyChild = React.lazy(() => import("./HeavyChild"));

export const Parent = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Load Heavy Component</button>
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyChild />
        </Suspense>
      )}
    </div>
  );
}
