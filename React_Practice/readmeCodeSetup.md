# 1. Create React App 
npx create-react-app my-app --template typescript

# 2. Install TailwindCSS
npm install -D tailwindcss autoprefixer
npx tailwindcss-cli@latest init -p 
## or 
npx tailwindcss init

## Update tailwind.config.ts:
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

## Update src/index.css:
### include in the index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

#  3. Install Redux Toolkit and Axios
npm install @reduxjs/toolkit react-redux axios

# 4. Folder Structure
src/
├── app/
│   └── store.ts
├── features/
│   └── example/
│       ├── exampleSlice.ts
│       └── ExampleComponent.tsx
├── services/
│   └── api.ts
├── App.tsx
├── index.tsx

#  5. Redux Store Setup
import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from '../features/example/exampleSlice'

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

# 6. Example Slice
### src/features/example/exampleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ExampleState {
  value: number
}

const initialState: ExampleState = {
  value: 0,
}

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = exampleSlice.actions
export default exampleSlice.reducer


# 7. Hooking Redux in Entry
### src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)


###  8. Axios Setup
# src/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com',
})

export default api

#  9. Example Component Using Redux
### src/features/example/ExampleComponent.tsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { increment, decrement } from './exampleSlice'

const ExampleComponent = () => {
  const value = useSelector((state: RootState) => state.example.value)
  const dispatch = useDispatch()

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Counter: {value}</h2>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => dispatch(increment())}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          -
        </button>
      </div>
    </div>
  )
}

export default ExampleComponent


# 10. Use in App
### src/App.tsx
import React from 'react'
import ExampleComponent from './features/example/ExampleComponent'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">React + TS + Redux + Tailwind</h1>
      <ExampleComponent />
    </div>
  )
}

export default App



# DONE
## ⚛️ React + TypeScript
## 🎨 TailwindCSS for styling + responsive design
## 🧠 Redux Toolkit for state management
## 🌐 Axios for API calls