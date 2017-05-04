import * as assert from 'power-assert';
import { createRuleTester } from '../../src/';

const ruleName = 'string';
const tester = createRuleTester(assert, ruleName);

describe(`Rules#${ruleName}`, () => {
  it('Should be return true', () => {
    tester(true, [
      { value: '' },
      { value: 'str' },
    ]);
  });

  it('Should be return false', () => {
    tester(false, [
      { value: undefined },
      { value: true },
      { value: false },
      { value: 0 },
      { value: {} },
      { value: [] },
    ]);
  });
});
