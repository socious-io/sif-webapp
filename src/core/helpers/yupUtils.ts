import * as yup from 'yup';

import { countTextCharacters } from './texts';

declare module 'yup' {
  interface StringSchema {
    maxTextCharacters(max: number, message: string): StringSchema;
  }
}

yup.addMethod(yup.string, 'maxTextCharacters', function (max: number, message: string) {
  return this.test('maxTextCharacters', message, function (value) {
    if (!value) return true;
    const charCount = countTextCharacters(value);
    return charCount <= max;
  });
});
