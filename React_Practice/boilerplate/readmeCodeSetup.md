# 1. Create React App 
```
npx create-react-app my-app --template typescript
```

# 2. Install TailwindCSS
```
npm install -D tailwindcss autoprefixer
npx tailwindcss-cli@latest init -p 
```

## or 
```
npx tailwindcss init
```

## Update tailwind.config.ts:
```
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
```

## Update src/index.css:
### include in the index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#  3. Install Redux Toolkit and Axios
```
npm install @reduxjs/toolkit react-redux axios
```

#  4. Redux Store Setup
```
import sampleReducer from '../reducer/sample/sample_reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

```

# 5. Example Reducer
### src/redux/reducer/sample/sample_reducer.ts
```
import { createSlice } from '@reduxjs/toolkit';
import { fetchSample } from '../../action/sample/sample_action';
import { SampleState } from '../../types/sample/sample_types';

const initialState: SampleState = {
  data: [],
  loading: false,
  error: null,
};

const sampleReducer = createSlice({
  name: 'sample',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSample.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSample.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sampleReducer.reducer;
```
# 6. Example Action
### src/redux/action/sample/sample_action.ts
```
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const fetchSample = createAsyncThunk('sample/fetchSample', async (_, thunkAPI) => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch sample');
  }
});
```

# 7. Example Selector
### src/redux/selector/sample/sample_selector.ts
```
import { RootState } from '../../store/store';

export const selectSample = (state: RootState) => state.sample.data;
export const selectSampleLoading = (state: RootState) => state.sample.loading;
export const selectSampleError = (state: RootState) => state.sample.error;
```

# 7. Hooking Redux in Entry
### src/index.tsx
```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

###  8. Axios Setup
# src/api/index.tsx
```
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.example.com',
})
```

#  9. Example Routing
### src/routes/AppRoutes.tsx
```
import { Sample } from '../pages/Sample/Sample';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sample" element={<Sample />} />
    </Routes>
  );
}

```

# 10. Use in App
### src/App.tsx
```
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

export const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
```

# FINAL CODE STRUCTURE

```
boilerplate/
├── build/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── scripts/
│   ├── createFeature.js
│   └── createPage.js
├── src/
│   ├── api/
│   ├── pages/
│   │   ├── About/
│   │   ├── Home/
│   │   ├── Sample/
│   │   │   └── Sample.tsx
│   ├── redux/
│   │   ├── action/
│   │   │   ├── meals/
│   │   │   │   └── meals_action.tsx
│   │   │   └── sample/
│   │   ├── reducer/
│   │   ├── selector/
│   │   ├── store/
│   │   └── types/
│   ├── routes/
│   │   └── AppRoutes.tsx
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── readmeCodeSetup.md
├── tailwind.config.js
└── tsconfig.json

```
# To Create Redux Sample By Script
```
"create:redux": "node scripts/createPageCode/createPage.js"
```
### or 
```
$ npm run create:redux -- sample
```
# To Create Page Sample By Script
```
"create:page": "node scripts/createReduxCode/createFeature.js",
```
### or 
```
$ npm run create:page -- sample
```

# DONE
### ⚛️ React + TypeScript
### 🎨 TailwindCSS for styling + responsive design
### 🧠 Redux Toolkit for state management (Store, Selector, Action, Types, Reducers)
### 🌐 Axios for API calls