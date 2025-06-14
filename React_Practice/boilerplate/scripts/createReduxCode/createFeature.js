const fs = require('fs');
const path = require('path');

const featureName = process.argv[2];
if (!featureName) {
  console.error('❌ Please provide a feature name!');
  process.exit(1);
}

const camel = featureName.toLowerCase();
const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);

const baseDir = path.join(__dirname, '..', '../src', 'redux');

// 1. Create folders & files
const structure = [
  {
    dir: `action/${camel}`,
    file: `${camel}_action.tsx`,
    content: `import { createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../../api';

export const fetch${pascal} = createAsyncThunk('${camel}/fetch${pascal}', async (_, thunkAPI) => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch ${camel}');
  }
});`
  },
  {
    dir: `reducer/${camel}`,
    file: `${camel}_reducer.tsx`,
    content: `import { createSlice } from '@reduxjs/toolkit';
import { fetch${pascal} } from '../../action/${camel}/${camel}_action';
import { ${pascal}State } from '../../types/${camel}/${camel}_types';

const initialState: ${pascal}State = {
  data: [],
  loading: false,
  error: null,
};

const ${camel}Reducer = createSlice({
  name: '${camel}',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch${pascal}.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch${pascal}.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetch${pascal}.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ${camel}Reducer.reducer;`
  },
  {
    dir: `selector/${camel}`,
    file: `${camel}_selector.ts`,
    content: `import { RootState } from '../../store/store';

export const select${pascal} = (state: RootState) => state.${camel}.data;
export const select${pascal}Loading = (state: RootState) => state.${camel}.loading;
export const select${pascal}Error = (state: RootState) => state.${camel}.error;
`
  },
  {
    dir: `types/${camel}`,
    file: `${camel}_types.ts`,
    content: `export interface ${pascal}State {
  data: any[];
  loading: boolean;
  error: string | null;
}
`
  }
];

structure.forEach(({ dir, file, content }) => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });

  const filePath = path.join(fullPath, file);
  fs.writeFileSync(filePath, content.trim());
  console.log(`✅ Created: ${path.relative(process.cwd(), filePath)}`);
});

// 2. Update store.tsx to include reducer
const storePath = path.join(baseDir, 'store', 'store.tsx');
if (fs.existsSync(storePath)) {
  let storeContent = fs.readFileSync(storePath, 'utf8');

  const importLine = `import ${camel}Reducer from '../reducer/${camel}/${camel}_reducer';`;
  const reducerEntry = `  ${camel}: ${camel}Reducer,`;

  if (!storeContent.includes(importLine)) {
    // Insert import after last import
    const importRegex = /import .* from .*;\n/g;
    const lastImportMatch = storeContent.match(importRegex);
    const lastImportIndex = lastImportMatch ? lastImportMatch.index + lastImportMatch[0].length * lastImportMatch.length : 0;

    storeContent = storeContent.slice(0, lastImportIndex) + importLine + '\n' + storeContent.slice(lastImportIndex);
  }

  // Add to reducer object
  const reducerRegex = /reducer:\s*{([\s\S]*?)}/;
  const match = storeContent.match(reducerRegex);
  if (match && !match[1].includes(`${camel}:`)) {
    const updatedReducer = match[0].replace(/({[\s\S]*?)(})/, `$1\n${reducerEntry}\n$2`);
    storeContent = storeContent.replace(reducerRegex, updatedReducer);
  }

  fs.writeFileSync(storePath, storeContent);
  console.log(`✅ Updated: ${path.relative(process.cwd(), storePath)} with ${camel} reducer`);
} else {
  console.warn(`⚠️ Store file not found at ${storePath}`);
}
