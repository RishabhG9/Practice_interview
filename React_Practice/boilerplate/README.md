# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# ------ CODE SETUP -------

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
├── scripts/
├── src/
│   ├── api/
│   ├── pages/
│   │   ├── About/
│   │   ├── Home/
│   │   ├── Sample/
│   │   │   └── Sample.tsx
│   ├── redux/
│   │   ├── action/
│   │   │   └── sample/
│   │   │   │   └── sample_action.tsx
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
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
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