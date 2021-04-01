import {dump, load} from 'js-yaml'
import {readFile, writeFile} from 'fs'
import {promisify} from 'util'

import {SymlObject} from '../types/syntax'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

export class FileSystemService {
  static async readYaml(path: string): Promise<SymlObject> {
    const fileContents = await readFileAsync(path, {encoding: 'utf8'})
    const yml = load(fileContents)
    if(yml)
      return yml as SymlObject
    throw Error("TBD")
  }

  static async writeYaml(content: object, path: string): Promise<void> {
    const ymlContent = dump(content)
    await writeFileAsync(path, ymlContent, 'utf8')
  }
}
