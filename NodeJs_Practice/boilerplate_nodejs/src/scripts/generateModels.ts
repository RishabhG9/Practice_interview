import fs from 'fs';
import path from 'path';

const PRISMA_SCHEMA_PATH = './prisma/schema.prisma';
const OUTPUT_BASE = './src/models';

function pascalToCamel(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function getModelsFromSchema(schema: string) {
  const modelRegex = /model (\w+) \{([\s\S]*?)\}/g;
  const matches = [...schema.matchAll(modelRegex)];
  return matches.map((m) => ({
    name: m[1],
    fields: m[2]
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('@') && !line.startsWith('//'))
      .map((line) => {
        const [name, type] = line.split(/\s+/);
        return { name, type };
      }),
  }));
}

function mapPrismaTypeToTs(type: string): string {
  if (type.endsWith('?')) type = type.slice(0, -1);
  switch (type) {
    case 'String':
    case 'DateTime':
      return 'string';
    case 'Int':
    case 'Float':
      return 'number';
    case 'Boolean':
      return 'boolean';
    default:
      return 'any';
  }
}

function generateTypesFile(model: { name: string; fields: { name: string; type: string }[] }) {
  const fields = model.fields
    .map(({ name, type }) => `  ${name}?: ${mapPrismaTypeToTs(type)};`)
    .join('\n');
  return `
export interface ${model.name}ModelType {
${fields}
}
`;
}

function generateModelFile(model: { name: string }) {
  const modelName = pascalToCamel(model.name);
  return `
import { prisma } from '@/config/db';
import { ${model.name}ModelType } from './types';

export const findAll = async () => {
  return prisma.${modelName}.findMany({
    where: { archived: null },
  });
};

export const findById = async (id: number) => {
  return prisma.${modelName}.findUnique({ where: { id , archived: null  } });
};

export const findByUuid = async (uuid: string) => {
  return prisma.${modelName}.findUnique({ where: { uuid , archived: null } });
};

export const create = async (data: any) => {
  return prisma.${modelName}.create({ data });
};

export const updateById = async (id: number, data: any) => {
  return prisma.${modelName}.update({ where: { id }, data });
};

export const updateByUuid = async (uuid: string, data: any) => {
  return prisma.${modelName}.update({ where: { uuid }, data });
};

export const deleteById = async (id: number) => {
  return prisma.${modelName}.delete({ where: { id } });
};

export const deleteByUuid = async (uuid: string) => {
  return prisma.${modelName}.delete({ where: { uuid } });
};
`;
}

function generateIndexFile(models: { name: string }[]) {
  return models
    .map((model) => {
      const modelFolder = `${pascalToCamel(model.name)}Model`;
      return `export * as ${model.name}Model from './${modelFolder}/${model.name}.model';`;
    })
    .join('\n');
}

function main() {
  const schema = fs.readFileSync(PRISMA_SCHEMA_PATH, 'utf-8');
  const models = getModelsFromSchema(schema);

  if (!fs.existsSync(OUTPUT_BASE)) {
    fs.mkdirSync(OUTPUT_BASE, { recursive: true });
  }

  models.forEach((model) => {
    const folder = path.join(OUTPUT_BASE, `${pascalToCamel(model.name)}Model`);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const modelFilePath = path.join(folder, `${model.name}.model.ts`);
    const typesFilePath = path.join(folder, `types.ts`);

    if (!fs.existsSync(modelFilePath)) {
      fs.writeFileSync(modelFilePath, generateModelFile(model));
    } else {
      console.log(`⚠️ Skipping ${model.name}.model.ts (already exists)`);
    }

    if (!fs.existsSync(typesFilePath)) {
      fs.writeFileSync(typesFilePath, generateTypesFile(model));
    } else {
      console.log(`⚠️ Skipping types.ts for ${model.name} (already exists)`);
    }
  });

  fs.writeFileSync(path.join(OUTPUT_BASE, 'index.ts'), generateIndexFile(models));
  console.log('✅ Model generation completed.');
}

main();
