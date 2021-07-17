import { readFile, writeFile } from 'fs/promises';

export const readJson = async path => {
  const file = await readFile(path, { encoding: 'utf-8' });
  return JSON.parse(file);
};

export const writeJson = async (path, data) => {
  await writeFile(path, JSON.stringify(data), { encoding: 'utf-8' });
};
