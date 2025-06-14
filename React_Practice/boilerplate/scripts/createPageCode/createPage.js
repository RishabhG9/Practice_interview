const fs = require('fs');
const path = require('path');

const pageName = process.argv[2];

if (!pageName) {
  console.error('❌ Please provide a page name!');
  process.exit(1);
}

const camel = pageName.toLowerCase();
const pascal = pageName.charAt(0).toUpperCase() + pageName.slice(1);

// 1. Create src/pages/PageName/PageName.tsx
const pagesDir = path.join(__dirname, '..', '../src', 'pages', pascal);
const pageFilePath = path.join(pagesDir, `${pascal}.tsx`);

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

const pageContent = `export const ${pascal} = () => {
  return (
    <div className="p-4 text-xl font-semibold">
      This is the ${pascal} page.
    </div>
  );
};
`;

fs.writeFileSync(pageFilePath, pageContent.trim());
console.log(`✅ Created: ${path.relative(process.cwd(), pageFilePath)}`);

// 2. Modify src/routes/AppRoutes.tsx
const routesPath = path.join(__dirname, '..', '../src', 'routes', 'AppRoutes.tsx');

if (fs.existsSync(routesPath)) {
  let routesContent = fs.readFileSync(routesPath, 'utf8');

  const importLine = `import { ${pascal} } from '../pages/${pascal}/${pascal}';`;
  const routeLine = `        <Route path="/${camel}" element={<${pascal} />} />`;

  // Inject import if not already present
  if (!routesContent.includes(importLine)) {
    const importRegex = /import .* from .*;\n/g;
    const lastImportMatch = routesContent.match(importRegex);
    const lastImportIndex = lastImportMatch ? lastImportMatch.index + lastImportMatch[0].length * lastImportMatch.length : 0;

    routesContent =
      routesContent.slice(0, lastImportIndex) +
      importLine + '\n' +
      routesContent.slice(lastImportIndex);
  }

  // Inject route inside <Routes>
  const routesRegex = /<Routes>([\s\S]*?)<\/Routes>/;
  const match = routesContent.match(routesRegex);
  if (match && !match[0].includes(`<${pascal} />`)) {
    const updatedRoutes = match[0].replace(/<Routes>([\s\S]*?)<\/Routes>/, (full, inner) => {
      return `<Routes>\n${inner.trim()}\n${routeLine}\n</Routes>`;
    });
    routesContent = routesContent.replace(routesRegex, updatedRoutes);
  }

  fs.writeFileSync(routesPath, routesContent);
  console.log(`✅ Updated: ${path.relative(process.cwd(), routesPath)} with route /${camel}`);
} else {
  console.warn(`⚠️ routes file not found at ${routesPath}`);
}
