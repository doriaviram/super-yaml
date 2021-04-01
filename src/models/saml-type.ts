import {SymlType} from '../types/syntax'
import {parseParam} from '../utils/syntax.utils'

export class SamlTypeBuilder {
  private types: {
    [key: string]: {
      defaultValue?: string;
      key?: string;
    };
  } = {};

  constructor(type: SymlType) {
    this.types = {}
    Object.keys(type.template).forEach(key => {
      const s = type.template[key]
      if (typeof s === 'string') {
        const param = parseParam(s)
        if (param) {
          this.types[key] = {
            ...param,
          }
        } else {
          this.types[key] = {
            defaultValue: type.template[key],
          }
        }
      }
    })
  }

  build(obj: { [key: string]: any }): { [key: string]: any } {
    const result: { [key: string]: any } = {}
    Object.keys(this.types).forEach(key => {
      const {key: typeKey, defaultValue} = this.types[key]
      if (typeKey) {
        if (obj[typeKey]) {
          result[typeKey] = obj[typeKey]
        } else if (defaultValue) {
          // eslint-disable-next-line no-negated-condition
          if (!isNaN(parseInt(defaultValue, 10))) {
            result[typeKey] = parseInt(defaultValue, 10)
          } else {
            result[typeKey] = defaultValue
          }
        } else {
          throw new Error(`Missing ${typeKey}`)
        }
      } else {
        result[key] = this.types[key].defaultValue
      }
    })
    return result
  }
}
