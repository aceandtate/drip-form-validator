import * as assert from 'power-assert';
import { createNormalizeTester } from '../../src/';

const normalizer = 'escape';
const tester = createNormalizeTester(assert, normalizer);

describe(`Normalizers#${normalizer}`, () => {
  it('Should be normalize', () => {
    tester([
      { value: null, params: true, expect: '' },
      { value: undefined, params: true, expect: '' },
      { value: 0, params: true, expect: '0' },
      { value: '<script> alert("xss&fun"); </script>', params: true, expect: '&lt;script&gt; alert(&quot;xss&amp;fun&quot;); &lt;&#x2F;script&gt;' },
    ]);
  });
});
