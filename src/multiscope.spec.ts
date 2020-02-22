import parse from '@commitlint/parse';
import multiscope, { CaseType } from './multiscope';

const message = {
  'plain message': 'foo(bar,baz): qux',
  'custom delimiter message': 'foo(bar/baz): qux',
  'pascal case message': 'foo(Bar,Baz): qux',
  'single scope message': 'foo(bar): qux',
};

const options = {
  'no property': {},
  'correct enum': { enum: ['bar', 'baz'] },
  'invalid enum': { enum: ['foo'] },
  'correct delimiter and correct enum': { delimiter: '/', enum: ['bar', 'baz'] },
  'correct delimiter and invalid enum': { delimiter: '/', enum: ['foo'] },
  'correct delimiter and no enum': { delimiter: '/' },
  'invalid delimiter and correct enum': { delimiter: ',', enum: ['bar', 'baz'] },
  'correct case': { case: 'pascal-case' as CaseType },
  'invalid case': { case: 'camel-case' as CaseType },
};

const returns = {
  'emits no error': true,
  'emits error': false,
};

function runTest(
  messageName: keyof typeof message,
  optionsName: keyof typeof options,
  returnsName: keyof typeof returns
): void {
  it(`${returnsName} with ${messageName} and options that contains ${optionsName}`, async () => {
    const m = message[messageName];
    const o = options[optionsName];
    const r = returns[returnsName];

    const parsed = await parse(m);
    const [actual] = multiscope(parsed, 'always', o);
    expect(actual).toBe(r);
  });
}

describe('multiscope/enum', () => {
  runTest('plain message', 'no property', 'emits no error');
  runTest('plain message', 'correct enum', 'emits no error');
  runTest('plain message', 'invalid enum', 'emits error');
  runTest('custom delimiter message', 'no property', 'emits no error');
  runTest('custom delimiter message', 'correct delimiter and correct enum', 'emits no error');
  runTest('custom delimiter message', 'correct delimiter and invalid enum', 'emits error');
  runTest('custom delimiter message', 'correct delimiter and no enum', 'emits no error');
  runTest('custom delimiter message', 'invalid delimiter and correct enum', 'emits error');
  runTest('pascal case message', 'correct case', 'emits no error');
  runTest('pascal case message', 'invalid case', 'emits error');
  runTest('single scope message', 'no property', 'emits no error');
});
