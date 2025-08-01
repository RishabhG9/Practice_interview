# Important Questions

# 1. 🔐 What is Private Routing / Protected Route?
Private or Protected Routes refer to restricting access to certain pages or API endpoints based on authentication (user is logged in) and sometimes authorization (user has permission/role). By checking token

### ✅ Goal:
Prevent unauthenticated users from accessing pages like:
- /dashboard
- /profile
- /admin

## 🧠 Backend Perspective (Express / NestJS)
### ✅ Goal:
- Restrict access to API routes based on:
- Authentication (is user logged in)
- Authorization (does user have the right role: admin/user)
- const token = req.headers.authorization;

## 🎯 Summary: Frontend vs Backend Protection
| Feature               | Frontend                                     | Backend                                     |
| --------------------- | -------------------------------------------- | ------------------------------------------- |
| Purpose               | Hide/protect UI routes/pages                 | Protect API endpoints                       |
| Auth check            | Token in localStorage/cookie/context         | Token in `Authorization` header             |
| Technique             | Route wrappers, `getServerSideProps`, Guards | Middleware (Express), Guards (NestJS)       |
| Role check (optional) | On page load (conditional rendering)         | Inside middleware/guard or controller logic |
| Error Handling        | Redirect to login page                       | Return 401 or 403                           |

# 2. What is JWT, Headers, Password Hashing, Authorization, authentication and RBAC
## ✅ JWT stands for JSON Web Token
- It's a compact, URL-safe, and stateless method for securely transmitting information between parties as a JSON object.
- Commonly used for Authentication (Who are you?)
- Also used for Authorization (What are you allowed to do?)

### 🧱 Structure of a JWT
- A JWT has three parts separated by dots (.):
- <Header>.<Payload>.<Signature>

### 🧩 Breakdown:
1. Header (Base64 encoded JSON)
   1. Defines metadata:
```
   {
  "alg": "HS256",       // algorithm used
  "typ": "JWT"
}
```

2. Payload (Base64 encoded JSON)
   1. Carries user data (e.g., user ID, role, email):

 ```
{
  "userId": 123,
  "email": "user@example.com",
  "role": "admin",
  "exp": 1712345678
}
 ```
 
3. Signature
  - Ensures token integrity. Created by hashing:
  - HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

### 🔄 How is a JWT used?
- User logs in (email + password).
- Server validates credentials.
- Server generates a JWT and sends it back.
- Client stores the JWT (in localStorage, cookie, etc).
- Every request includes the JWT in the Authorization header:
- Server verifies JWT and gives access if valid.

## 🔑 Password Handling in Backend

### 🧂 Why can't we store passwords as plain text?
- If database leaks, plaintext passwords are exposed.
- Instead, we hash and salt them.
- Bcrypt is most commonly used package to handle password hashing and salting

### 🧮 Hashing = irreversible encryption
Converts password into a fixed-length scrambled string (e.g., 60 characters)

### 🧂 What is Salting?
- Add a random string (salt) to the password before hashing.
- Prevents rainbow table attacks (precomputed hash lists).
- 🔐 Even if two users have the same password, their hashes will be different due to different salts.

## 🔑 Authentication vs Authorization
| Feature         | Authentication               | Authorization                       |
| --------------- | ---------------------------- | ----------------------------------- |
| 📌 Purpose       | Verifies **who** the user is | Verifies **what** the user can do   |
| 🛂 Example       | Login using email & password | Can this user access `/admin` page? |
| 🔑 Tools         | JWT, sessions, OAuth         | RBAC, ACL, scopes                   |
| 📍 Happens when? | Always comes **first**       | Happens **after** authentication    |
| ✅ Result        | Returns a user identity      | Returns permissions/denied          |

## 🔐 What is RBAC (Role-Based Access Control)?

| Concept        | Description                                      |
| -------------- | ------------------------------------------------ |
| **User**       | A person using your app                          |
| **Role**       | A label (admin, manager, editor, viewer)         |
| **Permission** | What a role is allowed to do                     |
| **Resource**   | The data being accessed (e.g., documents, users) |


## 🔐 Secure Workflow Summary
- 🔐 User signs up → Password is hashed with bcrypt + salt.
- 🛂 User logs in → Credentials verified → JWT created.
- 🎫 Token sent to client → stored in cookies/localStorage.
- 📲 Client sends token in Authorization header for all requests.
- 🧠 Server verifies token → Decodes user → Injects into request.
- 🔐 Middleware checks roles/permissions before allowing access.
- 🚫 If any check fails → return 401 or 403.

# 3. What is local storage, session storage, cookie, header and how is it used in frontend and backend perspective

## 🗄️ Local Storage
- A Web Storage API that stores key-value pairs in the browser.
- Persistent storage: survives page reloads and browser restarts.
- Max size: ~5-10MB (depends on browser)
```
// Save
localStorage.setItem('token', 'jwt_token_here');

// Read
const token = localStorage.getItem('token');

// Delete
localStorage.removeItem('token');
```

## 🧾 Session Storage
- Similar to Local Storage, but scoped to a single tab/session.
- Gets cleared when the browser tab or window is closed.
```
// Save
sessionStorage.setItem('email', 'user@example.com');

// Read
const email = sessionStorage.getItem('email');

// Delete
sessionStorage.clear();
```

## 🍪 Cookies
Small pieces of data (max ~4KB) stored on the client and sent automatically with every request to the backend for matching domains.

### Frontend use
```
// Using JS
document.cookie = "token=jwt_token; path=/; max-age=3600";

// Read cookie
console.log(document.cookie);

// With libraries (js-cookie)
Cookies.set('token', 'jwt_token', { expires: 7 });
```

### Backend Use
```
// Set cookie
res.cookie('token', jwtToken, { httpOnly: true, secure: true });

// Read cookie
const token = req.cookies.token;
```

## Headers
- Metadata sent with HTTP requests/responses.
- Carries control info like content type, authentication, etc.
```
// Send Authorization header with token
fetch('/api/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 🧠 Comparison Table: LocalStorage vs SessionStorage vs Cookies vs Headers
| Feature           | LocalStorage        | SessionStorage      | Cookies                | Headers                  |
| ----------------- | ------------------- | ------------------- | ---------------------- | ------------------------ |
| 🔁 Lifespan        | Until cleared       | Until tab closed    | Expire per config      | Per request (temporary)  |
| 📦 Size Limit      | \~5MB               | \~5MB               | \~4KB                  | No strict limit          |
| 📡 Sent to Server? | ❌ No                | ❌ No                | ✅ Yes (automatically)  | ✅ Yes (manual)           |
| 🔐 Security        | ❌ Vulnerable to XSS | ❌ Vulnerable to XSS | ✅ Can use HttpOnly     | ✅ Secure via HTTPS       |
| 📍 Use Case        | Tokens, themes      | Temp forms          | Sessions, JWT          | Auth, CORS, content-type |
| 🛠 Accessed by     | JS only             | JS only             | JS + Server (optional) | Frontend + Backend       |

## ✅ Best Practices by Use Case
| Use Case                          | Best Option                          |
| --------------------------------- | ------------------------------------ |
| Store temporary tab state         | `SessionStorage`                     |
| Store persistent theme/preference | `LocalStorage`                       |
| Store JWT securely                | `HttpOnly Cookie` (not localStorage) |
| Authenticate API requests         | Use `Authorization` header           |
| Maintain login state across tabs  | Cookie or Redux store synced         |
| Sensitive data (tokens)           | Cookies with `HttpOnly` + `Secure`   |

## 📦 Real World Example: JWT Auth with Cookie + Header
Login Flow:
- Frontend submits credentials
- Backend validates and sends JWT in HttpOnly Cookie
- Frontend doesn’t access token directly
- On every request, browser sends the cookie
- Backend reads JWT from cookie and verifies
- Optionally sends role-based data using res.setHeader()

# 🧠 4. useState and useEffect — Full Breakdown

## useState – State Management Hook
useState is a React Hook used to create and manage local state inside functional components.

## useEffect – Side Effect Hook
useEffect is used to perform side effects in functional components.

### Run once on mount (componentDidMount)
```
useEffect(() => {
  console.log('Component mounted');
}, []);
```

### Run on specific dependency change
```
useEffect(() => {
  console.log(`Count changed to ${count}`);
}, [count]);
```

### Cleanup on unmount (componentWillUnmount)
```
useEffect(() => {
  const interval = setInterval(() => console.log('Tick'), 1000);

  return () => {
    clearInterval(interval); // cleanup
  };
}, []);
```

### 🔄 Lifecycle Equivalents
| Class Component Lifecycle | useEffect Equivalent                          |
| ------------------------- | --------------------------------------------- |
| `componentDidMount`       | `useEffect(() => {...}, [])`                  |
| `componentDidUpdate`      | `useEffect(() => {...}, [deps])`              |
| `componentWillUnmount`    | `useEffect(() => { return () => {...} }, [])` |

## 🔂 useState vs useEffect – Quick Recap
| Feature          | `useState`                         | `useEffect`                            |
| ---------------- | ---------------------------------- | -------------------------------------- |
| Purpose          | Store and update state             | Run side effects                       |
| Input            | Initial state                      | Effect function and dependency array   |
| Output           | `[state, setState]` array          | No return; may return cleanup function |
| Triggers         | On UI event or logic               | On mount, update, or unmount           |
| Common use cases | Counter, form state, toggle, flags | API calls, subscriptions, timers       |


# 5. parent-to-child and child-to-parent communication in React, and how to optimize their render performance:

## Parent to Child Communication (Props)
In react,  data flows unidirectionally from parent to child through props (i.e., component parameters).
```
<Child name="Himanshi" age={25} />

// Child.tsx
function Child({ name, age }) {
  return <p>{name} is {age} years old</p>;
}
```

### ⚠️ Rendering Problem:
- When parent re-renders, child will also re-render, even if props are the same.
- ✅ React.memo prevents unnecessary re-renders if props didn’t change (uses shallow comparison).
```
const Child = React.memo(({ name, age }) => {
  console.log('Child rendered');
  return <p>{name} is {age} years old</p>;
});
```

### ⚠️ Edge Case:
If props are objects/functions, memo won't work unless you stabilize them.
- This will render always 
```
<Child config={{ theme: 'dark' }} />
```

- Full Example with Optimization
```
const Parent = () => {
  const [count, setCount] = useState(0);

  const user = useMemo(() => ({ name: "Himanshi" }), []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoizedChild user={user} />
    </>
  );
};

const MemoizedChild = React.memo(({ user }) => {
  console.log("Child rendered");
  return <p>Hello, {user.name}</p>;
});
```

## Child to Parent Communication (Callback Props)
You pass a function from parent to child as a prop, and the child calls it to send data back.

```
// Parent
<Child onMessage={(msg) => console.log(msg)} />

// Child
<button onClick={() => onMessage("Hello from child!")}>Send</button>
```

### 🛠 Optimization with useCallback
### ⚠️ Without optimization:
- Every render creates new function reference:
```
<Child onMessage={() => console.log("Hi")} />
```
- This will trigger child re-render even if child is memoized.

### ✅ Full Example with Optimization:
```
const Parent = () => {
  const [count, setCount] = useState(0);

  const handleChildClick = useCallback((msg) => {
    console.log("Received from child:", msg);
  }, []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Inc</button>
      <MemoChild onClick={handleChildClick} />
    </>
  );
};

const MemoChild = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={() => onClick("Hello Parent")}>Send Msg</button>;
});
```

## 🧠 Summary: Optimization Checklist
| Use Case                           | Problem              | Fix / Optimization                       |
| ---------------------------------- | -------------------- | ---------------------------------------- |
| Parent updates child unnecessarily | Parent re-renders    | Use `React.memo()`                       |
| Props are objects/functions        | Breaks memo          | Use `useMemo` or `useCallback`           |
| Child calls parent handler         | New function created | Use `useCallback()`                      |
| Nested children or large trees     | Frequent re-renders  | Use memo + lifting state up where needed |


# 6. ⚙️ What is Middleware?
A function that runs before the actual request handler (route/controller) and has access to the request (req), response (res), and next middleware in the stack.

### Middleware Life Cycle
`Client Request → Middleware1 → Middleware2 → Route Handler → Response`

🧩 Middleware receives 3 arguments:
- (req, res, next) => { ... }
| Parameter | Meaning                          |
| --------- | -------------------------------- |
| `req`     | Incoming request object          |
| `res`     | Response object to send response |
| `next`    | Function to pass control to next |

# 7. Promises, callbacks, and async/await are essential for handling asynchronous operations

## What is a Callback?
✅ A callback is a function passed as an argument to another function, to be called after an operation completes.

```
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // Data received
});
```

### ❌ Problems with Callbacks:
- Callback Hell (nested structure)
- Hard to read/maintain
- Error handling is tricky

## 🚀 2. What is a Promise?
✅ A Promise is an object that represents the eventual result (or failure) of an asynchronous operation.

### Promises States
| State       | Description                      |
| ----------- | -------------------------------- |
| `pending`   | Initial state                    |
| `fulfilled` | Operation completed successfully |
| `rejected`  | Operation failed                 |

### Creating Promises
```
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Data loaded");
  } else {
    reject("Failed to load data");
  }
});
```

### 🧭 Handling with .then() and .catch()
```
myPromise
  .then((result) => {
    console.log(result); // Data loaded
  })
  .catch((error) => {
    console.log(error); // Failed to load data
  });
```

## 🧵 3. Advanced Promise Patterns
### Promise.all()
Runs multiple promises in parallel and waits for all to finish.
```
Promise.all([
  fetch('/api/user'),
  fetch('/api/settings'),
  fetch('/api/notifications'),
])
.then(([user, settings, notifications]) => {
  // All succeeded
})
.catch(err => {
  // If **any one fails**, catch is triggered
});
```

### Promise.allSettled()
Waits for all promises to finish, regardless of success or failure.
```
Promise.allSettled([
  Promise.resolve("A"),
  Promise.reject("B"),
  Promise.resolve("C"),
])
.then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('✅', result.value);
    } else {
      console.log('❌', result.reason);
    }
  });
});
```

### Promise.race()
Returns the first completed promise (resolved or rejected).
```
Promise.race([
  fetch('/slow'),
  fetch('/fast'),
]).then((res) => {
  console.log('First completed', res);
});
```

### Promise.any()
Resolves as soon as one promise succeeds. Ignores rejections unless all fail.
```
Promise.any([
  Promise.reject("Fail 1"),
  Promise.resolve("Success"),
  Promise.reject("Fail 2"),
]).then((result) => {
  console.log("✅", result); // "Success"
});
```

### Promise chaining
Chain .then() calls to run tasks in sequence.
```
fetchData()
  .then((res) => process(res))
  .then((finalResult) => display(finalResult))
  .catch((err) => console.error(err));
```

## Async/Await — Cleaner Promise Syntax
- ✅ async turns a function into one that returns a promise
- ✅ await pauses execution until promise resolves

### Basic Example
```
async function loadData() {
  try {
    const res = await fetch('/api/data');
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### chaining with Async
```
async function processUser() {
  try {
    const user = await fetchUser();
    const orders = await fetchOrders(user.id);
    const summary = await summarize(orders);
    console.log(summary);
  } catch (err) {
    console.error(err);
  }
}
```

# 8. 🌐 What is CORS?

**CORS** stands for **Cross-Origin Resource Sharing**. It is a **security feature** implemented by **browsers** to **control how web pages from one origin can access resources from another origin**.

---

## 🧠 Why CORS Exists?

Modern browsers restrict **cross-origin HTTP requests** initiated by scripts (e.g. `fetch`, `XMLHttpRequest`) for **security reasons**.

This prevents **malicious websites** from accessing sensitive data from another domain **without permission**.

> ❌ By default, the browser **blocks frontend code** from making requests to a different origin unless the server explicitly allows it.

---

## 🔍 What is "Origin"?

An **origin** is defined by:

> protocol + domain + port


| URL                             | Origin          |
|----------------------------------|------------------|
| `https://example.com`            | `https://example.com` |
| `http://example.com`             | Different (HTTP vs HTTPS) |
| `https://api.example.com`        | Different (subdomain) |
| `https://example.com:3000`       | Different (port change) |

---

## ⚠️ CORS Error Example

When frontend tries to call a backend API at a different origin:

```js
fetch("https://api.example.com/data")
If CORS isn’t configured correctly on the backend, you get:

Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000' has been blocked by CORS policy
```

### ✅ How CORS Works
The browser sends an extra Origin header:
```
Origin: http://localhost:3000
```
Then the backend must respond with the right Access-Control-Allow-Origin header:
```
Access-Control-Allow-Origin: http://localhost:3000
```
If the response is missing or incorrect, browser blocks the response.


### Summary
| Key Concept                 | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| CORS                        | A browser security feature to restrict cross-origin requests |
| Origin                      | Protocol + Domain + Port                                     |
| Preflight                   | Extra OPTIONS request for non-simple requests                |
| Access-Control-Allow-Origin | Must be set by the backend                                   |
| Tools                       | `cors` package in Express, `enableCors()` in NestJS          |

# 🔄 Redux – Full Explanation

Redux is a **state management library** for JavaScript applications (especially React). It allows you to **manage global state** in a predictable, centralized, and scalable way.

---

## 📦 Why Use Redux?

- Manage state across multiple components
- Predictable updates through a single source of truth (the Store)
- Debuggable with DevTools
- Scalable for large applications

---

# 🧠 Core Concepts of Redux

---

## 🧰 1. Store

The **Store** is the central **state container** in Redux. It holds the entire application state as a **single JavaScript object**.

```ts
import { createStore } from 'redux';
const store = createStore(reducer);
```

## 🎬 2. Actions
Actions are plain JS objects that describe what happened.
```
const INCREMENT = 'INCREMENT';

const incrementAction = {
  type: INCREMENT,
  payload: 1,
};
```

## ⚙️ 3. Reducer
Reducers are pure functions that take the current state and action, and return a new state.
```
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload };
    default:
      return state;
  }
}
```

## 🔗 4. Dispatch
dispatch(action) sends an action to the store to update the state via reducer.
```
store.dispatch({ type: 'INCREMENT', payload: 1 });
```

### 🧪 useDispatch
Dispatches actions to update state.

### 🧪 useSelector
Reads data from the Redux store.

## 🔧 Middleware in Redux
Middleware lets you handle side effects (like API calls, logging) before the action reaches the reducer.

### ✅ Common Middleware Examples:
- redux-thunk – handle async logic
- redux-logger – log actions and state
- redux-saga – complex side effects with generators

## Summary Table
| Concept     | Description                         |
| ----------- | ----------------------------------- |
| Store       | Holds the global state              |
| Actions     | Describe what happened              |
| Reducers    | Define how state changes            |
| Dispatch    | Sends action to reducer             |
| useSelector | Read from store                     |
| useDispatch | Dispatch actions                    |
| Middleware  | Intercepts actions for side effects |
| Selectors   | Extract specific data from store    |

# 10. Rate Limiting and API Scalability for 1+ million users

# 🚦 What is Rate Limiting in an API?

**Rate limiting** is a technique used to control how many requests a client (user, IP, or token) can make to an API within a specific time window.

It is a crucial part of **API security, reliability, and scalability**.

---

## 🧠 Why Use Rate Limiting?

| Purpose                        | Benefit                                        |
|-------------------------------|------------------------------------------------|
| 🚫 Prevent abuse               | Stops bots from overwhelming the system       |
| 🧯 Protect backend resources    | Controls traffic to avoid server overload     |
| ⏱ Fair usage enforcement       | Ensures fair access among users               |
| 🔐 Prevent brute-force attacks | Limits login attempts, protects auth APIs     |

---

## 🧪 Example of Rate Limiting Rules

- **60 requests per minute per IP**
- **10 login attempts per 5 minutes**
- **1000 requests/day per API key**

---

## ⚙️ How Rate Limiting Works

Each incoming request is evaluated against a **rate limiter** (usually stored in memory, Redis, or DB). If the request exceeds the limit:

- API returns `429 Too Many Requests`
- Response headers include retry info:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
```
## 🧰 How to Implement Rate Limiting
### ✅ Node.js with express-rate-limit
```
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, try again later.'
});

app.use('/api/', limiter);
```
### ✅ Advanced: Redis-based Rate Limiting (Scalable)
Use rate-limiter-flexible with Redis:
```
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const redisClient = new Redis();

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 100, // Max 100 requests
  duration: 60, // Per 60 seconds
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch {
    res.status(429).send('Too many requests');
  }
});
```

## 📈 How to Scale an API for 1+ Million Users
### 🏛️ 1. Stateless API Design
- Store sessions using JWT (no server memory)
- Avoid storing state in application memory

### ☁️ 2. Use Load Balancers
- `Distribute traffic across multiple servers`
- Tools: AWS ELB, NGINX, HAProxy

### 🧩 3. Horizontal Scaling
- `Add more application servers (scale-out)`
- `Use container orchestration (Docker + Kubernetes)`

### ⚙️ 4. Caching
| Type        | Use Case                  | Tools              |
| ----------- | ------------------------- | ------------------ |
| CDN Caching | Static files              | Cloudflare, Akamai |
| API Caching | Cache API responses       | Redis, Varnish     |
| DB Caching  | Cache repeated DB queries | Redis, Memcached   |

### 🧰 5. Use a Reverse Proxy
- Offload SSL, compression, and routing
- Tools: NGINX, Traefik, API Gateway

### 🔁 6. Database Optimization
- `Index frequently queried fields`
- Use read replicas
- `Optimize queries (avoid joins, large payloads)`

### 📚 7. Pagination and Throttling
- `Don’t return entire dataset`
- `Use query params:`
```
GET /users?page=2&limit=50
```

### 🔐 8. Rate Limiting and API Key Management
- `Apply rate limiting per user/IP/token`
- Rotate API keys for long-term users

### 📦 9. Message Queues for Async Tasks
- `Offload time-consuming tasks (emails, processing, image compression) to background queues.`
- Tools: RabbitMQ, Kafka, BullMQ (Node.js)

### 🔍 10. Monitoring & Auto-scaling
- Tools: Prometheus, Grafana, New Relic, Datadog
- Scale pods/instances automatically based on CPU or request load

## 🧠 Summary: Rate Limiting + Scalability
| Feature      | Rate Limiting                    | Scalable API                             |
| ------------ | -------------------------------- | ---------------------------------------- |
| Purpose      | Prevent abuse, DDoS, brute-force | Handle millions of requests/users        |
| Tools        | `express-rate-limit`, Redis      | Load Balancer, Redis, Queue, CDN         |
| API Response | 429 Too Many Requests            | 200 OK (Fast and Efficient)              |
| Strategy     | Time-based limit per IP/user     | Stateless, cached, horizontally scalable |
| Caching      | Optional                         | Essential                                |
| Database     | Irrelevant                       | Needs indexing, scaling, replica         |

# 11. Horizontal and Vertical Scaling and Load Balancer

## ⚖️ Load Balancer & Scaling Strategies Explained

---

## 🚦 What is a Load Balancer?

A **Load Balancer** is a system that automatically distributes incoming network traffic across multiple servers.

### 🧠 Why Use a Load Balancer?

- Ensures **high availability** and **fault tolerance**
- Improves **performance** by distributing traffic
- Prevents **server overload**
- Supports **scalability**

---

### 🧩 How Load Balancers Work

```
Client Requests
↓
+------------------+
| Load Balancer |
+------------------+
↓ ↓ ↓
Server1 Server2 Server3
```


### 📊 Types of Load Balancers

| Type                    | Description                                      |
|-------------------------|--------------------------------------------------|
| **Layer 4 (Transport)** | Operates on TCP/UDP (IP + Port-based routing)    |
| **Layer 7 (Application)** | Operates on HTTP/HTTPS (URL/Headers-based routing) |

---

### ✅ Load Balancing Algorithms

| Algorithm      | Description                                      |
|----------------|--------------------------------------------------|
| Round Robin    | Evenly rotates through servers                   |
| Least Connections | Sends traffic to the server with fewest active connections |
| IP Hash        | Routes based on client IP                        |
| Weighted       | Some servers get more traffic (based on capacity) |

---

### 🛠 Popular Load Balancers

- **NGINX**
- **HAProxy**
- **AWS Elastic Load Balancer (ELB)**
- **Google Cloud Load Balancer**
- **Azure Load Balancer**
- **Kubernetes Ingress Controllers**

---

## ⬆️ Vertical Scaling

> Increasing the capacity (CPU, RAM, etc.) of a **single machine/server**.

### ✅ Pros

- Simple setup
- No need for distributed systems
- Fewer coordination issues

### ❌ Cons

- **Hardware limits**
- Downtime during upgrades
- Not fault tolerant (if server crashes, all users are affected)

### 📦 Use Case Examples

- Small apps or MVPs
- Single-instance databases
- When you need **quick performance improvement** without adding more complexity

---

## ↔️ Horizontal Scaling

> Adding **more machines/instances** to handle increased load.

### ✅ Pros

- **Highly scalable**
- **Fault-tolerant** (failure in one node doesn't crash the system)
- Enables **distributed systems and microservices**

### ❌ Cons

- More complex to manage
- Requires **load balancing**
- Potential for **data consistency challenges**

### 📦 Use Case Examples

- High-traffic websites
- Real-time messaging apps
- SaaS platforms
- Distributed databases and microservices

---

## 🔁 Detailed Comparison Table

| Feature               | Vertical Scaling                    | Horizontal Scaling                 |
|-----------------------|--------------------------------------|------------------------------------|
| 🔄 Scaling Method     | Add more power to **one server**     | Add **more servers/instances**     |
| ⚙️ Infrastructure     | Simple (single machine)              | Distributed (multiple machines)    |
| 📈 Scalability        | Limited by hardware                  | Virtually unlimited                |
| 💥 Failure Impact     | Full system goes down                | One node can fail safely           |
| 🔄 Deployment         | Restart required for upgrade         | Zero downtime (add/remove nodes)   |
| 🛠 Cost               | Cheaper initially                    | Cost-effective at scale            |
| 🔧 Management         | Easy                                 | Complex (orchestrators needed)     |

---

## 🤔 When to Use Which?

| Situation                                   | Recommended Scaling         |
|---------------------------------------------|-----------------------------|
| MVP, low traffic                            | Vertical                    |
| Need quick performance boost                | Vertical                    |
| Scaling beyond single machine               | Horizontal                  |
| Global users and high availability required | Horizontal                  |
| Need fault-tolerance                        | Horizontal                  |
| Cost-saving at scale                        | Horizontal + Auto-scaling   |

---

## 🏗 Real-World Architecture Example (1M+ Users)

1. **Frontend:** React/Next.js
2. **API Servers:** Node.js (Horizontally scaled behind Load Balancer)
3. **Load Balancer:** AWS ELB or NGINX
4. **Database:** PostgreSQL (vertical master + horizontal read replicas)
5. **Cache Layer:** Redis (sharded or clustered)
6. **Queues:** RabbitMQ/Kafka
7. **CDN:** Cloudflare for asset delivery

---

## 🔐 Bonus: Scaling with Auto-scaling

- Cloud providers support **Auto Scaling Groups (ASG)** to automatically add/remove servers based on CPU/RAM/network usage
- Examples: **AWS Auto Scaling**, **GCP Instance Groups**, **Kubernetes HPA**

---

## 📚 Further Resources

- [NGINX Load Balancing Guide](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- [AWS Elastic Load Balancing Docs](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/)
- [Horizontal Pod Autoscaler (K8s)](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

# 12. 🏗️ Monolithic vs Microservices Architecture

---

## 🧱 What is a Monolithic Architecture?

A **Monolithic Architecture** is a **single, unified codebase** where all components of the application (frontend, backend, business logic, database access) are combined into **one large application**.

### 🧩 Typical Monolith Layers:
```
Client → HTTP API → Business Logic → Database Access → DB
(All in one codebase and deployable unit)
```

### 📦 Example:

A single Node.js or Django app that handles:

- User Authentication
- Admin Dashboard
- Product Catalog
- Payment Integration

All inside one Git repo and deployed together.

---

## ⚙️ What is a Microservices Architecture?

**Microservices Architecture** breaks the application into **independent, self-contained services**, each responsible for a specific business capability.

### 🧩 Structure:

> Client → API Gateway → Auth Service
→ Product Service
→ Order Service
→ Payment Service
→ DBs (per service)


Each service:
- Has its own **codebase**
- Is **independently deployable**
- Often has its own **database**

---

## 🆚 Key Differences

| Feature              | Monolithic                              | Microservices                            |
|----------------------|------------------------------------------|-------------------------------------------|
| Codebase             | Single unified codebase                  | Multiple smaller, service-specific repos  |
| Deployment           | Deployed as one unit                     | Independent deployment per service        |
| Scalability          | Scale the entire app                     | Scale services independently              |
| Development Speed    | Fast at early stage                      | Faster with large teams & services        |
| Failure Impact       | One bug can crash the whole app          | Failures are isolated per service         |
| Technology Stack     | Usually one tech stack                   | Can use different stacks per service      |
| Communication        | Internal function calls                  | Inter-service HTTP/gRPC/message queue     |
| DevOps Complexity    | Simple (1 pipeline, 1 server)             | Complex (multiple deployments/pipelines)  |

---

## ✅ When to Use Monolithic Architecture

### 📦 Best For:
- MVPs and startups
- Small teams
- Simple business logic
- Rapid development and deployment

### ✅ Pros:
- Easier to develop, test, and deploy
- Less overhead (infrastructure, DevOps)
- Good tooling and libraries support

### ❌ Cons:
- Harder to scale specific parts
- Risky deployments (single point of failure)
- Slower builds and deployments as app grows

---

## ✅ When to Use Microservices Architecture

### 📦 Best For:
- Large, complex apps
- Multiple engineering teams
- High scalability and modularity needs
- High availability requirements

### ✅ Pros:
- Independent scaling & deployments
- Fault isolation
- Easy to adopt best tools/languages per service
- Fits DevOps & CI/CD pipelines well

### ❌ Cons:
- Increased complexity (network, observability)
- Requires API Gateway, service registry
- Harder to debug across services
- Data consistency issues (eventual consistency)

---

## 🚧 Common Microservices Tools

| Concern           | Tools                                      |
|------------------|---------------------------------------------|
| API Gateway       | NGINX, Kong, AWS API Gateway                |
| Communication     | REST, gRPC, RabbitMQ, Kafka                 |
| Service Discovery | Consul, Eureka                              |
| Monitoring        | Prometheus, Grafana, Jaeger                 |
| Orchestration     | Docker + Kubernetes                         |

---

## 🧠 Transition Strategy

| Stage                     | Suggested Approach            |
|---------------------------|-------------------------------|
| Startups/early dev        | Monolithic                    |
| Growing feature set       | Modular Monolith (domain split)|
| Scaling with teams/users  | Gradually extract microservices|

> 🛠 Tip: Don’t start with microservices unless absolutely needed. Begin with a well-structured monolith and modularize later.

---

## 🧪 Real-World Example

### Monolithic App:
- Django app handling all functionality: blog, user auth, billing
- Single server, deployed via `git push`

### Microservice App:
- Frontend (React)
- Backend services:
  - `auth-service` (Node.js + MongoDB)
  - `billing-service` (Python + PostgreSQL)
  - `notification-service` (Go + Redis)
- Dockerized, deployed via Kubernetes

---

## 📚 Further Reading

- [Martin Fowler – Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)
- [Microservices.io Patterns](https://microservices.io/)
- [12-Factor App Design](https://12factor.net/)

# 13. ☁️ Serverless Framework & AWS Lambda – Explained

---

## ⚙️ What is Serverless?

**Serverless** does **not mean no servers**, but rather that **you don’t manage the servers yourself**. Cloud providers automatically **provision, scale, and manage the infrastructure** for you.

You focus purely on **writing functions and deploying** them.

---

## 🧰 What is the Serverless Framework?

The **Serverless Framework** is an open-source CLI tool to easily:

- Build serverless applications
- Deploy to cloud providers (like AWS Lambda, Azure, Google Cloud)
- Define infrastructure as code (using `serverless.yml`)

---

### 📦 Features:

- Easy deployment (`sls deploy`)
- Supports AWS, Azure, Google Cloud, etc.
- YAML-based configuration
- Plugins for extending functionality
- CI/CD support

---

### 🧪 Basic Example (`serverless.yml`)

```yaml
service: my-app

provider:
  name: aws
  runtime: nodejs18.x

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
```
## 🖥 What is AWS Lambda?
AWS Lambda is a compute service where you can run your code without provisioning or managing servers.

### 📌 Key Characteristics:
| Feature                | Description                                |
| ---------------------- | ------------------------------------------ |
| Event-driven           | Runs on triggers (HTTP, S3, DynamoDB, etc) |
| Stateless              | No stored memory between invocations       |
| Auto-scaling           | Scales based on demand                     |
| Pay-per-use            | Billed only for compute time used          |
| Supports many runtimes | Node.js, Python, Java, Go, .NET, etc.      |

### Example
```
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Lambda!' }),
  };
};
```
### ✅ Triggering Lambda Functions
Lambda can be triggered by:
API Gateway (HTTP requests)
S3 (file upload)
DynamoDB (data change)
EventBridge / CloudWatch (scheduled events)
SNS / SQS (messaging queue)

## 🔁 Serverless vs Traditional Deployment
| Feature      | Serverless (Lambda)       | Traditional Servers                |
| ------------ | ------------------------- | ---------------------------------- |
| Provisioning | Auto-managed by provider  | Manual setup & maintenance         |
| Billing      | Pay-per-execution         | Pay for uptime                     |
| Scaling      | Auto-scaling              | Manual or auto (via load balancer) |
| State        | Stateless                 | Can maintain state                 |
| Deployment   | Via CLI or CI/CD pipeline | SSH / CI-based                     |

## ✅ Benefits of Serverless / Lambda
- 🚀 Fast deployment & easy to scale
- 💰 Cost-efficient for low-to-medium traffic
- 🧱 Great for microservices & event-driven systems
- 📦 Works well with CI/CD and DevOps workflows
- ⏰ Ideal for scheduled tasks (cron jobs)

## ❌ Limitations of Serverless / Lambda
| Limitation         | Detail                                           |
| ------------------ | ------------------------------------------------ |
| Cold start latency | Initial delay when function is idle too long     |
| Timeout limits     | Default timeout: 15 minutes max                  |
| Stateless only     | No in-memory persistence between calls           |
| Vendor lock-in     | Code tightly coupled to AWS / provider services  |
| Debugging          | Harder to debug real-time compared to local apps |

## When to use Serverless
| Scenario                               | Recommendation                    |
| -------------------------------------- | --------------------------------- |
| Rapid development / MVP                | ✅ Perfect match                   |
| Event-based actions (uploads, updates) | ✅ Ideal (e.g., S3 triggers)       |
| APIs with sporadic traffic             | ✅ Cost-effective                  |
| Scheduled/cron jobs                    | ✅ Use with EventBridge/CloudWatch |
| Heavy computation or 24/7 APIs         | ❌ Prefer EC2 / container services |

## 🚀 Serverless Architecture Example
```
Frontend (React) → API Gateway
                   ↓
              AWS Lambda
                ↓
            DynamoDB / S3
```

## Summary
| Concept              | Description                                        |
| -------------------- | -------------------------------------------------- |
| Serverless           | You write and deploy code without managing servers |
| Serverless Framework | Tool to manage and deploy serverless apps          |
| AWS Lambda           | FaaS (Function as a Service) from AWS              |
| Triggers             | Events like HTTP, file upload, DB change           |
| Best Use Cases       | APIs, event handlers, cron jobs, microservices     |
| Limitations          | Cold starts, stateless, timeout limits             |

# 14. 🌐 Understanding URL, HTTP, and HTTPS

---

## 🔗 What is a URL?

**URL** stands for **Uniform Resource Locator**.

It is the **address** used to access a resource (webpage, file, API, etc.) on the internet.

---

### 🧱 Structure of a URL:

https://www.example.com:443/path/to/resource?query=value#fragment


| Part              | Description                                       |
|-------------------|---------------------------------------------------|
| `https`           | **Protocol** (HTTP or HTTPS)                     |
| `www.example.com` | **Domain** (Hostname or IP address)              |
| `:443`            | **Port** (optional – default 443 for HTTPS)      |
| `/path/...`       | **Path** to a specific resource                  |
| `?query=value`    | **Query parameters** (for filtering/searching)   |
| `#fragment`       | **Fragment** (used in-page, e.g. scroll-to)      |

---

## 🌐 What is HTTP?

**HTTP** stands for **HyperText Transfer Protocol**.

It is the **foundation of communication** on the World Wide Web. It defines how **requests and responses** are sent between clients (browsers) and servers.

---

### 🧪 Example HTTP Request:
GET /about HTTP/1.1
Host: www.example.com


### ✅ HTTP Verbs (Methods):

| Method   | Description                      |
|----------|----------------------------------|
| GET      | Retrieve data                    |
| POST     | Send new data                    |
| PUT      | Update existing data             |
| DELETE   | Remove data                      |
| PATCH    | Partially update data            |

---

### ⚠️ Limitations of HTTP

- ❌ Not encrypted
- ❌ Vulnerable to **man-in-the-middle (MITM)** attacks
- ❌ No data integrity
- ❌ Not secure for passwords, credit cards, or APIs

---

## 🔐 What is HTTPS?

**HTTPS** = **HTTP + SSL/TLS encryption**

It ensures that all communication between your browser and the server is:

- ✅ **Encrypted**
- ✅ **Authenticated**
- ✅ **Tamper-proof**

---

### 🔒 How HTTPS Works

1. Browser connects to the server
2. Server provides a **TLS certificate**
3. Browser verifies certificate
4. Encrypted channel is established using **SSL/TLS**
5. HTTP data is transferred over this secure connection

---

### 📜 HTTPS Certificates

Issued by **Certificate Authorities (CA)** like:

- Let's Encrypt
- DigiCert
- GoDaddy
- Sectigo

Certificates include:

- Domain name
- Issuer name
- Expiration date
- Public key

---

## 🧠 HTTP vs HTTPS – Detailed Comparison

| Feature                | HTTP                              | HTTPS                                 |
|------------------------|------------------------------------|----------------------------------------|
| 🔐 Security            | Not secure                         | Encrypted with SSL/TLS                |
| 🌍 Port                | 80                                 | 443                                    |
| 📡 Protocol            | Plaintext                          | Encrypted (SSL/TLS)                   |
| 🔍 URL Prefix          | `http://`                          | `https://`                            |
| 🧾 Certificate Required | ❌ No                              | ✅ Yes (TLS certificate)              |
| 💳 Secure for Payments | ❌ No                              | ✅ Yes                                |
| 🧠 SEO Friendly        | ❌ Lower ranking                   | ✅ Higher ranking (Google prefers HTTPS) |

---

## ✅ When to Use HTTP vs HTTPS

| Use Case                        | Recommended Protocol |
|----------------------------------|-----------------------|
| Personal blog (static)          | HTTPS (free with Let's Encrypt) |
| Login page                      | HTTPS (required!)     |
| E-commerce / payment            | HTTPS (mandatory by PCI-DSS) |
| APIs (public or private)        | HTTPS                 |
| Admin dashboards / panels       | HTTPS                 |
| IoT / mobile apps communication | HTTPS                 |

> ⚠️ Best Practice: **Always use HTTPS** in production.

---

## 🛠 How to Enable HTTPS

1. Buy or issue a **TLS certificate**
2. Configure your web server (NGINX, Apache, etc.)
3. Redirect all HTTP traffic to HTTPS
4. Renew certificates before they expire

---

## 📦 Tools to Help with HTTPS

| Tool          | Purpose                     |
|---------------|-----------------------------|
| Let's Encrypt | Free SSL certificates        |
| Certbot       | Auto-renew certificates      |
| Cloudflare    | SSL proxy, DDoS protection   |
| NGINX/Apache  | SSL configuration for servers|

---

## 🔐 Bonus: Mixed Content Warning

If a **HTTPS** site loads a **HTTP** resource (image, script, etc.), modern browsers will block it.

> ✅ Solution: Ensure **all resources are HTTPS**, including external fonts, APIs, and images.

---

## 🧠 Summary

| Concept     | Description                                        |
|-------------|----------------------------------------------------|
| URL         | The full address to access web resources           |
| HTTP        | Protocol for sending/receiving unencrypted data    |
| HTTPS       | Secure version of HTTP with SSL/TLS encryption     |
| HTTPS Use   | Always prefer for production, APIs, and security   |

---

## 📚 Further Reading

- [MDN – HTTP Overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Let's Encrypt](https://letsencrypt.org/)
- [Cloudflare HTTPS Guide](https://developers.cloudflare.com/ssl/)

# 15. 🔗 URL Shortener, Debounce, and Throttle in JavaScript

---

## 📌 1. URL Shortener – JavaScript Implementation

### ✅ Use Case

- Long URLs are hard to share (e.g., `https://example.com/some/very/long/path`)
- We want to shorten it (e.g., `https://sho.rt/abc123`)
- Used in tools like Bit.ly, TinyURL, etc.

---

### 🧪 Code Example (Simplified, In-Memory Store)

```js
const urls = {}; // In-memory mapping

// Utility to generate a 6-character random code
function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Create short URL
function shortenURL(longUrl) {
  const shortCode = generateShortCode();
  urls[shortCode] = longUrl;
  return `https://sho.rt/${shortCode}`;
}

// Retrieve original URL
function resolveURL(shortUrl) {
  const code = shortUrl.split('/').pop();
  return urls[code] || 'URL not found';
}

// Test
const short = shortenURL("https://www.example.com/blog/my-post");
console.log("Shortened:", short);

const original = resolveURL(short);
console.log("Original:", original);
```

## 🌀 2. Debouncing in JavaScript

✅ Use Case
- Reduce the rate at which a function runs (e.g., search box typing)
- Wait until user stops typing before making a call

```
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Example usage
function searchAPI(query) {
  console.log('Calling API with:', query);
}

const debouncedSearch = debounce(searchAPI, 500);

// Simulate user typing
debouncedSearch("H");
debouncedSearch("He");
debouncedSearch("Hel");
debouncedSearch("Hell");
debouncedSearch("Hello"); // Only this will call API after 500ms
```

### 🧠 Why Use Debounce?
- Prevent too many API calls
- Ideal for input fields, resize events, autocomplete

## 🔁 3. Throttling in JavaScript

### ✅ Use Case
- Limit function execution to once every X milliseconds
- Used in scroll, resize, mousemove, etc.

### 🧪 Throttle Code
```
function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Example usage
function handleScroll() {
  console.log('Scroll event at', Date.now());
}

const throttledScroll = throttle(handleScroll, 1000);

window.addEventListener('scroll', throttledScroll);
```

###  Why Use Throttle?
Prevent performance issues
- Used in:
- Infinite scroll
- Progress bars
- Animation calculations
- Resize listeners

## ⚖️ Debounce vs Throttle
| Feature    | Debounce                     | Throttle                      |
| ---------- | ---------------------------- | ----------------------------- |
| Runs after | **Delay after last call**    | **Every fixed interval**      |
| Best for   | Input, autocomplete, search  | Scroll, resize, mouse move    |
| Example    | "Type & wait 500ms" → search | "Run scroll handler every 1s" |

# 16. Infinite Scrolling in ReactJS – Full Code + Explanation
```
import React, { useState, useEffect, useRef, useCallback } from 'react';

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);        // Stores loaded items
  const [page, setPage] = useState(1);           // Track page number
  const [loading, setLoading] = useState(false); // Loading state
  const observerRef = useRef();                  // Intersection Observer ref

  // Simulated API fetch
  const fetchItems = async (pageNum) => {
    setLoading(true);
    const newItems = await new Promise((resolve) => {
      setTimeout(() => {
        const data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (pageNum - 1) * 10}`);
        resolve(data);
      }, 1000); // Simulate network delay
    });
    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);
  };

  // Fetch items when page changes
  useEffect(() => {
    fetchItems(page);
  }, [page]);

  // Setup IntersectionObserver
  const observer = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading]);

  return (
    <div style={{ width: '300px', margin: 'auto' }}>
      <h2>📦 Infinite Loading Example</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ padding: '8px', border: '1px solid #ccc' }}>
            {item}
          </li>
        ))}
      </ul>
      <div ref={observer} style={{ height: '20px', background: '#f0f0f0' }} />
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default InfiniteScrollList;
```
## 🧠 Explanation of the Code
| Variable      | Purpose                                  |
| ------------- | ---------------------------------------- |
| `items`       | Stores all fetched data                  |
| `page`        | Current page number                      |
| `loading`     | Prevents multiple fetches during loading |
| `observerRef` | Holds reference to IntersectionObserver  |

### ✅ How It Works
- When the component loads, page = 1 is used to fetch the first set of items.
- A div at the bottom of the list acts as a trigger.
- IntersectionObserver watches that div.
- When it becomes visible, we increment page, triggering the next API call.
- New items are appended to the list.
- This continues infinitely as you scroll.

### 🧪 When to Use Infinite Scroll
| Use Case              | Infinite Scroll? |
| --------------------- | ---------------- |
| Social feeds          | ✅ Yes            |
| Product galleries     | ✅ Yes            |
| Form/table management | ❌ Use pagination |
| Search results        | ❌ Use pagination |

# 17. 📦 JavaScript `Set` vs `Map` – Full Comparison & Guide

---

## 🧠 What is a `Set` in JavaScript?

A **Set** is a built-in JavaScript object that stores a **collection of unique values**.

### ✅ Key Characteristics:

- No duplicate values
- Maintains insertion order
- Values can be of any type

---

### 🧪 Set Syntax:

```js
const mySet = new Set([1, 2, 3]);
```

### 🧰 Common Use Cases:
- Remove duplicates from arrays
- Track unique elements
- Membership checks

### Inbuilt Set Methods
| Method              | Description                 |
| ------------------- | --------------------------- |
| `add(value)`        | Adds a value                |
| `delete(value)`     | Removes a value             |
| `has(value)`        | Checks if value exists      |
| `clear()`           | Removes all values          |
| `size`              | Returns number of elements  |
| `forEach(callback)` | Iterates through all values |
| `[...set]`          | Convert Set to Array        |

```
const s = new Set();
s.add(1);
s.add(2);
s.add(2); // Ignored (duplicate)
console.log(s.has(2)); // true
s.delete(1);
console.log(s.size); // 1
s.forEach(val => console.log(val)); // 2

```

## 🧠 What is a Map in JavaScript?
> A Map is a built-in object that stores key-value pairs, where keys can be any type, including objects and functions.

### ✅ Key Characteristics:
- Maintains key insertion order
- Keys can be primitive or object
- Faster and more flexible than objects for key-value stores

```
const myMap = new Map();
myMap.set('name', 'Alice');
myMap.set(1, 'One');

```
### 🧰 Common Use Cases:
- Storing structured data
- Lookup tables with complex keys
- Caching results (memoization)

### Ibuilt Map Methods
| Method              | Description                                  |
| ------------------- | -------------------------------------------- |
| `set(key, value)`   | Adds or updates a key-value pair             |
| `get(key)`          | Returns the value for a given key            |
| `delete(key)`       | Removes a key-value pair                     |
| `has(key)`          | Checks if a key exists                       |
| `clear()`           | Removes all entries                          |
| `size`              | Returns number of key-value pairs            |
| `keys()`            | Returns an iterator for keys                 |
| `values()`          | Returns an iterator for values               |
| `entries()`         | Returns an iterator for `[key, value]` pairs |
| `forEach(callback)` | Iterates through the map                     |
```
const m = new Map();
m.set('name', 'Riya');
m.set(1, 'One');
m.set({ id: 1 }, 'Object Key');

console.log(m.get('name')); // Riya
console.log(m.has(1)); // true
console.log(m.size); // 3

m.forEach((value, key) => {
  console.log(key, value);
});
```

## SET VS MAP
| Feature          | `Set`                             | `Map`                                  |
| ---------------- | --------------------------------- | -------------------------------------- |
| Stores           | Unique **values**                 | Key-value **pairs**                    |
| Key types        | Not applicable (values only)      | Can be any type (string, object, etc.) |
| Value uniqueness | All values are unique             | Keys must be unique                    |
| Retrieval        | No retrieval, only presence check | Can retrieve values by key             |
| Order            | Maintains insertion order         | Maintains insertion order              |
| Size             | `set.size`                        | `map.size`                             |
| Use case         | Unique list, filtering duplicates | Structured data, caching, fast lookup  |
| Performance      | Fast for value presence checks    | Fast for key-based access              |

## When to use what
| Scenario                    | Use `Set` or `Map`?   |
| --------------------------- | --------------------- |
| Remove duplicates from list | `Set`                 |
| Check if an item exists     | `Set`                 |
| Store key-value lookup      | `Map`                 |
| Store metadata for objects  | `Map` (object as key) |
| Caching function results    | `Map`                 |
