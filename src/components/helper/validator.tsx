import _ from 'lodash';

export function findFirstEmptyField(obj: Record<string, any>): string | null {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!obj[key]) {
        return key;
      }
    }
  }
  return null;
}

export function isStringNotEmpty(str: string): boolean {
  return !_.isEmpty(str);
}
