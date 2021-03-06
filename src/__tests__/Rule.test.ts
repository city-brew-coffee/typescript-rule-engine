import { Rule } from '../Rule';

class StringContainsRule extends Rule<string> {
  type = 'STRING_CONTAINS_RULE';

  letterToContain: string;

  constructor(letterToContain: string) {
    super();
    this.letterToContain = letterToContain;
  }

  isValid(input: string): boolean {
    return input.includes(this.letterToContain);
  }
}

test('Basic string Rule', () => {
  const containsERule = new StringContainsRule('e');
  const containsLRule = new StringContainsRule('l');

  expect(containsERule.isValid('hello')).toBe(true);
  expect(containsERule.isValid('yoda')).toBe(false);

  expect(containsLRule.isValid('hello')).toBe(true);
  expect(containsLRule.isValid('yoda')).toBe(false);
});
