import {SymlParam} from '../types/syntax'

export const parseParam = (param: string): SymlParam | undefined => {
  if (param.startsWith('$')) {
    const [key, defaultValue] = param.substring(1).split(':')
    return {
      key,
      defaultValue,
    }
  }
  return undefined
}
