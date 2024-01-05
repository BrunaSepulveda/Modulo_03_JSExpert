import { writeFile, readFile } from 'fs/promises'

export async function save(data) {
  // sem no es module __filename, __dirname
  const { pathname: databaseFile } = new URL('./../database.json', import.meta.url)
  const currentDate = JSON.parse(( await readFile(databaseFile)))
  currentDate.push(data)
  await writeFile(databaseFile,JSON.stringify(currentDate))
}