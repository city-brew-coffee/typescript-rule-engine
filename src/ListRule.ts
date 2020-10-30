import { Rule } from './Rule';
import { ListRuleType, ListRuleCountCompare } from './Enums';

export class ListRule<T> extends Rule<T[]> {
  rule: Rule<T>;
  listRuleType: ListRuleType;
  count?: number;
  comparison?: ListRuleCountCompare;

  static type = 'LIST_RULE';
  type = ListRule.type;

  constructor(rule: Rule<T>, listRuleType: ListRuleType, count?: number, comparison?: ListRuleCountCompare) {
    super();
    this.listRuleType = listRuleType;
    this.rule = rule;
    this.count = count;
    this.comparison = comparison;
    if (this.listRuleType === 'INCLUDES' && !(this.count && this.comparison))
      throw new Error('no count or comparison for list rule combine');
  }

  private combine(inputs: boolean[]): boolean {
    if (this.listRuleType === 'ALL') {
      return inputs.reduce((acc, curr) => acc && curr, true);
    } else if (this.listRuleType === 'NONE') {
      return !inputs.reduce((acc, curr) => acc || curr, false);
    } else if (this.listRuleType === 'INCLUDES') {
      if (!(this.count && this.comparison)) throw new Error('no count or comparison for list rule combine');
      const trueCount = inputs.filter((input) => input).length;

      if (this.comparison === 'EXACTLY') {
        return trueCount === this.count;
      } else if (this.comparison === 'LESS_THAN') {
        return trueCount < this.count;
      } else if (this.comparison === 'MORE_THAN') {
        return trueCount > this.count;
      } else if (this.comparison === 'AT_LEAST') {
        return trueCount >= this.count;
      } else if (this.comparison === 'NO_MORE_THAN') {
        return trueCount <= this.count;
      } else if (this.comparison === 'ANYTHING_BUT') {
        return trueCount !== this.count;
      } else {
        throw new Error('No valid comparison found');
      }
    } else {
      throw new Error('No valid list rule type found');
    }
  }

  isValid(input: T[]): boolean {
    return this.combine(input.map((item) => this.rule.isValid(item)));
  }
}
