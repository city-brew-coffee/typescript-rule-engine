import { Rule } from '../Rule';
import { ListRule } from '../ListRule';
import { ListRuleType } from '..';

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

test('All type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'ALL');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(true);
  expect(allListRule.isValid(['hello', 'green', 'book'])).toBe(false);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(false);
});

test('None type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'NONE');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(false);
  expect(allListRule.isValid(['hello', 'green', 'book'])).toBe(false);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(true);
});

test('Includes exactly type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'INCLUDES', 3, 'EXACTLY');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(false);
  expect(allListRule.isValid(['hello', 'green', 'yellow', 'book'])).toBe(true);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(false);
});

test('Includes anything but type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'INCLUDES', 3, 'ANYTHING_BUT');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(true);
  expect(allListRule.isValid(['hello', 'green', 'yellow', 'book'])).toBe(false);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(true);
});

test('Includes more than type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'INCLUDES', 3, 'MORE_THAN');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(true);
  expect(allListRule.isValid(['hello', 'green', 'yellow', 'book'])).toBe(false);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(false);
});

test('Includes more than type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'INCLUDES', 3, 'AT_LEAST');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(true);
  expect(allListRule.isValid(['hello', 'green', 'yellow', 'book'])).toBe(true);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(false);
});

test('Includes less than type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'INCLUDES', 3, 'LESS_THAN');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(false);
  expect(allListRule.isValid(['hello', 'green', 'yellow', 'book'])).toBe(false);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(true);
});

test('Includes no more than type List rule', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'INCLUDES', 3, 'NO_MORE_THAN');

  expect(allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toBe(false);
  expect(allListRule.isValid(['hello', 'green', 'yellow', 'book'])).toBe(true);
  expect(allListRule.isValid(['air', 'wind', 'fan'])).toBe(true);
});

test('List rule without count', () => {
  const containsERule = new StringContainsRule('e');
  expect(() => new ListRule<string>(containsERule, 'INCLUDES', undefined, 'NO_MORE_THAN')).toThrow();
});

test('List rule without comparison', () => {
  const containsERule = new StringContainsRule('e');
  expect(() => new ListRule<string>(containsERule, 'INCLUDES', 3)).toThrow();
});

test('List rule without valid type', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(containsERule, 'GUNK' as ListRuleType);

  expect(() => allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toThrow();
});

test('List rule without valid comparison', () => {
  const containsERule = new StringContainsRule('e');
  const allListRule = new ListRule<string>(
    containsERule,
    'INCLUDES',
    3,
    'TEST' as 'LESS_THAN' | 'MORE_THAN' | 'AT_LEAST' | 'NO_MORE_THAN' | 'EXACTLY' | 'ANYTHING_BUT' | undefined,
  );

  expect(() => allListRule.isValid(['test', 'hello', 'elbow', 'yellow'])).toThrow();
});
