import { Rule } from '../Rule';
import { RuleGroup } from '../RuleGroup';

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

test('AND and OR rule groups', () => {
  const containsERule = new StringContainsRule('e');
  const containsLRule = new StringContainsRule('l');

  const andRuleGroup = new RuleGroup([containsERule, containsLRule], 'AND');
  const orRuleGroup = new RuleGroup([containsERule, containsLRule], 'OR');

  expect(andRuleGroup.isValid('hello')).toBe(true);
  expect(orRuleGroup.isValid('hello')).toBe(true);

  expect(andRuleGroup.isValid('peek')).toBe(false);
  expect(orRuleGroup.isValid('peek')).toBe(true);

  expect(andRuleGroup.isValid('yoda')).toBe(false);
  expect(orRuleGroup.isValid('yoda')).toBe(false);
});
