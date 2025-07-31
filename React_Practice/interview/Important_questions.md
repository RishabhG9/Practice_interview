# 📘 ReactJS & Next.js Frontend Interview Q\&A

This document provides **in-depth answers** to essential frontend interview questions focused on **React.js** and **Next.js**. The questions are categorized by difficulty level and focus on performance, rendering strategies, optimization, and architectural decisions.

---

## 🟢 Easy Level

### 1. What is the virtual DOM and how does React use it to render efficiently?

The **Virtual DOM (VDOM)** is a programming concept where a virtual representation of the UI is kept in memory and synced with the real DOM using libraries like React. Instead of directly manipulating the browser DOM (which is slow), React updates a virtual DOM. When state changes, React compares the new VDOM with the previous one using a **diffing algorithm**, calculates the minimal set of changes needed (patches), and applies only those to the actual DOM (reconciliation). This results in **faster UI updates** and better performance.

### 2. How does React handle state updates in function vs class components?

In function components, state is managed using **hooks** like `useState`, introduced in React 16.8. These allow functional components to have internal state. In class components, state is managed using `this.state` and updated via `this.setState()`. Hooks provide a more flexible and cleaner syntax compared to class lifecycle methods.

### 3. What is the purpose of `useEffect` and when does it run?

`useEffect` is a hook that runs **side effects** such as fetching data, setting up subscriptions, or manipulating the DOM. It runs **after the render**, and can be controlled using a dependency array. It behaves similarly to `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

### 4. Explain the difference between `props` and `state`.

* **Props**: Read-only data passed from parent to child. Cannot be modified by the receiving component.
* **State**: Local and mutable data within the component, managed via `useState` or `this.setState()`.

### 5. What is Client-Side Routing in React?

Client-side routing allows navigation between views without refreshing the entire page. This is achieved using libraries like `react-router`, where route changes update the URL and swap components dynamically using JavaScript.

### 6. What is the difference between `pages/` and `app/` in Next.js?

* **`pages/`**: File-based routing with pre-Next 13 API (uses `getStaticProps`, `getServerSideProps`).
* **`app/`**: Introduced in Next 13. Supports React Server Components, layouts, nested routing, and modern APIs like `loading.tsx`.

### 7. What is hydration?

Hydration is the process of attaching event listeners and React state to static HTML rendered on the server or during build. This makes static content interactive on the client side.

### 8. Different ways to fetch data in Next.js:

* `getStaticProps` (SSG): Fetch data at build time.
* `getServerSideProps` (SSR): Fetch data on every request.
* `getInitialProps`: Legacy approach; works on both server and client.
* Client-side fetch via `useEffect` or SWR/React Query.

### 9. Purpose of the `key` prop in React:

Used to uniquely identify elements in a list. Helps React efficiently update or reorder list items during re-renders by matching keys between renders.

### 10. How to prevent unnecessary re-renders?

* Use `React.memo` to memoize functional components.
* Use `useMemo` to memoize values.
* Use `useCallback` to memoize functions.
* Avoid inline object/function definitions in JSX.

---

## 🟡 Medium Level

### 1. How to lazy load components?

Use `React.lazy()` or `Next.js dynamic import()` to load components on demand.

```js
const LazyComponent = React.lazy(() => import('./MyComponent'));
```

```js
const DynamicComponent = dynamic(() => import('./HeavyComponent'));
```

### 2. How does code splitting work?

Code splitting divides your JavaScript bundle into smaller chunks to reduce initial load time. Next.js automatically splits code at the page level, and React supports it via `React.lazy()` and dynamic imports.

### 3. Memoization:

* `React.memo`: Prevents component re-renders when props haven’t changed.
* `useMemo`: Caches computed values between renders.
* `useCallback`: Caches function references.
  These tools are used to optimize performance, especially in large component trees.

### 4. Image optimization:

Use Next.js `<Image>` component for:

* Lazy loading
* Responsive resizing
* Compression and format conversion (e.g., WebP)

### 5. Improving CRA app performance:

* Use `React.lazy` and `Suspense`
* Optimize assets and images
* Remove unused code
* Apply tree-shaking and bundle analysis
* Enable gzip/Brotli compression

### 6. Differences between getStaticProps, getServerSideProps, and getInitialProps:

| Function             | When it runs  | Use case                                       |
| -------------------- | ------------- | ---------------------------------------------- |
| `getStaticProps`     | At build time | Static content (blogs, docs)                   |
| `getServerSideProps` | Per request   | Real-time content (auth, dashboards)           |
| `getInitialProps`    | Legacy        | Universal rendering (deprecated in App Router) |

### 7. Next.js routing benefits:

* File-based structure
* Built-in SSR/SSG support
* Automatic route-based code splitting
* Great for SEO compared to `react-router`

### 8. Shallow Routing:

Allows URL updates without re-running data fetching methods like `getServerSideProps`. Useful for client-side tab switching, filters.

### 9. Global State Management:

* Context API (small apps)
* Redux Toolkit, Zustand, Jotai (medium/large apps)
* Recoil for atomic state

### 10. CSR vs SSR vs SSG:

| Type | Rendered  | SEO    | Data Freshness        |
| ---- | --------- | ------ | --------------------- |
| CSR  | On client | ❌ Poor | ✅ Always fresh        |
| SSR  | On server | ✅ Good | ✅ Real-time           |
| SSG  | At build  | ✅ Best | ❌ Static (unless ISR) |

---

## 🔴 Hard Level

### 1. How to optimize deeply nested state updates in React?

When state is deeply nested (e.g., user.profile.settings.theme.color), updates can trigger unnecessary re-renders. Use `useReducer` instead of multiple `useState` calls for complex state. Normalize deeply nested state. Use memoized selectors or Zustand for state slicing. Avoid prop drilling with Context API.

Optimization strategies:
- ✅ Use useReducer: More manageable for complex, nested updates.
- ✅ Normalize the state: Flatten nested structures like Redux does — store by ID.
- ✅ Avoid prop drilling: Use Context API or a state manager like Zustand/Redux.
- ✅ Memoize selectors: Use useMemo or libraries like reselect to avoid recalculating derived data.
- ✅ Split components: Lift deeply nested components into their own memoized containers.

### 2. How does React Reconciliation work internally?

React maintains a virtual DOM and compares it with the previous virtual DOM tree using a diffing algorithm. It identifies changes (additions, deletions, updates) and efficiently patches only the changed nodes into the real DOM.
- React keeps a virtual DOM tree.
- On state/prop changes, it creates a new virtual DOM.
- Then it diffs the old and new virtual DOMs, identifying changes.
- Changes are batched and committed efficiently to the real DOM.
- Keys (key prop) help React track which elements changed, improving performance.
- Example: If you reorder a list without keys, React re-renders all items. With keys, it knows what changed.

### 3. Multi-language (i18n) and SEO-optimized Next.js app:

Use `next-i18next` for translation. Generate localized routes (`/en`, `/fr`). Use `getStaticProps` with i18n files. Add SEO-friendly meta tags and hreflang headers for crawlers.
- ✅ Use next-i18next or next-intl to manage translations.
- ✅ Structure translation files like /locales/en/common.json, /locales/fr/common.json.
- ✅ Localize routes: /en/about, /fr/about.
- ✅ Use getStaticProps to pre-render translated content.
- ✅ Add SEO elements:
- <html lang="en">, dynamic titles and meta descriptions.
- hreflang tags in <head> for search engines.

### 4. Prevent layout shifts and improve CLS:

* Use `width` and `height` attributes in `<Image>`
* Use placeholders/skeletons for dynamic content
* Preload fonts properly
* Avoid inserting content above existing DOM structure

### 5. Large-scale eCommerce architecture:

* Use SSG with ISR for product pages
* SSR for cart, checkout (user-specific)
* CSR for admin/dashboard
* Global state using Redux Toolkit or Zustand
* CDN and edge caching for high traffic

### 6. Server-side caching in Next.js:

Implement HTTP caching via headers (`Cache-Control`, `ETag`). Use Redis or in-memory caches. Middleware can short-circuit requests if cached. Use ISR for automatic regeneration of stale pages.
- Set Cache-Control headers: max-age, s-maxage, stale-while-revalidate.
- Use middleware to check for cached responses.
- Use Redis/Memcached for API route caching.
- Use revalidate in getStaticProps for ISR.

```
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60, // regenerate every 60s
  };
}
```

### 7. Securing multi-tenant apps:

* Use middleware to inject tenant ID based on subdomain/header
* Authenticate via JWT or sessions
* Protect SSR pages via `getServerSideProps`
* Isolate tenant data in DB based on `orgId`
### API Routes:
- Authenticate requests using JWT, session cookies, or next-auth.
- Use middleware to inject tenantId from subdomain or headers.
- Sanitize and validate all input.

### SSR Pages:
- In getServerSideProps, check user session.
- Redirect unauthorized users to login.
- Filter DB queries by tenantId or orgId.

### 8. React Server Components (RSC):

Server-only React components that never ship JavaScript to client. Used in App Router. Useful for rendering static or read-heavy components. Reduces bundle size.
React Server Components (RSC):

- Are used in Next.js App Router (app/ directory).
- Don’t ship JavaScript to the browser.
- Can reduce bundle size drastically.

### 9. Analytics, logging & monitoring:

Use Sentry, LogRocket for real-time error tracking. Integrate GA4 with `next/script`. Track Core Web Vitals (LCP, FID, CLS) using Next.js telemetry and Lighthouse.
1. Tools & Strategies:
- Error Tracking: Sentry, LogRocket, or Bugsnag.
- Analytics: GA4, Fathom, Mixpanel, or PostHog.
- Performance: Lighthouse, Web Vitals (next/web-vitals).
- Log custom events (e.g., CTA clicks, conversions).
- Monitor Core Web Vitals (TTFB, LCP, CLS, FID) via Google Search Console.

### 10. How would you build a custom hook for debounced search input with fetch & abort support?

Use a custom `useEffect` with `setTimeout` and `AbortController`:

```
import { useState, useEffect } from 'react';

export const useDebouncedFetch = (query, delay = 300) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${query}`, { signal: controller.signal })
        .then(res => res.json())
        .then(setData)
        .catch(err => {
          if (err.name !== 'AbortError') console.error(err);
        });
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return data;
};

```
- Prevents flooding the API with unnecessary calls.
- Cancels stale requests if the query changes quickly.