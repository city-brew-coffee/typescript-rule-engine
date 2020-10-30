import { Rule } from '../Rule';

class StringLengthRule extends Rule<string, number> {
  type = 'STRING_LENGTH_RULE';
  isValid(input: string): number {
    return input.length;
  }
}

test('int return rules', () => {
  const stringLengthRule = new StringLengthRule();

  expect(stringLengthRule.isValid('hello')).toBe(5);
});
