# Tyepscript Rule Engine

This package is meant to help with processing complex rules and checking if dynamic data fits those rules.

## Quickstart

You can start by creating your own rule by extending the rule object and implement an isValid() function. Here's an example:

```typescript
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
```

## Built in Rules

There are 3 rules already made by this package that can be used out of the box:

- **Rule Group**: Takes in a list of rules as subrules; isValid() return the logical 'AND' or 'OR' of the rules
- **Not Rule**: Takes in a rule; isValid() return the logical NOT of the rule
- **List Rule**: Takes in a rule of specific type and optional parameters on how to calculate the end result; isValid() takes a list of objects and returns true if conditions are met on the list (ie all items meet certain rule, or exacly 5 items, ect)

## Serializing

All rules inherit a toJson() method and toObject() method for storage in a database.

## Deserializing with Rule Store

A RuleStore is an object in memory that knows how to build rules from json or plain objects. RuleStores already know how to build built-in rules (RuleGroup, ListRule, and NotRule), and you can "teach" it how to build your custom rules by feeding it a type string and build function, like so:

```typescript
const store = new RuleStore([
  {
    type: 'STRING_CONTAINS_RULE',
    build: (json) => new StringContainsRule(json.letterToContain as string),
  },
]);
```

## Rule Return Type

While rules will return boolean by default, you can add a second optional generics paramters to rules to make them return something else, like a number. Here's an example.

```typescript
class StringLengthRule extends Rule<string, number> {
  type = 'STRING_LENGTH_RULE';
  isValid(input: string): number {
    return input.length;
  }
}
```

Note that if your rule doesn't return booleans, it can not be used with the built-in RuleGroup, NotRule, or ListRule.
