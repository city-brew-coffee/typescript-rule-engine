import { Rule } from './Rule';

export class NotRule<T> extends Rule<T> {
  static type = 'NOT_RULE';
  type = NotRule.type;
  rule: Rule<T>;

  constructor(subrule: Rule<T>) {
    super();
    this.rule = subrule;
  }

  isValid(input: T): boolean {
    return !this.rule.isValid(input);
  }
}
