import { Rule } from '../Rule';
import { RuleStore } from '../RuleStore';
import { RuleGroup } from '../RuleGroup';
import { NotRule } from '../NotRule';
import { ListRule } from '../ListRule';

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

test('Rule serializing and deserializing from json', () => {
  const containsERule = new StringContainsRule('e');
  const store = new RuleStore([
    {
      type: 'STRING_CONTAINS_RULE',
      build: (json) => new StringContainsRule(json.letterToContain as string),
    },
  ]);

  const serializedRule = containsERule.toJson();

  expect(serializedRule).toBe('{"type":"STRING_CONTAINS_RULE","letterToContain":"e"}');

  const newContainsERule = store.buildFromJson(serializedRule) as StringContainsRule;

  expect(newContainsERule).toBeInstanceOf(StringContainsRule);
  expect(newContainsERule.letterToContain).toBe('e');
  expect(newContainsERule.type).toBe('STRING_CONTAINS_RULE');

  expect(newContainsERule.isValid('This is a test')).toBe(true);
});

test('Rule group serializing and deserializing from json', () => {
  const containsERule = new StringContainsRule('e');
  const containsLRule = new StringContainsRule('l');

  const andRuleGroup = new RuleGroup([containsERule, containsLRule], 'AND');

  const store = new RuleStore([
    {
      type: 'STRING_CONTAINS_RULE',
      build: (json) => new StringContainsRule(json.letterToContain as string),
    },
  ]);

  const serializedRuleGroup = andRuleGroup.toJson();
  expect(serializedRuleGroup).toBe(
    '{"type":"RULE_GROUP","subRules":[{"type":"STRING_CONTAINS_RULE","letterToContain":"e"},{"type":"STRING_CONTAINS_RULE","letterToContain":"l"}],"ruleGroupType":"AND"}',
  );
  const newRuleGroupRule = store.buildFromJson(serializedRuleGroup);
  expect(newRuleGroupRule.isValid('test')).toBe(false);
  expect(newRuleGroupRule.isValid('hello')).toBe(true);
  expect(newRuleGroupRule.isValid('yoda')).toBe(false);
});

test('Not rule serializing and deserializing from json', () => {
  const containsERule = new StringContainsRule('e');

  const notRule = new NotRule(containsERule);

  const store = new RuleStore([
    {
      type: 'STRING_CONTAINS_RULE',
      build: (json) => new StringContainsRule(json.letterToContain as string),
    },
  ]);

  const serializedRuleGroup = notRule.toJson();
  expect(serializedRuleGroup).toBe('{"type":"NOT_RULE","rule":{"type":"STRING_CONTAINS_RULE","letterToContain":"e"}}');
  const newRuleGroupRule = store.buildFromJson(serializedRuleGroup);
  expect(newRuleGroupRule.isValid('test')).toBe(false);
  expect(newRuleGroupRule.isValid('yoda')).toBe(true);
});

test('List rule serializing and deserializing from json', () => {
  const containsERule = new StringContainsRule('e');

  const listRule = new ListRule<string>(containsERule, 'ALL');

  const store = new RuleStore([
    {
      type: 'STRING_CONTAINS_RULE',
      build: (json) => new StringContainsRule(json.letterToContain as string),
    },
  ]);

  const serializedRuleGroup = listRule.toJson();
  expect(serializedRuleGroup).toBe(
    '{"type":"LIST_RULE","listRuleType":"ALL","rule":{"type":"STRING_CONTAINS_RULE","letterToContain":"e"}}',
  );
  const newRuleGroupRule = store.buildFromJson(serializedRuleGroup);
  expect(newRuleGroupRule.isValid(['test', 'hello'])).toBe(true);
  expect(newRuleGroupRule.isValid(['test', 'yoda'])).toBe(false);
  expect(newRuleGroupRule.isValid(['grass', 'yoda'])).toBe(false);
});

test('Invalid rule type throws error', () => {
  const containsERule = new StringContainsRule('e');

  const store = new RuleStore([
    {
      type: 'TESTING',
      build: (obj: { [ref: string]: any }) => new StringContainsRule(obj.letterToContain),
    },
  ]);

  const serializedRuleGroup = containsERule.toJson();
  expect(serializedRuleGroup).toBe('{"type":"STRING_CONTAINS_RULE","letterToContain":"e"}');
  expect(() => store.buildFromJson(serializedRuleGroup)).toThrow();
});
