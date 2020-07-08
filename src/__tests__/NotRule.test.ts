import { Rule } from '../Rule';
import { NotRule } from '../NotRule';

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

test('Not Rule', () => {
  const containsERule = new StringContainsRule('e');
  expect(containsERule.isValid('test')).toBe(true);
  const notContainsERule = new NotRule(containsERule);
  expect(notContainsERule.isValid('test')).toBe(false);
});
