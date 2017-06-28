import createRuleTester from './createRuleTester';

const ruleName = 'url';
const tester = createRuleTester(ruleName);

// Based from: https://github.com/chriso/validator.js/blob/master/test/validators.js#L201
describe(`Rules#${ruleName}`, () => {
  it('Should be return true', () => {
    tester(true, [
      { value: 'http://www.foobar.com/' },
      { value: 'http://www.foobar.com:23/' },
      { value: 'http://www.foobar.com:65535/' },
      { value: 'https://www.foobar.com/' },
      { value: 'ftp://www.foobar.com/' },
      { value: 'http://www.foobar.com/~foobar' },
      { value: 'http://user:pass@www.foobar.com/' },
      { value: 'http://user:@www.foobar.com/' },
      { value: 'http://127.0.0.1/' },
      { value: 'http://10.0.0.0/' },
      { value: 'http://189.123.14.13/' },
      { value: 'http://duckduckgo.com/?q=%2F' },
      { value: 'http://foobar.com/t$-_.+!*\'(),' },
      { value: 'http://localhost:3000/' },
      { value: 'http://foobar.com/?foo=bar#baz=qux' },
      { value: 'http://foobar.com?foo=bar' },
      { value: 'http://foobar.com#baz=qux' },
      { value: 'http://www.xn--froschgrn-x9a.net/' },
      { value: 'http://xn--froschgrn-x9a.com/' },
      { value: 'http://foo--bar.com' },
      { value: 'http://xn--j1aac5a4g.xn--j1amh' },
      { value: 'http://xn------eddceddeftq7bvv7c4ke4c.xn--p1ai' },
      { value: 'http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html' },
      { value: 'http://[1080:0:0:0:8:800:200C:417A]/index.html' },
      { value: 'http://[3ffe:2a00:100:7031::1]' },
      { value: 'http://[1080::8:800:200C:417A]/foo' },
      { value: 'http://[::192.9.5.5]/ipng' },
      { value: 'http://[::FFFF:129.144.52.38]:80/index.html' },
      { value: 'http://[2010:836B:4179::836B:4179]' },
    ]);
  });

  it('Should be return false', () => {
    tester(false, [
      { value: undefined },
      { value: 0 },
      { value: false },
      { value: '' },
      { value: {} },
      { value: [] },
      { value: 'invalid/' },
      { value: 'invalid.x' },
      { value: 'invalid.' },
      { value: '.com' },
      { value: 'http://300.0.0.1/' },
      { value: 'mailto:foo@bar.com' },
      { value: 'rtmp://foobar.com' },
      { value: 'http://www.xn--.com/' },
      { value: 'http://xn--.com/' },
      { value: 'http://www.foobar.com:0/' },
      { value: 'http://www.-foobar.com/' },
      { value: 'http://www.foobar-.com/' },
      { value: 'http://foobar/# lol' },
      { value: 'http://foobar/? lol' },
      { value: 'http://foobar/ lol/' },
      { value: 'http://www.foo_bar.com/' },
      { value: 'http://www.foobar.com/\t' },
      { value: 'http://\n@www.foobar.com/' },
      { value: '' },
      { value: 'http://*.foo.com' },
      { value: '*.foo.com' },
      { value: '!.foo.com' },
      { value: 'http://localhost:61500this is an invalid url!!!!' },
      { value: '////foobar.com' },
      { value: 'http:////foobar.com' },
    ]);
  });
});